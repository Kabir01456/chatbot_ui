import { GraduationCap } from 'lucide-react';
import type { ChatMessage as Message } from '../../types/chatbot';
import { useI18n } from '../../i18n';
import { formatTime } from '../../utils/chatbotUtils';
import { RecommendationBlockView } from './RecommendationCards';
import { RichText } from './RichText';

export function AssistantAvatar() {
  return <span className="cb-avatar" aria-hidden="true"><GraduationCap size={16} /></span>;
}

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const { t } = useI18n();
  return (
    <div className={`cb-msg ${isUser ? 'cb-msg--user' : 'cb-msg--ai'}`} data-status={message.status}>
      {!isUser && <AssistantAvatar />}
      <div className="cb-msg__body">
        <span className="cb-sr">{isUser ? t.youSaid : t.assistantSaid}</span>
        {message.content && (
          <div className="cb-bubble">
            {isUser ? <p>{message.content}</p> : <RichText text={message.content} />}
            {(!message.blocks || message.blocks.length === 0) && (
              <time className="cb-msg__time cb-msg__time--inline" dateTime={message.createdAt}>{formatTime(message.createdAt)}</time>
            )}
          </div>
        )}
        {message.blocks && message.blocks.length > 0 && (
          <div className="cb-carousel">
            {message.blocks.map((b, i) => (
              <div key={i} className="cb-carousel__item">
                <RecommendationBlockView block={b} />
              </div>
            ))}
          </div>
        )}
        {message.blocks && message.blocks.length > 0 && (
          <time className="cb-msg__time cb-msg__time--block" dateTime={message.createdAt}>{formatTime(message.createdAt)}</time>
        )}
      </div>
    </div>
  );
}
