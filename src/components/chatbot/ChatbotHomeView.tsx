import { useState, useMemo } from 'react';
import { Search, ChevronRight, Sparkles, CheckCircle2, MessageSquare, ArrowRight, HelpCircle, Compass, Target, GraduationCap } from 'lucide-react';
import type { UserProfile } from '../../types/user';
import type { HelpArticle } from '../../types/help';
import { getPopularArticles, searchHelpArticles } from '../../services/helpData';
import { getFirstName } from '../../utils/chatbotUtils';

interface Props {
  profile: UserProfile | null;
  onSelectArticle: (article: HelpArticle) => void;
  onAskQuestion: (initialText?: string) => void;
  onBrowseHelp: (query?: string) => void;
}

const CAPABILITY_QUESTIONS = [
  'Based on my skills, where do I stand?',
  'Suggest a career path for me',
  'Which in-demand skills should I learn this year?',
  'Recommend courses for my career',
  'How do I transition into Full-Stack or AI roles?',
];

export function ChatbotHomeView({
  profile,
  onSelectArticle,
  onAskQuestion,
  onBrowseHelp,
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const firstName = getFirstName(profile);
  const popularArticles = useMemo(() => getPopularArticles(), []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchHelpArticles(searchQuery).slice(0, 4);
  }, [searchQuery]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      onBrowseHelp(searchQuery.trim());
    }
  };

  return (
    <div className="cb-home">
      {/* Dark teal / deep navy header hero banner */}
      <div className="cb-home__hero">
        <div className="cb-home__greeting-wrap">
          <span className="cb-home__badge">
            <Sparkles size={13} aria-hidden="true" />
            AI Career Advisor
          </span>
          <h2 className="cb-home__greeting">
            {firstName ? `Hello, ${firstName}!` : 'Hello!'}
            <br />
            <span>How can we guide your career?</span>
          </h2>
        </div>

        {/* System status card */}
        <div className="cb-home__status-card">
          <div className="cb-home__status-indicator">
            <span className="cb-home__status-pulse" />
            <span className="cb-home__status-dot" />
          </div>
          <div className="cb-home__status-info">
            <span className="cb-home__status-title">Career Guidance System Active</span>
            <span className="cb-home__status-desc">Real-time skill benchmarking & advice</span>
          </div>
          <CheckCircle2 size={16} className="cb-home__status-icon" aria-hidden="true" />
        </div>

        {/* Search Bar */}
        <div className="cb-home__search-bar">
          <Search size={18} className="cb-home__search-icon" aria-hidden="true" />
          <input
            type="text"
            className="cb-home__search-input"
            placeholder="Search career guides, skills, or courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            aria-label="Search career guides"
          />
          {searchQuery && (
            <button
              type="button"
              className="cb-home__search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="cb-home__body">
        {/* Instant Search Results Dropdown/Card */}
        {searchQuery.trim() && (
          <section className="cb-home__section cb-home__search-results">
            <div className="cb-home__section-head">
              <h3>Search Results ({searchResults.length})</h3>
              <button
                type="button"
                className="cb-home__link-btn"
                onClick={() => onBrowseHelp(searchQuery)}
              >
                View all guides <ArrowRight size={13} />
              </button>
            </div>
            {searchResults.length > 0 ? (
              <ul className="cb-home__article-list">
                {searchResults.map((article) => (
                  <li key={article.id}>
                    <button
                      type="button"
                      className="cb-home__article-card"
                      onClick={() => onSelectArticle(article)}
                    >
                      <div className="cb-home__article-details">
                        <span className="cb-home__article-cat">{article.category}</span>
                        <h4 className="cb-home__article-title">{article.title}</h4>
                      </div>
                      <ChevronRight size={18} className="cb-home__article-chevron" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="cb-home__empty-search">
                <p>No matching career guides found for "{searchQuery}".</p>
                <button
                  type="button"
                  className="cb-home__ask-btn"
                  onClick={() => onAskQuestion(searchQuery)}
                >
                  Ask our AI Career Advisor
                </button>
              </div>
            )}
          </section>
        )}

        {/* ===================================================================
            New Question & Capabilities Card (Requirement 4)
            Explains what the chatbot can do with actual project capabilities
            and provides clickable suggested question options.
           =================================================================== */}
        <section className="cb-home__capabilities-card" aria-labelledby="cb-cap-heading">
          <div className="cb-home__capabilities-header">
            <div className="cb-home__capabilities-icon">
              <HelpCircle size={20} aria-hidden="true" />
            </div>
            <div className="cb-home__capabilities-title-wrap">
              <h3 id="cb-cap-heading" className="cb-home__capabilities-title">
                What can I do with this chatbot?
              </h3>
              <span className="cb-home__capabilities-subtitle">
                Personalized NCCT Career & Skill Guidance
              </span>
            </div>
          </div>

          <p className="cb-home__capabilities-desc">
            NCCT Career AI helps students and professionals navigate their technical journey with data-backed guidance:
          </p>

          <ul className="cb-home__capabilities-list">
            <li>
              <Target size={15} className="cb-home__cap-icon" aria-hidden="true" />
              <span><strong>Skill Benchmarking:</strong> Evaluate where you stand and detect skill gaps for target engineering roles.</span>
            </li>
            <li>
              <Compass size={15} className="cb-home__cap-icon" aria-hidden="true" />
              <span><strong>Career Roadmaps:</strong> Discover career paths matched to your academic branch, skills, and interests.</span>
            </li>
            <li>
              <GraduationCap size={15} className="cb-home__cap-icon" aria-hidden="true" />
              <span><strong>Course & Learning Paths:</strong> Explore recommended courses with structured, milestone-based learning plans.</span>
            </li>
            <li>
              <CheckCircle2 size={15} className="cb-home__cap-icon" aria-hidden="true" />
              <span><strong>Interview & Portfolio Readiness:</strong> Get actionable checklists for resumes, portfolio projects, and interviews.</span>
            </li>
          </ul>

          <div className="cb-home__capabilities-actions">
            <span className="cb-home__actions-label">Click a suggested question to start:</span>
            <div className="cb-home__quick-questions">
              {CAPABILITY_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  className="cb-home__quick-btn"
                  onClick={() => onAskQuestion(q)}
                  title={`Ask: ${q}`}
                >
                  <MessageSquare size={14} className="cb-home__quick-icon" aria-hidden="true" />
                  <span>{q}</span>
                  <ChevronRight size={14} className="cb-home__quick-chevron" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* AI Assistant Entry Point Card (Image 3) */}
        <div className="cb-home__ai-card">
          <div className="cb-home__ai-icon-wrap">
            <Sparkles size={22} aria-hidden="true" />
          </div>
          <div className="cb-home__ai-text">
            <h3>Ask our Career AI Advisor</h3>
            <p>Get personalized career path suggestions, evaluate where you stand, and spot skill gaps.</p>
          </div>
          <button
            type="button"
            className="cb-home__ai-action-btn"
            onClick={() => onAskQuestion()}
          >
            <MessageSquare size={16} aria-hidden="true" />
            <span>Ask about your career</span>
          </button>
        </div>

        {/* Popular Career Questions / Articles Section (Auto-expands on click) */}
        <section className="cb-home__section">
          <div className="cb-home__section-head">
            <h3>Popular Career Questions</h3>
            <button
              type="button"
              className="cb-home__link-btn"
              onClick={() => onBrowseHelp()}
            >
              Browse all <ChevronRight size={14} />
            </button>
          </div>

          <p className="cb-home__section-sub">
            Click any question below to explore the comprehensive guidance article.
          </p>

          <ul className="cb-home__article-list">
            {popularArticles.map((article) => (
              <li key={article.id}>
                <button
                  type="button"
                  className="cb-home__article-card"
                  onClick={() => onSelectArticle(article)}
                >
                  <div className="cb-home__article-details">
                    <span className="cb-home__article-cat">{article.category}</span>
                    <h4 className="cb-home__article-title">{article.title}</h4>
                    <p className="cb-home__article-snippet">{article.subtitle}</p>
                  </div>
                  <ChevronRight size={18} className="cb-home__article-chevron" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
