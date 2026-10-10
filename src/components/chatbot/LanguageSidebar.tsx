import { Check, Globe, Search, X } from 'lucide-react';
import { useMemo, useRef, useState, useEffect } from 'react';
import { useI18n, LANGUAGES } from '../../i18n';
import type { LanguageCode } from '../../i18n';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function LanguageSidebar({ open, onClose }: Props) {
  const { language, setLanguage, t } = useI18n();
  const [search, setSearch] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus search input when sidebar opens
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setSearch('');
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.nativeName.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q)
    );
  }, [search]);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    onClose();
  };

  if (!open) return null;

  return (
    <aside
      ref={panelRef}
      className="cb-lang-sidebar"
      role="dialog"
      aria-label={t.selectLanguage}
    >
      <div className="cb-lang-header">
        <Globe size={18} aria-hidden="true" />
        <h3>{t.selectLanguage}</h3>
        <button
          type="button"
          className="cb-icon-btn cb-lang-close"
          onClick={onClose}
          aria-label={t.dismiss}
          title={t.dismiss}
        >
          <X size={16} />
        </button>
      </div>
      <div className="cb-lang-search">
        <Search size={14} aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.searchLanguages}
          aria-label={t.searchLanguages}
        />
      </div>
      <ul className="cb-lang-list" role="listbox" aria-label={t.selectLanguage}>
        {filtered.map((lang) => (
          <li key={lang.code} role="option" aria-selected={lang.code === language}>
            <button
              type="button"
              className={`cb-lang-item ${lang.code === language ? 'cb-lang-item--active' : ''}`}
              onClick={() => handleSelect(lang.code)}
            >
              <span className="cb-lang-native" dir={lang.dir}>{lang.nativeName}</span>
              <span className="cb-lang-english">{lang.name}</span>
              {lang.code === language && <Check size={16} className="cb-lang-check" aria-hidden="true" />}
            </button>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="cb-lang-empty">No languages found</li>
        )}
      </ul>
    </aside>
  );
}
