import { useI18n } from '../../i18n';
import { AssistantAvatar } from './ChatMessage';

export function TypingIndicator() {
  const { t } = useI18n();
  return (
    <div className="cb-msg cb-msg--ai" role="status">
      <AssistantAvatar />
      <div className="cb-bubble cb-typing">
        <span className="cb-dot" /><span className="cb-dot" /><span className="cb-dot" />
        <span className="cb-sr">{t.typingIndicator}</span>
      </div>
    </div>
  );
}
