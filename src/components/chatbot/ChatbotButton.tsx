import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useI18n } from '../../i18n';

interface Props {
  isOpen: boolean;
  onClick: () => void;
  restoreFocus?: boolean;
}

export function ChatbotButton({ isOpen, onClick, restoreFocus }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const { t } = useI18n();
  useEffect(() => { if (restoreFocus) ref.current?.focus(); }, [restoreFocus]);
  return (
    <button
      ref={ref}
      type="button"
      className={`cb-launcher ${isOpen ? 'cb-launcher--open' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? t.closeChat : t.openAssistant}
      title={isOpen ? t.closeChat : t.openAssistant}
    >
      {isOpen ? (
        <ChevronDown size={28} className="cb-launcher__chevron" aria-hidden="true" />
      ) : (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
          <rect x="2" y="13" width="4" height="6" rx="2" fill="currentColor" fillOpacity="0.25" />
          <rect x="18" y="13" width="4" height="6" rx="2" fill="currentColor" fillOpacity="0.25" />
          <path d="M19 18v1a2 2 0 0 1-2 2h-4" />
          <rect x="11" y="20" width="3" height="2" rx="1" fill="currentColor" />
          <circle cx="12" cy="10" r="2.2" strokeWidth="1.6" />
          <path d="M12 6.5v1.2M12 12.3v1.2M8.5 10h1.2M14.3 10h1.2M9.5 7.5l.85.85M13.65 11.65l.85.85M9.5 12.5l.85-.85M13.65 8.35l.85-.85" strokeWidth="1.4" />
        </svg>
      )}
      <span className="cb-launcher__text">{isOpen ? t.closeChat : t.openAssistant}</span>
    </button>
  );
}
