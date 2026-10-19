import { useState } from 'react';
import { ArrowLeft, Clock, ThumbsUp, ThumbsDown, MessageSquare, BookOpen, Check, Share2 } from 'lucide-react';
import type { HelpArticle } from '../../types/help';
import { getPopularArticles } from '../../services/helpData';

interface Props {
  article: HelpArticle;
  onBack: () => void;
  onSelectArticle: (article: HelpArticle) => void;
  onAskQuestion: (initialText?: string) => void;
}

export function ChatbotArticleView({
  article,
  onBack,
  onSelectArticle,
  onAskQuestion,
}: Props) {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [copied, setCopied] = useState(false);

  // Related articles (excluding current)
  const relatedArticles = getPopularArticles().filter((a) => a.id !== article.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Render markdown-like sections (headings, blockquotes, lists, bold)
  const renderFormattedBody = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="cb-article__list">
            {currentList.map((item, idx) => (
              <li key={idx}>
                {item.split('**').map((seg, i) =>
                  i % 2 === 1 ? <strong key={i}>{seg}</strong> : seg
                )}
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        currentList.push(trimmed.slice(2));
        return;
      }

      flushList();

      if (!trimmed) {
        return;
      }

      if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="cb-article__h2">
            {trimmed.slice(3)}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="cb-article__h3">
            {trimmed.slice(4)}
          </h3>
        );
      } else if (trimmed.startsWith('> ')) {
        const text = trimmed.slice(2);
        elements.push(
          <blockquote key={index} className="cb-article__quote">
            {text.split('**').map((seg, i) =>
              i % 2 === 1 ? <strong key={i}>{seg}</strong> : seg
            )}
          </blockquote>
        );
      } else if (trimmed === '---') {
        elements.push(<hr key={index} className="cb-article__hr" />);
      } else if (/^\d+\.\s/.test(trimmed)) {
        const numText = trimmed.replace(/^\d+\.\s/, '');
        elements.push(
          <div key={index} className="cb-article__ordered-item">
            <span className="cb-article__ordered-num">{trimmed.match(/^\d+/)?.[0]}.</span>
            <div className="cb-article__ordered-content">
              {numText.split('**').map((seg, i) =>
                i % 2 === 1 ? <strong key={i}>{seg}</strong> : seg
              )}
            </div>
          </div>
        );
      } else {
        elements.push(
          <p key={index} className="cb-article__p">
            {trimmed.split('**').map((seg, i) =>
              i % 2 === 1 ? <strong key={i}>{seg}</strong> : seg
            )}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <div className="cb-article">
      {/* Article top breadcrumb / nav */}
      <div className="cb-article__top-bar">
        <button
          type="button"
          className="cb-article__back-btn"
          onClick={onBack}
          aria-label="Back to previous view"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back</span>
        </button>
        <span className="cb-article__breadcrumb">
          Career Guides / {article.category}
        </span>
        <button
          type="button"
          className="cb-article__share-btn"
          onClick={handleShare}
          title="Share article link"
          aria-label="Share article"
        >
          {copied ? <Check size={15} /> : <Share2 size={15} />}
          <span>{copied ? 'Copied' : 'Share'}</span>
        </button>
      </div>

      {/* Independently Scrollable Container */}
      <div className="cb-article__scroll-container">
        <article className="cb-article__content">
          {/* Header Metadata */}
          <header className="cb-article__header">
            <div className="cb-article__tags">
              <span className="cb-article__badge">{article.category}</span>
              <span className="cb-article__read-time">
                <Clock size={13} aria-hidden="true" /> {article.readTime}
              </span>
            </div>

            <h1 className="cb-article__title">{article.title}</h1>
            <p className="cb-article__subtitle">{article.subtitle}</p>

            {/* Author info row */}
            <div className="cb-article__author-row">
              <div className="cb-article__avatar-wrap">
                {article.author.avatar ? (
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="cb-article__avatar"
                  />
                ) : (
                  <div className="cb-article__avatar cb-article__avatar--fallback">
                    {article.author.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="cb-article__author-details">
                <span className="cb-article__author-name">
                  Written by {article.author.name}
                </span>
                <span className="cb-article__author-role">
                  {article.author.role} • {article.updatedAt}
                </span>
              </div>
            </div>
          </header>

          {/* Article Main Body */}
          <div className="cb-article__body">
            {renderFormattedBody(article.content)}
          </div>

          {/* Feedback Section */}
          <footer className="cb-article__footer">
            <div className="cb-article__feedback">
              <h4>Was this career guide helpful?</h4>
              {feedback ? (
                <div className="cb-article__feedback-done">
                  <Check size={16} />
                  <span>Thank you for your feedback!</span>
                </div>
              ) : (
                <div className="cb-article__feedback-buttons">
                  <button
                    type="button"
                    className="cb-article__feedback-btn"
                    onClick={() => setFeedback('yes')}
                    aria-label="Yes, this article was helpful"
                  >
                    <ThumbsUp size={15} /> Yes
                  </button>
                  <button
                    type="button"
                    className="cb-article__feedback-btn"
                    onClick={() => setFeedback('no')}
                    aria-label="No, this article was not helpful"
                  >
                    <ThumbsDown size={15} /> No
                  </button>
                </div>
              )}
            </div>

            {/* Still have questions banner */}
            <div className="cb-article__ask-banner">
              <div className="cb-article__ask-text">
                <strong>Need personalized career advice?</strong>
                <span>Our Career AI Advisor can evaluate your skills and suggest next steps for this path.</span>
              </div>
              <button
                type="button"
                className="cb-article__ask-action"
                onClick={() => onAskQuestion(`I have a career question about: ${article.title}`)}
              >
                <MessageSquare size={16} aria-hidden="true" />
                <span>Chat with Career AI</span>
              </button>
            </div>

            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
              <div className="cb-article__related">
                <h3>Related Career Guides</h3>
                <div className="cb-article__related-grid">
                  {relatedArticles.map((rel) => (
                    <button
                      key={rel.id}
                      type="button"
                      className="cb-article__related-card"
                      onClick={() => onSelectArticle(rel)}
                    >
                      <BookOpen size={16} className="cb-article__related-icon" aria-hidden="true" />
                      <div className="cb-article__related-text">
                        <h5>{rel.title}</h5>
                        <span>{rel.readTime}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </footer>
        </article>
      </div>
    </div>
  );
}
