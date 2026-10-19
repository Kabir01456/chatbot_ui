import {
  ArrowLeft,
  Globe,
  Maximize2,
  Minimize2,
  Moon,
  RotateCcw,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useI18n } from '../../i18n';
import type { Theme } from '../../hooks/useTheme';
import type { ChatbotView } from '../../types/help';

interface Props {
  view: ChatbotView;
  theme: Theme;
  expanded: boolean;
  articleTitle?: string;
  onBack?: () => void;
  onToggleTheme: () => void;
  onToggleExpand: () => void;
  onNewChat: () => void;
  onClose: () => void;
  onToggleLanguage: () => void;
}

function Btn({
  label,
  onClick,
  className = '',
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`cb-icon-btn ${className}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

export function ChatbotHeader({
  view,
  theme,
  expanded,
  articleTitle,
  onBack,
  onToggleTheme,
  onToggleExpand,
  onNewChat,
  onClose,
  onToggleLanguage,
}: Props) {
  const { t } = useI18n();

  const renderHeaderContent = () => {
    if (view === 'article') {
      return (
        <div className="cb-header__with-back">
          {onBack && (
            <button
              type="button"
              className="cb-header__back-btn"
              onClick={onBack}
              aria-label="Back"
              title="Back"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
          )}
          <div className="cb-header__text">
            <h2>Career Guide</h2>
            <p className="cb-header__truncate">{articleTitle || 'Career Guide'}</p>
          </div>
        </div>
      );
    }

    if (view === 'help') {
      return (
        <div className="cb-header__with-back">
          {onBack && (
            <button
              type="button"
              className="cb-header__back-btn"
              onClick={onBack}
              aria-label="Back to home"
              title="Back to home"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
          )}
          <div className="cb-header__text">
            <h2>Career Guides & Resources</h2>
            <p>Explore career paths, skills & courses</p>
          </div>
        </div>
      );
    }

    if (view === 'messages') {
      return (
        <div className="cb-header__with-back">
          {onBack && (
            <button
              type="button"
              className="cb-header__back-btn"
              onClick={onBack}
              aria-label="Back to home"
              title="Back to home"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
          )}
          <div className="cb-header__avatar-status">
            <span className="cb-avatar cb-avatar--lg" aria-hidden="true">
              <Sparkles size={18} />
            </span>
            <span className="cb-avatar-status-dot" title="Online" />
          </div>
          <div className="cb-header__text">
            <h2>{t.assistantName || 'NCCT Career Assistant'}</h2>
            <p>Always online • AI Career Guidance</p>
          </div>
        </div>
      );
    }

    // Default 'home' view header
    return (
      <div className="cb-header__brand">
        <span className="cb-avatar cb-avatar--lg" aria-hidden="true">
          <Sparkles size={18} />
        </span>
        <div className="cb-header__text">
          <h2>{t.assistantName || 'NCCT Career Assistant'}</h2>
          <p>{t.assistantSubtitle || 'AI Career Guidance & Counselling'}</p>
        </div>
      </div>
    );

  };

  return (
    <header className="cb-header">
      {renderHeaderContent()}
      <div className="cb-header__actions">
        {view === 'home' && (
          <div className="cb-header__avatar-stack" title="Career Advisors Online" aria-label="Career Advisors Online">
            <span className="cb-stack-avatar cb-stack-avatar--1">AI</span>
            <span className="cb-stack-avatar cb-stack-avatar--2">NC</span>
            <span className="cb-stack-avatar cb-stack-avatar--3">CT</span>
          </div>
        )}
        {view === 'messages' && (
          <Btn label={t.startNewConversation} onClick={onNewChat}>
            <RotateCcw size={16} />
          </Btn>
        )}
        <Btn label={t.selectLanguage} onClick={onToggleLanguage}>
          <Globe size={16} />
        </Btn>
        <Btn
          label={theme === 'dark' ? t.switchToLightMode : t.switchToDarkMode}
          onClick={onToggleTheme}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </Btn>
        <Btn
          label={expanded ? t.restoreDefaultSize : t.expandChat}
          onClick={onToggleExpand}
          className="cb-hide-mobile"
        >
          {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </Btn>
        <Btn label={t.closeChat} onClick={onClose}>
          <X size={16} />
        </Btn>
      </div>
    </header>
  );
}
