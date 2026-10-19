export interface HelpArticleAuthor {
  name: string;
  avatar?: string;
  role: string;
}

export interface HelpArticle {
  id: string;
  title: string;
  subtitle: string;
  category: 'Career Paths' | 'Skill Assessment' | 'Courses & Training' | 'Job Readiness';
  author: HelpArticleAuthor;
  updatedAt: string;
  readTime: string;
  content: string;
  tags?: string[];
  popular?: boolean;
}

export type ChatbotView = 'home' | 'messages' | 'help' | 'article';
