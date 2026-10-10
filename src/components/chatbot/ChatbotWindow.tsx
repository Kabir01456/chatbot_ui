import { useEffect, useState, type CSSProperties } from 'react';
import { useI18n } from '../../i18n';
import type { useChat } from '../../hooks/useChat';
import type { ResizableWindow } from '../../hooks/useResizableWindow';
import type { Theme } from '../../hooks/useTheme';
import type { UserProfile } from '../../types/user';
import { ChatErrorState } from './ChatErrorState';
import { ChatInput } from './ChatInput';
import { ChatMessageList } from './ChatMessageList';
import { ChatbotHeader } from './ChatbotHeader';
import { EmptyChatState } from './EmptyChatState';
import { LanguageSidebar } from './LanguageSidebar';

interface Props {
  chat: ReturnType<typeof useChat>;
  profile: UserProfile | null;
  theme: Theme;
  closing: boolean;
  resize: ResizableWindow;
  onToggleTheme: () => void;
  onClose: () => void;
}

export function ChatbotWindow({ chat, profile, theme, closing, resize, onToggleTheme, onClose }: Props) {
  const { messages, isTyping, isLoading, error, sendMessage, retryMessage, clearChat } = chat;
  const { t } = useI18n();
  const [langSidebarOpen, setLangSidebarOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (langSidebarOpen) setLangSidebarOpen(false);
        else onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, langSidebarOpen]);

  const sizeVars = resize.size
    ? ({ '--cb-w': `${resize.size.w}px`, '--cb-h': `${resize.size.h}px` } as CSSProperties)
    : undefined;

  return (
    <section
      ref={resize.windowRef} style={sizeVars} className="cb-window" role="dialog"
      aria-label={t.assistantName} data-state={closing ? 'closing' : 'open'}
    >
      <button
        type="button" className="cb-resize" onPointerDown={resize.startResize} onKeyDown={resize.onHandleKeyDown}
        aria-label={t.resizeChat} title="Drag to resize"
      />
      <ChatbotHeader
        theme={theme} expanded={resize.expanded} onToggleTheme={onToggleTheme} onToggleExpand={resize.toggleExpand}
        onNewChat={clearChat} onClose={onClose} onToggleLanguage={() => setLangSidebarOpen(v => !v)}
      />
      <div className="cb-body">
        {isLoading ? (
          <p className="cb-loading" role="status">{t.loadingConversation}</p>
        ) : messages.length === 0 ? (
          <>
            <EmptyChatState profile={profile} onSelect={sendMessage} />
            {error && <ChatErrorState code={error} onRetry={() => clearChat()} />}
          </>
        ) : (
          <ChatMessageList messages={messages} isTyping={isTyping} error={error} onRetry={retryMessage} onSelectSuggestion={sendMessage} />
        )}
      </div>
      <ChatInput onSend={sendMessage} disabled={isTyping || isLoading} />
      <LanguageSidebar open={langSidebarOpen} onClose={() => setLangSidebarOpen(false)} />
    </section>
  );
}
