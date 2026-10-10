import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { chatbotConfig } from '../../config/chatbotConfig';
import { useI18n } from '../../i18n';

interface Props { onAsk: (question: string) => void; onDismiss: () => void }

export function ChatbotTeaser({ onAsk, onDismiss }: Props) {
  const [visible, setVisible] = useState(false);
  const { t } = useI18n();
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), chatbotConfig.teaser.showAfterMs);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;

  return (
    <aside className="cb-teaser" aria-label={t.careerAssistantTip}>
      <button type="button" className="cb-teaser__close" onClick={onDismiss} aria-label={t.dismiss} title={t.dismiss}>
        <X size={14} aria-hidden="true" />
      </button>
      <p>{t.teaserMessage}</p>
      <div className="cb-teaser__actions">
        <button type="button" className="cb-teaser__btn" onClick={() => onAsk(t.teaserQuestion1)}>{t.teaserQuestion1}</button>
        <button type="button" className="cb-teaser__btn" onClick={() => onAsk(t.teaserQuestion2)}>{t.teaserQuestion2}</button>
      </div>
    </aside>
  );
}
