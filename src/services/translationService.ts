import type { LanguageCode } from '../i18n/types';
import { getLanguageInfo } from '../i18n/languages';
import type { ChatReply } from '../types/chatbot';

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
export async function translateChatReply(reply: ChatReply, targetLang: LanguageCode): Promise<ChatReply> {
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
    translated.blocks = await Promise.all(translated.blocks.map(async (block) => {
      const b = { ...(block as unknown as Record<string, unknown>) };

      if (typeof b.title === 'string') b.title = await translateAIResponse(b.title, targetLang);
      if (typeof b.description === 'string') b.description = await translateAIResponse(b.description, targetLang);
      if (Array.isArray(b.requiredSkills)) b.requiredSkills = await translateArray(b.requiredSkills as string[]);
      if (Array.isArray(b.missingSkills)) b.missingSkills = await translateArray(b.missingSkills as string[]);
      if (Array.isArray(b.partialSkills)) b.partialSkills = await translateArray(b.partialSkills as string[]);
      if (Array.isArray(b.skills)) b.skills = await translateArray(b.skills as string[]);
      if (typeof b.provider === 'string') b.provider = await translateAIResponse(b.provider, targetLang);
      if (typeof b.level === 'string') b.level = await translateAIResponse(b.level, targetLang);
      if (typeof b.duration === 'string') b.duration = await translateAIResponse(b.duration, targetLang);
      if (typeof b.company === 'string') b.company = await translateAIResponse(b.company, targetLang);
      if (typeof b.location === 'string') b.location = await translateAIResponse(b.location, targetLang);
      if (typeof b.targetRole === 'string') b.targetRole = await translateAIResponse(b.targetRole, targetLang);
      
      // If there are steps (learning path)
      if (Array.isArray(b.steps)) {
        b.steps = await Promise.all((b.steps as Array<Record<string, unknown>>).map(async (step) => ({
          ...step,
          title: typeof step.title === 'string' ? await translateAIResponse(step.title, targetLang) : step.title,
          duration: typeof step.duration === 'string' ? await translateAIResponse(step.duration, targetLang) : step.duration,
        })));
      }
      
      return b as unknown as typeof block;
    }));
  }


  return translated;
}
