import type { LanguageCode } from '../i18n/types';
import { getLanguageInfo } from '../i18n/languages';

const env = ((import.meta as unknown as { env?: Record<string, string | undefined> }).env) ?? {};

/** Backend proxy URL for AI4Bharat translation. The actual API key lives on the server. */
const TRANSLATION_API_URL = env.VITE_TRANSLATION_API_URL ?? '';
const BHASHINI_API_URL = env.VITE_BHASHINI_API_URL ?? 'https://dhruva-api.bhashini.gov.in/services/inference';
const BHASHINI_API_KEY = env.VITE_BHASHINI_API_KEY ?? ''; // For dev only; in production use backend proxy

export interface TranslationRequest {
  text: string;
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
}

export interface TranslationResponse {
  translatedText: string;
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
}

/**
 * AI4Bharat IndicTrans2 translation via Bhashini API.
 * 
 * Architecture:
 * - In production: Frontend -> Backend Proxy -> Bhashini/AI4Bharat API
 * - In development: Can use VITE_BHASHINI_API_KEY directly (not recommended for production)
 * 
 * The backend proxy should:
 * 1. Receive { text, sourceLang, targetLang } from the frontend
 * 2. Map language codes to IndicTrans2 codes using getLanguageInfo()
 * 3. Call the Bhashini API with the server-stored API key
 * 4. Return the translated text
 */
export async function translateText(request: TranslationRequest): Promise<TranslationResponse> {
  const sourceInfo = getLanguageInfo(request.sourceLang);
  const targetInfo = getLanguageInfo(request.targetLang);

  // If same language, return as-is
  if (request.sourceLang === request.targetLang) {
    return { translatedText: request.text, ...request };
  }

  // If either language is not supported, return original
  if (!sourceInfo.supported || !targetInfo.supported) {
    console.warn(`Translation not supported: ${request.sourceLang} -> ${request.targetLang}`);
    return { translatedText: request.text, ...request };
  }

  // Try backend proxy first (production path)
  if (TRANSLATION_API_URL) {
    try {
      const res = await fetch(TRANSLATION_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          text: request.text,
          sourceLanguage: sourceInfo.indicTransCode,
          targetLanguage: targetInfo.indicTransCode,
        }),
      });
      if (!res.ok) throw new Error(`Translation API error: ${res.status}`);
      const data = await res.json();
      return {
        translatedText: data.translatedText ?? data.output?.[0]?.target ?? request.text,
        sourceLang: request.sourceLang,
        targetLang: request.targetLang,
      };
    } catch (err) {
      console.error('Translation proxy error:', err);
      return { translatedText: request.text, ...request };
    }
  }

  // Development fallback: direct Bhashini API call (requires VITE_BHASHINI_API_KEY)
  if (BHASHINI_API_KEY) {
    try {
      const res = await fetch(BHASHINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': BHASHINI_API_KEY,
        },
        body: JSON.stringify({
          pipelineTasks: [{
            taskType: 'translation',
            config: {
              language: {
                sourceLanguage: sourceInfo.indicTransCode,
                targetLanguage: targetInfo.indicTransCode,
              },
              serviceId: 'ai4bharat/indictrans-v2-all-gpu--t4',
            },
          }],
          inputData: {
            input: [{ source: request.text }],
          },
        }),
      });
      if (!res.ok) throw new Error(`Bhashini API error: ${res.status}`);
      const data = await res.json();
      const output = data.pipelineResponse?.[0]?.output?.[0]?.target ?? request.text;
      return {
        translatedText: output,
        sourceLang: request.sourceLang,
        targetLang: request.targetLang,
      };
    } catch (err) {
      console.error('Bhashini API error:', err);
      return { translatedText: request.text, ...request };
    }
  }

  // No translation service configured - return original text
  console.info('No translation service configured. Set VITE_TRANSLATION_API_URL or VITE_BHASHINI_API_KEY.');
  return { translatedText: request.text, ...request };
}

export async function translateAIResponse(text: string, targetLang: LanguageCode): Promise<string> {
  if (targetLang === 'en' || !text) return text;
  try {
    const result = await translateText({ text, sourceLang: 'en', targetLang });
    return result.translatedText;
  } catch {
    return text; // Graceful fallback: show English
  }
}

/**
 * Translates an entire ChatReply (content, suggestions, and blocks) from English to targetLang.
 */
export async function translateChatReply(reply: any, targetLang: LanguageCode): Promise<any> {
  if (targetLang === 'en') return reply;
  
  const translated = { ...reply };

  // Helper to translate an array of strings in parallel
  const translateArray = async (arr?: string[]) => {
    if (!arr) return arr;
    return Promise.all(arr.map(s => translateAIResponse(s, targetLang)));
  };

  if (translated.content) {
    translated.content = await translateAIResponse(translated.content, targetLang);
  }
  
  if (translated.suggestions) {
    translated.suggestions = await translateArray(translated.suggestions);
  }

  if (translated.blocks) {
    translated.blocks = await Promise.all(translated.blocks.map(async (block: any) => {
      const b = { ...block };
      if (b.title) b.title = await translateAIResponse(b.title, targetLang);
      if (b.description) b.description = await translateAIResponse(b.description, targetLang);
      if (b.requiredSkills) b.requiredSkills = await translateArray(b.requiredSkills);
      if (b.missingSkills) b.missingSkills = await translateArray(b.missingSkills);
      if (b.partialSkills) b.partialSkills = await translateArray(b.partialSkills);
      if (b.skills) b.skills = await translateArray(b.skills);
      if (b.provider) b.provider = await translateAIResponse(b.provider, targetLang);
      if (b.level) b.level = await translateAIResponse(b.level, targetLang);
      if (b.duration) b.duration = await translateAIResponse(b.duration, targetLang);
      if (b.company) b.company = await translateAIResponse(b.company, targetLang);
      if (b.location) b.location = await translateAIResponse(b.location, targetLang);
      if (b.targetRole) b.targetRole = await translateAIResponse(b.targetRole, targetLang);
      
      // If there are steps (learning path)
      if (b.steps) {
        b.steps = await Promise.all(b.steps.map(async (step: any) => ({
          ...step,
          title: await translateAIResponse(step.title, targetLang),
          duration: await translateAIResponse(step.duration, targetLang),
        })));
      }
      
      return b;
    }));
  }

  return translated;
}
