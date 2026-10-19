import { MessageSquare, X } from 'lucide-react';

interface Props {
  onOpen: () => void;
  onDismiss: () => void;
}

export function ChatbotProactiveBubble({ onOpen, onDismiss }: Props) {
  return (
    <aside
      className="cb-proactive-bubble"
      role="status"
      aria-live="polite"
      aria-label="Support suggestion"
    >
      <button
        type="button"
        className="cb-proactive-bubble__close"
        onClick={onDismiss}
        aria-label="Dismiss proactive tip"
        title="Dismiss"
      >
        <X size={14} aria-hidden="true" />
      </button>

      <div
        className="cb-proactive-bubble__content"
        onClick={onOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        <span className="cb-proactive-bubble__icon" aria-hidden="true">
          <MessageSquare size={16} />
        </span>
        <div className="cb-proactive-bubble__text-wrap">
          <p className="cb-proactive-bubble__title">Thinking about your career? 🎓</p>
          <p className="cb-proactive-bubble__text">
            You can ask our AI career advisor questions anytime!
          </p>
        </div>

      </div>
    </aside>
  );
}
