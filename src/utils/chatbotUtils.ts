import type { UserProfile } from '../types/user';
import { translations } from '../i18n/translations';
import type { LanguageCode } from '../i18n/types';

export const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const formatTime = (iso: string) =>
  new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(iso));

/** Only allow http(s) links from backend content. */
export const safeUrl = (url?: string) => (url && /^https?:\/\//i.test(url) ? url : undefined);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getFirstName = (profile: UserProfile | null) => profile?.name?.trim().split(/\s+/)[0] ?? '';

export function buildGreeting(profile: UserProfile | null) {
  const name = getFirstName(profile);
  return `Hi${name ? ` ${name}` : ' there'}! 👋\n\nI'm your NCCT Career Guidance Assistant.\n\nBased on your profile, I can help you explore career paths, improve your skills, find relevant courses, and understand what to learn next.\n\nWhat would you like to explore?`;
}

/** Same for every user: shown before the conversation starts. */
export const INITIAL_SUGGESTIONS = [
  'Based on my skills, where do I stand?',
  'Suggest a career path for me',
  'Which skills should I improve?',
  'Recommend courses for my career',
  'What skills are currently in demand?',
];



export function buildFollowUps(lastUserText: string, lang?: string): string[] {
  const asked = lastUserText.trim().toLowerCase();
  const t = translations[(lang as LanguageCode) || 'en'] || translations['en'];
  const allSuggestions = [
    t.suggestion1 || 'Based on my skills, where do I stand?',
    t.suggestion2 || 'Suggest a career path for me',
    t.suggestion3 || 'Which skills should I improve?',
    t.suggestion4 || 'Recommend courses for my career',
    t.suggestion5 || 'What skills are currently in demand?'
  ];
  return allSuggestions.filter((s) => s.toLowerCase() !== asked).slice(0, 3);
}

// Teaser dismissal is a harmless UI flag, kept per browser tab session only.
const TEASER_KEY = 'ncct-career-ai-teaser-dismissed';
export const isTeaserDismissed = () => {
  try { return sessionStorage.getItem(TEASER_KEY) === '1'; } catch { return false; }
};
export const rememberTeaserDismissed = () => {
  try { sessionStorage.setItem(TEASER_KEY, '1'); } catch { /* storage unavailable: ignore */ }
};
