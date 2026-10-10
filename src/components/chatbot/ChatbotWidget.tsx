import { useEffect, useState } from 'react';
import './chatbot.css';
import { chatbotConfig } from '../../config/chatbotConfig';
import { I18nProvider, useI18n } from '../../i18n';
import { useChat } from '../../hooks/useChat';
import { useChatbot } from '../../hooks/useChatbot';
import { useResizableWindow } from '../../hooks/useResizableWindow';
import { useTheme, type Theme } from '../../hooks/useTheme';
import type { UserProfile } from '../../types/user';
import { isTeaserDismissed, rememberTeaserDismissed } from '../../utils/chatbotUtils';
import { ChatbotButton } from './ChatbotButton';
import { ChatbotTeaser } from './ChatbotTeaser';
import { ChatbotWindow } from './ChatbotWindow';

export interface ChatbotWidgetProps {
  user?: UserProfile | null;
  theme?: Theme;
  onThemeChange?: (theme: Theme) => void;
}

export function ChatbotWidget({ user, theme: themeProp, onThemeChange }: ChatbotWidgetProps) {
  return (
    <I18nProvider>
      <ChatbotWidgetInner user={user} theme={themeProp} onThemeChange={onThemeChange} />
    </I18nProvider>
  );
}

function ChatbotWidgetInner({ user, theme: themeProp, onThemeChange }: ChatbotWidgetProps) {
  const { isOpen, isClosing, open, close, profile } = useChatbot(user);
  const { language } = useI18n();
  const chat = useChat(language);
  const resize = useResizableWindow();
  const { theme, toggleTheme } = useTheme(themeProp, onThemeChange);
  const [wasOpened, setWasOpened] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(isTeaserDismissed);
  const { sendMessage } = chat;

  useEffect(() => { if (isOpen) setWasOpened(true); }, [isOpen]);

  const dismissTeaser = () => { setTeaserDismissed(true); rememberTeaserDismissed(); };
  const openChat = () => { dismissTeaser(); open(); };
  const askFromTeaser = (question: string) => { openChat(); sendMessage(question); };

  return (
    <div className="ncct-cb" data-theme={theme} style={{ zIndex: chatbotConfig.zIndex }}>
      {(isOpen || isClosing) ? (
        <ChatbotWindow
          chat={chat} profile={profile} theme={theme} closing={isClosing} resize={resize}
          onToggleTheme={toggleTheme} onClose={close}
        />
      ) : (
        <>
          {!teaserDismissed && <ChatbotTeaser onAsk={askFromTeaser} onDismiss={dismissTeaser} />}
          <ChatbotButton onClick={openChat} restoreFocus={wasOpened} />
        </>
      )}
    </div>
  );
}
