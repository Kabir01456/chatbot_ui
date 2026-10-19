import { X, Sparkles, HelpCircle } from 'lucide-react';

interface Props {
  onAsk: (question: string) => void;
  onBrowse: () => void;
  onDismiss: () => void;
}

export function ChatbotWelcomePopup({ onAsk, onBrowse, onDismiss }: Props) {
  return (
    <aside
      className="cb-welcome-popup"
      role="dialog"
      aria-labelledby="cb-welcome-title"
      aria-describedby="cb-welcome-desc"
    >
      <button
        type="button"
        className="cb-welcome-popup__close"
        onClick={onDismiss}
        aria-label="Close welcome message"
        title="Close"
      >
        <X size={16} aria-hidden="true" />
      </button>

      <div className="cb-welcome-popup__header">
        <span className="cb-welcome-popup__badge">
          <Sparkles size={14} aria-hidden="true" /> AI Career Advisor
        </span>
      </div>

      <h3 id="cb-welcome-title" className="cb-welcome-popup__title">
        Hi there! 👋
      </h3>

      <p id="cb-welcome-desc" className="cb-welcome-popup__text">
        Welcome to NCCT Career AI Assistant. I'm here to help you explore career paths, evaluate your skills, and find recommended courses.
      </p>

      <div className="cb-welcome-popup__actions">
        <button
          type="button"
          className="cb-welcome-popup__btn cb-welcome-popup__btn--primary"
          onClick={() => onAsk('Based on my skills, where do I stand?')}
        >
          <Sparkles size={14} aria-hidden="true" />
          Where do I stand with my skills?
        </button>
        <button
          type="button"
          className="cb-welcome-popup__btn cb-welcome-popup__btn--secondary"
          onClick={onBrowse}
        >
          <HelpCircle size={14} aria-hidden="true" />
          Explore career paths & guides
        </button>
      </div>

    </aside>
  );
}
