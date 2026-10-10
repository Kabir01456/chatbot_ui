import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useI18n } from '../../i18n';

export function ChatbotButton({ onClick, restoreFocus }: { onClick: () => void; restoreFocus?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const { t } = useI18n();
  useEffect(() => { if (restoreFocus) ref.current?.focus(); }, [restoreFocus]);
  return (
    <button ref={ref} type="button" className="cb-launcher" onClick={onClick} aria-label={t.openAssistant} title={t.openAssistant}>
      <ChevronDown size={24} aria-hidden="true" />
      <span className="cb-launcher__text">{t.openAssistant}</span>
    </button>
  );
}
