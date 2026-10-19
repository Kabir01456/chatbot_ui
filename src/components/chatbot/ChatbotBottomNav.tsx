import { Home, MessageSquare, HelpCircle } from 'lucide-react';
import type { ChatbotView } from '../../types/help';

interface Props {
  activeView: ChatbotView;
  unreadCount?: number;
  onNavigate: (view: ChatbotView) => void;
}

export function ChatbotBottomNav({ activeView, unreadCount = 0, onNavigate }: Props) {
  const isTabActive = (view: ChatbotView) => {
    if (view === 'help' && activeView === 'article') return true;
    return activeView === view;
  };

  return (
    <nav className="cb-bottom-nav" aria-label="Support Navigation">
      <button
        type="button"
        className={`cb-bottom-nav__item ${isTabActive('home') ? 'cb-bottom-nav__item--active' : ''}`}
        onClick={() => onNavigate('home')}
        aria-current={isTabActive('home') ? 'page' : undefined}
      >
        <Home size={20} aria-hidden="true" />
        <span>Home</span>
      </button>

      <button
        type="button"
        className={`cb-bottom-nav__item ${isTabActive('messages') ? 'cb-bottom-nav__item--active' : ''}`}
        onClick={() => onNavigate('messages')}
        aria-current={isTabActive('messages') ? 'page' : undefined}
      >
        <div className="cb-bottom-nav__icon-wrap">
          <MessageSquare size={20} aria-hidden="true" />
          {unreadCount > 0 && <span className="cb-bottom-nav__badge">{unreadCount}</span>}
        </div>
        <span>Messages</span>
      </button>

      <button
        type="button"
        className={`cb-bottom-nav__item ${isTabActive('help') ? 'cb-bottom-nav__item--active' : ''}`}
        onClick={() => onNavigate('help')}
        aria-current={isTabActive('help') ? 'page' : undefined}
      >
        <HelpCircle size={20} aria-hidden="true" />
        <span>Help</span>
      </button>
    </nav>
  );
}
