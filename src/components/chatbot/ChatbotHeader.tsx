import { Globe, GraduationCap, Maximize2, Minimize2, Moon, RotateCcw, Sun, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useI18n } from '../../i18n';
import type { Theme } from '../../hooks/useTheme';

interface Props {
  theme: Theme;
  expanded: boolean;
  onToggleTheme: () => void;
  onToggleExpand: () => void;
  onNewChat: () => void;
  onClose: () => void;
  onToggleLanguage: () => void;
}

function Btn({ label, onClick, className = '', children }: { label: string; onClick: () => void; className?: string; children: ReactNode }) {
  return <button type="button" className={`cb-icon-btn ${className}`} onClick={onClick} aria-label={label} title={label}>{children}</button>;
}

export function ChatbotHeader({ theme, expanded, onToggleTheme, onToggleExpand, onNewChat, onClose, onToggleLanguage }: Props) {
  const { t } = useI18n();
  return (
    <header className="cb-header">
      <span className="cb-avatar cb-avatar--lg" aria-hidden="true"><GraduationCap size={20} /></span>
      <div className="cb-header__text">
        <h2>{t.assistantName}</h2>
        <p>{t.assistantSubtitle}</p>
      </div>
      <div className="cb-header__actions">
        <Btn label={t.selectLanguage} onClick={onToggleLanguage}><Globe size={16} /></Btn>
        <Btn label={t.startNewConversation} onClick={onNewChat}><RotateCcw size={16} /></Btn>
        <Btn label={theme === 'dark' ? t.switchToLightMode : t.switchToDarkMode} onClick={onToggleTheme}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </Btn>
        <Btn label={expanded ? t.restoreDefaultSize : t.expandChat} onClick={onToggleExpand} className="cb-hide-mobile">
          {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </Btn>
        <Btn label={t.closeChat} onClick={onClose}><X size={16} /></Btn>
      </div>
    </header>
  );
}
