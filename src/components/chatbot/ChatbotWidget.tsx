import { useState } from 'react';
import './chatbot.css';
import { chatbotConfig } from '../../config/chatbotConfig';
import { I18nProvider, useI18n } from '../../i18n';
import { useChat } from '../../hooks/useChat';
import { useChatbot } from '../../hooks/useChatbot';
import { useResizableWindow } from '../../hooks/useResizableWindow';
import { useTheme, type Theme } from '../../hooks/useTheme';
import type { UserProfile } from '../../types/user';
import type { ChatbotView } from '../../types/help';
import { ChatbotButton } from './ChatbotButton';
import { ChatbotWindow } from './ChatbotWindow';

export interface ChatbotWidgetProps {
  user?: UserProfile | null;
  theme?: Theme;
  onThemeChange?: (theme: Theme) => void;
}

export function ChatbotWidget({
  user,
  theme: themeProp,
  onThemeChange,
}: ChatbotWidgetProps) {
  return (
    <I18nProvider>
      <ChatbotWidgetInner
        user={user}
        theme={themeProp}
        onThemeChange={onThemeChange}
      />
    </I18nProvider>
  );
}

function ChatbotWidgetInner({
  user,
  theme: themeProp,
  onThemeChange,
}: ChatbotWidgetProps) {
  const { isOpen, isClosing, open, close, profile } = useChatbot(user);
  const { language } = useI18n();
  const chat = useChat(language);
  const resize = useResizableWindow();
  const { theme, toggleTheme } = useTheme(themeProp, onThemeChange);

  const [wasOpened, setWasOpened] = useState(false);
  const [initialView, setInitialView] = useState<ChatbotView>('home');
  const [initialQuestion, setInitialQuestion] = useState<string | undefined>(undefined);

  // Open chatbot handler
  const openChatWith = (view: ChatbotView = 'home', question?: string) => {
    setWasOpened(true);
    setInitialView(view);
    setInitialQuestion(question);
    open();
  };

  return (
    <div className="ncct-cb" data-theme={theme} style={{ zIndex: chatbotConfig.zIndex }}>
      {(isOpen || isClosing) && (
        <ChatbotWindow
          chat={chat}
          profile={profile}
          theme={theme}
          closing={isClosing}
          resize={resize}
          initialView={initialView}
          initialQuestion={initialQuestion}
          onToggleTheme={toggleTheme}
          onClose={close}
        />
      )}

      {/* Floating launcher button (matches 2.mp4: headset icon when closed, down chevron when open) */}
      <ChatbotButton
        isOpen={isOpen}
        onClick={() => {
          if (isOpen) {
            close();
          } else {
            openChatWith('home');
          }
        }}
        restoreFocus={wasOpened}
      />
    </div>
  );
}
