import { useState, useMemo } from 'react';
import { Search, ChevronRight, HelpCircle, MessageSquare, BookOpen, Clock } from 'lucide-react';
import type { HelpArticle } from '../../types/help';
import { HELP_CATEGORIES, searchHelpArticles } from '../../services/helpData';

interface Props {
  initialSearch?: string;
  onSelectArticle: (article: HelpArticle) => void;
  onAskQuestion: (initialText?: string) => void;
}

export function ChatbotHelpView({
  initialSearch = '',
  onSelectArticle,
  onAskQuestion,
}: Props) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredArticles = useMemo(() => {
    return searchHelpArticles(search, selectedCategory);
  }, [search, selectedCategory]);

  return (
    <div className="cb-help">
      <div className="cb-help__header">
        <div className="cb-help__header-text">
          <h2>Career Guides & Resources</h2>
          <p>Explore career paths, skill benchmarks, and curated learning guides.</p>
        </div>

        {/* Search Input */}
        <div className="cb-help__search-bar">
          <Search size={18} className="cb-help__search-icon" aria-hidden="true" />
          <input
            type="text"
            className="cb-help__search-input"
            placeholder="Search career topics, skills, courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search career guides"
          />

          {search && (
            <button
              type="button"
              className="cb-help__search-clear"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="cb-help__categories" role="tablist" aria-label="Article categories">
          {HELP_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`cb-help__category-pill ${
                selectedCategory === cat ? 'cb-help__category-pill--active' : ''
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Article List */}
      <div className="cb-help__body">
        {filteredArticles.length > 0 ? (
          <ul className="cb-help__list">
            {filteredArticles.map((article) => (
              <li key={article.id}>
                <button
                  type="button"
                  className="cb-help__card"
                  onClick={() => onSelectArticle(article)}
                >
                  <div className="cb-help__card-icon">
                    <BookOpen size={18} aria-hidden="true" />
                  </div>
                  <div className="cb-help__card-content">
                    <div className="cb-help__card-meta">
                      <span className="cb-help__card-badge">{article.category}</span>
                      <span className="cb-help__card-time">
                        <Clock size={12} aria-hidden="true" /> {article.readTime}
                      </span>
                    </div>
                    <h3 className="cb-help__card-title">{article.title}</h3>
                    <p className="cb-help__card-sub">{article.subtitle}</p>
                  </div>
                  <ChevronRight size={18} className="cb-help__card-chevron" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="cb-help__empty">
            <HelpCircle size={36} className="cb-help__empty-icon" aria-hidden="true" />
            <h3>No career guides found</h3>
            <p>We couldn't find any career guides matching your search query.</p>
            <button
              type="button"
              className="cb-help__ask-btn"
              onClick={() => onAskQuestion(search)}
            >
              <MessageSquare size={16} aria-hidden="true" />
              Ask our Career AI Advisor instead
            </button>

          </div>
        )}
      </div>
    </div>
  );
}
