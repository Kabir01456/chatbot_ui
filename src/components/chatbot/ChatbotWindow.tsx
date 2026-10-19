import { useEffect, useState, type CSSProperties } from 'react';
import { useI18n } from '../../i18n';
import type { useChat } from '../../hooks/useChat';
import type { ResizableWindow } from '../../hooks/useResizableWindow';
import type { Theme } from '../../hooks/useTheme';
import type { UserProfile } from '../../types/user';
import type { ChatbotView, HelpArticle } from '../../types/help';
import { ChatErrorState } from './ChatErrorState';
import { ChatInput } from './ChatInput';
import { ChatMessageList } from './ChatMessageList';
import { ChatbotHeader } from './ChatbotHeader';
import { EmptyChatState } from './EmptyChatState';
import { LanguageSidebar } from './LanguageSidebar';
import { ChatbotHomeView } from './ChatbotHomeView';
import { ChatbotHelpView } from './ChatbotHelpView';
import { ChatbotArticleView } from './ChatbotArticleView';
import { ChatbotBottomNav } from './ChatbotBottomNav';

interface Props {
  chat: ReturnType<typeof useChat>;
  profile: UserProfile | null;
  theme: Theme;
  closing: boolean;
  resize: ResizableWindow;
  initialView?: ChatbotView;
  initialQuestion?: string;
  onToggleTheme: () => void;
  onClose: () => void;
}

export function ChatbotWindow({
  chat,
  profile,
  theme,
  closing,
  resize,
  initialView = 'home',
  initialQuestion,
  onToggleTheme,
  onClose,
}: Props) {
  const { messages, isTyping, isLoading, error, sendMessage, retryMessage, clearChat } = chat;
  const { t } = useI18n();

  const [currentView, setCurrentView] = useState<ChatbotView>(
    initialQuestion ? 'messages' : initialView
  );
  const [previousView, setPreviousView] = useState<ChatbotView>('home');
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [helpSearchQuery, setHelpSearchQuery] = useState('');
  const [langSidebarOpen, setLangSidebarOpen] = useState(false);

  // Destructure resize values
  const {
    size,
    expanded,
    windowRef,
    startResize,
    onHandleKeyDown,
    toggleExpand,
    expandToArticle,
    restoreCompact,
  } = resize;

  // Handle initial question if opened with one
  useEffect(() => {
    if (initialQuestion) {
      sendMessage(initialQuestion);
    }
  }, [initialQuestion, sendMessage]);


  // Handle escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (langSidebarOpen) setLangSidebarOpen(false);
        else if (currentView === 'article') {
          setCurrentView(previousView);
          restoreCompact();
        } else if (currentView !== 'home') {
          setCurrentView('home');
        } else {
          onClose();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, langSidebarOpen, currentView, previousView, restoreCompact]);

  // Article selection handler: auto-expands the chatbot into large view
  const handleSelectArticle = (article: HelpArticle) => {
    setPreviousView(currentView === 'article' ? previousView : currentView);
    setSelectedArticle(article);
    setCurrentView('article');
    // Automatically transition chatbot to expanded view
    expandToArticle();
  };

  // Back button handler: returns to home and restores compact window
  const handleBack = () => {
    if (currentView === 'article') {
      setCurrentView(previousView);
      if (previousView === 'home') {
        restoreCompact();
      }
    } else {
      setCurrentView('home');
      restoreCompact();
    }
  };

  // Ask question entry point: auto-expands the chatbot into large conversation view
  const handleAskQuestion = (initialText?: string) => {
    setPreviousView(currentView);
    setCurrentView('messages');
    // Automatically transition chatbot to expanded view
    expandToArticle();
    if (initialText) {
      sendMessage(initialText);
    }
  };

  // Browse help entry point
  const handleBrowseHelp = (query?: string) => {
    setPreviousView(currentView);
    setHelpSearchQuery(query || '');
    setCurrentView('help');
  };

  // Bottom navigation tab switch
  const handleNavigate = (view: ChatbotView) => {
    if (view === currentView) return;
    if (view === 'home') {
      restoreCompact();
    } else if (view === 'messages') {
      expandToArticle();
    }
    setPreviousView(currentView);
    setCurrentView(view);
  };

  const sizeVars = size
    ? ({ '--cb-w': `${size.w}px`, '--cb-h': `${size.h}px` } as CSSProperties)
    : undefined;

  return (
    <section
      ref={windowRef}
      style={sizeVars}
      className={`cb-window ${expanded ? 'cb-window--expanded' : ''} cb-window--view-${currentView}`}
      role="dialog"
      aria-label={t.assistantName}
      data-state={closing ? 'closing' : 'open'}
    >
      <button
        type="button"
        className="cb-resize"
        onPointerDown={startResize}
        onKeyDown={onHandleKeyDown}
        aria-label={t.resizeChat}
        title="Drag to resize"
      />

      <ChatbotHeader
        view={currentView}
        theme={theme}
        expanded={expanded}
        articleTitle={selectedArticle?.title}
        onBack={currentView !== 'home' ? handleBack : undefined}
        onToggleTheme={onToggleTheme}
        onToggleExpand={toggleExpand}
        onNewChat={clearChat}
        onClose={onClose}
        onToggleLanguage={() => setLangSidebarOpen((v) => !v)}
      />

      <div className="cb-main-content">
        {currentView === 'home' && (
          <div className="cb-view-container">
            <ChatbotHomeView
              profile={profile}
              onSelectArticle={handleSelectArticle}
              onAskQuestion={handleAskQuestion}
              onBrowseHelp={handleBrowseHelp}
            />
          </div>
        )}

        {currentView === 'help' && (
          <div className="cb-view-container">
            <ChatbotHelpView
              initialSearch={helpSearchQuery}
              onSelectArticle={handleSelectArticle}
              onAskQuestion={handleAskQuestion}
            />
          </div>
        )}

        {currentView === 'article' && selectedArticle && (
          <div className="cb-view-container cb-view-container--article">
            <ChatbotArticleView
              article={selectedArticle}
              onBack={handleBack}
              onSelectArticle={handleSelectArticle}
              onAskQuestion={handleAskQuestion}
            />
          </div>
        )}

        {currentView === 'messages' && (
          <div className="cb-view-container cb-view-container--messages">
            <div className="cb-body">
              {isLoading ? (
                <p className="cb-loading" role="status">
                  {t.loadingConversation}
                </p>
              ) : messages.length === 0 ? (
                <>
                  <EmptyChatState profile={profile} onSelect={sendMessage} />
                  {error && <ChatErrorState code={error} onRetry={() => clearChat()} />}
                </>
              ) : (
                <ChatMessageList
                  messages={messages}
                  isTyping={isTyping}
                  error={error}
                  onRetry={retryMessage}
                  onSelectSuggestion={sendMessage}
                />
              )}
            </div>
            <ChatInput onSend={sendMessage} disabled={isTyping || isLoading} />
          </div>
        )}
      </div>

      <ChatbotBottomNav
        activeView={currentView}
        unreadCount={messages.length > 0 && currentView !== 'messages' ? 1 : 0}
        onNavigate={handleNavigate}
      />

      <LanguageSidebar open={langSidebarOpen} onClose={() => setLangSidebarOpen(false)} />
    </section>
  );
}
