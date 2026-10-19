import { useState, useMemo } from 'react';
import { Search, ChevronRight, Sparkles, CheckCircle2, MessageSquare, HelpCircle, Target, Compass, GraduationCap } from 'lucide-react';
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
      {/* Dark teal / deep navy hero banner (Matches 2.mp4) */}
      <div className="cb-home__hero">
        <div className="cb-home__greeting-wrap">
          <span className="cb-home__badge">
            <Sparkles size={13} aria-hidden="true" />
            AI Career Advisor
          </span>
          <h2 className="cb-home__greeting">
            {firstName ? `Hello ${firstName}!` : 'Hello!'}
            <br />
            <span>How can we help?</span>
          </h2>
        </div>
      </div>

      {/* Main Cards Area (Arranged like 2.mp4 reference) */}
      <div className="cb-home__body">
        {/* ===================================================================
            Card 1: Recent Message / AI Conversation Entry Card
            (Resolves the squished text issue from user screenshot with spacious,
             full-width readable text and click-to-open conversation)
           =================================================================== */}
        <div
          className="cb-home__recent-card"
          onClick={() => onAskQuestion()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onAskQuestion();
            }
          }}
          aria-label="Recent message from Career AI Advisor"
        >
          <div className="cb-home__recent-header">
            <span className="cb-home__recent-label">Recent message</span>
            <span className="cb-home__recent-time">Just now</span>
          </div>

          <div className="cb-home__recent-row">
            <div className="cb-home__recent-avatar">
              <Sparkles size={18} aria-hidden="true" />
              <span className="cb-home__recent-dot" title="Online" />
            </div>
            <div className="cb-home__recent-content">
              <div className="cb-home__recent-meta">
                <h4 className="cb-home__recent-name">Career AI Advisor</h4>
                <span className="cb-home__recent-tag">AI Agent</span>
              </div>
              <p className="cb-home__recent-text">
                Get personalized career path suggestions, evaluate where you stand, and spot skill gaps.
              </p>
            </div>
            <ChevronRight size={18} className="cb-home__recent-chevron" aria-hidden="true" />
          </div>
        </div>

        {/* ===================================================================
            Card 2: System Status Card (Matches Card 2 in 2.mp4)
           =================================================================== */}
        <div className="cb-home__status-card">
          <div className="cb-home__status-icon-wrap">
            <CheckCircle2 size={18} className="cb-home__status-icon" aria-hidden="true" />
          </div>
          <div className="cb-home__status-info">
            <span className="cb-home__status-title">Status: All Systems Operational</span>
            <span className="cb-home__status-desc">Career guidance & skill benchmarking active</span>
          </div>
        </div>

        {/* ===================================================================
            Card 3: Search for Help & Questions List (Matches Card 3 in 2.mp4)
           =================================================================== */}
        <div className="cb-home__search-card">
          <div className="cb-home__search-header">
            <input
              type="text"
              className="cb-home__search-input"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              aria-label="Search career guides"
            />
            <Search size={18} className="cb-home__search-icon" aria-hidden="true" />
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

          <div className="cb-home__search-divider" />

          {/* Question rows with green chevrons */}
          <ul className="cb-home__questions-list">
            {(searchQuery.trim() ? searchResults : popularArticles.slice(0, 3)).map((article) => (
              <li key={article.id}>
                <button
                  type="button"
                  className="cb-home__question-item"
                  onClick={() => onSelectArticle(article)}
                >
                  <span className="cb-home__question-title">{article.title}</span>
                  <ChevronRight size={16} className="cb-home__question-chevron" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          {!searchQuery.trim() && (
            <button
              type="button"
              className="cb-home__see-all-btn"
              onClick={() => onBrowseHelp()}
            >
              <span>See all career guides</span>
              <ChevronRight size={14} />
            </button>
          )}
        </div>

        {/* ===================================================================
            Card 4: Capabilities Card ("What can I do with this chatbot?")
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
      </div>
    </div>
  );
}
