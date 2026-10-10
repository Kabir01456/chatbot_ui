import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { LanguageCode, Translations } from './types';
import { DEFAULT_LANGUAGE } from './languages';
import { translations } from './translations';

const STORAGE_KEY = 'ncct-cb-language';

function loadSavedLanguage(): LanguageCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in translations) return saved as LanguageCode;
  } catch { /* storage unavailable */ }
  return DEFAULT_LANGUAGE;
}

function saveLanguage(code: LanguageCode): void {
  try { localStorage.setItem(STORAGE_KEY, code); } catch { /* ignore */ }
}

interface I18nContextValue {
  language: LanguageCode;
  t: Translations;
  setLanguage: (code: LanguageCode) => void;
}

const I18nContext = createContext<I18nContextValue>({
  language: DEFAULT_LANGUAGE,
  t: translations[DEFAULT_LANGUAGE],
  setLanguage: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<LanguageCode>(loadSavedLanguage);

  const setLanguage = useCallback((code: LanguageCode) => {
    setLang(code);
    saveLanguage(code);
  }, []);

  const t = translations[language] ?? translations[DEFAULT_LANGUAGE];

  return (
    <I18nContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}
