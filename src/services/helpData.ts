import type { HelpArticle } from '../types/help';

export const HELP_ARTICLES: HelpArticle[] = [
  {
    id: 'where-do-i-stand',
    title: 'Based on my skills, where do I stand?',
    subtitle: 'How to evaluate your current skill profile against industry standards and benchmark roles.',
    category: 'Skill Assessment',
    popular: true,
    author: {
      name: 'NCCT Career Advisory Board',
      role: 'Career Assessment Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
    updatedAt: 'Updated 2 days ago',
    readTime: '4 min read',
    tags: ['skills', 'assessment', 'benchmark', 'stand', 'profile', 'evaluation'],
    content: `## Assessing Your Career Standing

Understanding where your current capabilities match up with real-world job requirements is the foundational first step of career planning.

> **Key takeaway:** NCCT Career AI compares your verified educational background and technical skills against real job descriptions to identify exact match percentages and skill gaps.

---

### How Your Profile is Evaluated

When you ask the Career Assistant *"Based on my skills, where do I stand?"*, the system evaluates three core dimensions:

1. **Core Competencies (Match):** Skills you already possess that directly align with candidate requirements for target job roles (e.g., JavaScript, React, Python).
2. **Partial Strengths (Needs Strengthening):** Concepts you have foundational exposure to, but need practical project experience or testing depth to meet professional standards.
3. **Skill Gaps (Missing):** Critical industry tools, architectures, or methodologies currently absent from your profile that recruiters expect (e.g., SQL, Docker, Automated Testing).

---

### Understanding Match Percentage

* **80% – 100% Match:** You are interview-ready for junior to mid-level openings in this target role. Focus on portfolio polish and interview practice.
* **60% – 79% Match:** Strong base. Adding 1 or 2 targeted courses or hands-on projects will bridge the gap rapidly within 4–6 weeks.
* **Below 60% Match:** Consider following our curated foundational learning path to build core prerequisites systematically.

---

### Recommended Next Steps

* Type **"Based on my skills, where do I stand?"** into the Career AI chat for an immediate role-by-role comparison.
* Review recommended courses to bridge any identified missing skills.
* Schedule a mock assessment or explore transition paths to adjacent domains.`,
  },
  {
    id: 'choose-career-path',
    title: 'How do I choose the best career path for my profile?',
    subtitle: 'A step-by-step guide to discovering high-growth career tracks aligned with your strengths.',
    category: 'Career Paths',
    popular: true,
    author: {
      name: 'Dr. Rajesh Verma',
      role: 'Senior Academic & Career Mentor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    updatedAt: 'Updated 1 week ago',
    readTime: '5 min read',
    tags: ['career path', 'planning', 'guidance', 'decision', 'roles', 'roadmap'],
    content: `## Choosing the Right Career Direction

Navigating modern career paths requires balancing your genuine interests, current strengths, and long-term industry hiring demands.

---

### 1. Identify Your Aptitude & Interests
Start by categorizing the type of problem solving that motivates you:
* **Product & User Facing:** Frontend Development, Mobile Apps, UI/UX Design.
* **Systems, Logic & Architecture:** Backend Engineering, Cloud Infrastructure, DevOps.
* **Data & Machine Intelligence:** Data Science, Machine Learning, AI Engineering.
* **Business & Strategy:** Product Management, Technical Consulting, Business Analytics.

---

### 2. Analyze Growth Trends & Market Demand
Evaluate roles based on 3-to-5 year demand projections. Technology roles in **Full-Stack Development**, **Cloud Solutions**, and **Applied AI** continue to offer the highest entry-level hiring velocity.

---

### 3. Build a Progressive Skill Pathway
Rather than trying to learn everything at once:
1. Master one primary programming language thoroughly.
2. Build 2 complete, deployed projects that solve realistic problems.
3. Integrate version control, database querying, and API design.

---

### Chat with Career AI for Personalized Advice
Ask our assistant: *"Suggest a career path for me based on my background"* to see tailored career trajectories tailored to your educational stream.`,
  },
  {
    id: 'in-demand-skills',
    title: 'Which in-demand skills should I learn this year?',
    subtitle: 'Analysis of trending technical and professional skills required by top employers.',
    category: 'Skill Assessment',
    popular: true,
    author: {
      name: 'Priya Sundaram',
      role: 'Industry Talent Advisor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    },
    updatedAt: 'Updated 3 days ago',
    readTime: '4 min read',
    tags: ['in demand', 'skills', 'trending', 'technology', 'learn', 'hiring'],
    content: `## In-Demand Skills Overview

Employers increasingly look for 'T-shaped' professionals: deep competency in one core technical stack, combined with broad knowledge of modern engineering tooling.

---

### Top Technical Skills by Domain

* **Full-Stack & Web:** TypeScript, React/Next.js, Node.js, RESTful & GraphQL API Architecture.
* **Databases & Data Storage:** PostgreSQL, MongoDB, Prisma ORM, Redis caching.
* **Cloud & Deployment:** Docker containerization, AWS/GCP essentials, CI/CD pipelines.
* **Artificial Intelligence:** Prompt Engineering, Retrieval-Augmented Generation (RAG), Python, LangChain.

---

### Essential Soft Skills Employers Value

1. **Structured Problem Solving:** Ability to decompose complex business problems into manageable code modules.
2. **Technical Communication:** Articulating architectural choices clearly to both technical and non-technical stakeholders.
3. **Continuous Learning Mindset:** Adapting rapidly as frameworks and AI toolsets evolve.

---

### How to Prioritize
Ask Career AI: *"Which skills should I improve first?"* to receive a prioritized checklist customized for your target position.`,
  },
  {
    id: 'learning-paths-courses',
    title: 'How do personalized learning paths and courses work?',
    subtitle: 'Maximize your progress with structured weekly milestones and curated courses.',
    category: 'Courses & Training',
    popular: true,
    author: {
      name: 'NCCT Learning Team',
      role: 'Curriculum Director',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    },
    updatedAt: 'Updated 5 days ago',
    readTime: '3 min read',
    tags: ['courses', 'learning path', 'training', 'certifications', 'curriculum'],
    content: `## Structured Learning Paths

Learning without a structured roadmap often leads to tutorial fatigue. NCCT Career Guidance organizes course recommendations into progressive, milestone-based learning paths.

---

### What a Learning Path Contains

* **Phase 1: Foundational Core (Weeks 1–2):** Syntax mastery, modern conventions, and setting up professional developer tooling.
* **Phase 2: Applied Architecture (Weeks 3–6):** Building full-featured applications incorporating authentication, state management, and databases.
* **Phase 3: Production & Testing (Weeks 7–9):** Automated testing, performance optimization, and containerized deployment.

---

### Earning Certifications
All completed NCCT-partnered courses provide verifiable completion credentials that can be linked directly to your LinkedIn and resume.

---

### Start Your Path Today
Tell our AI assistant: *"Recommend courses for my career"* to generate an immediate course progression for your desired role.`,
  },
  {
    id: 'resume-portfolio-readiness',
    title: 'Preparing your resume, portfolio, and interview readiness',
    subtitle: 'Essential checklist for crafting job-ready resumes and standing out to recruiters.',
    category: 'Job Readiness',
    popular: false,
    author: {
      name: 'Priya Sundaram',
      role: 'Industry Talent Advisor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    },
    updatedAt: 'Updated 1 week ago',
    readTime: '6 min read',
    tags: ['resume', 'portfolio', 'interview', 'job readiness', 'preparation'],
    content: `## Job Readiness Checklist

A strong technical foundation must be matched with clear presentation to pass recruiter screenings and technical hiring rounds.

---

### Resume Best Practices
* **Action-Oriented Impact:** Use the Google X-Y-Z formula: *"Accomplished [X], as measured by [Y], by doing [Z]"*.
* **Relevant Skill Keywords:** Ensure programming languages and tools match target job descriptions to pass Applicant Tracking Systems (ATS).
* **One Page Limit:** Keep formatting clean, scannable, and focused on your strongest achievements.

---

### Project Portfolio Tips
* Host **live deployed demos** alongside clean, well-documented GitHub repositories.
* Include a descriptive \`README.md\` with architecture diagrams, setup instructions, and problem statements.
* Demonstrate realistic features: user authentication, error handling, and database persistence.

---

### Technical Interview Preparation
Practice algorithmic thinking and data structure fundamentals, followed by system design concepts for your domain.`,
  },
  {
    id: 'transitioning-ai-fullstack',
    title: 'Transitioning into Full-Stack or AI Engineering roles',
    subtitle: 'Actionable roadmap for students and career switchers looking to break into AI and software.',
    category: 'Career Paths',
    popular: false,
    author: {
      name: 'Dr. Rajesh Verma',
      role: 'Senior Academic & Career Mentor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    updatedAt: 'Updated 2 weeks ago',
    readTime: '5 min read',
    tags: ['transition', 'ai engineering', 'full stack', 'career change', 'roadmap'],
    content: `## Breaking into High-Growth Engineering Roles

Whether transitioning from academic studies, traditional IT, or another engineering discipline, breaking into Full-Stack or AI development is achievable with deliberate practice.

---

### 1. Bridge the Foundational Gap
Focus on mastery over breadth. Ensure comfort with asynchronous programming, modular architecture, and modern source control before tackling complex AI pipelines.

---

### 2. Learn by Building Real Products
Don't get stuck only watching tutorials:
* Build an end-to-end full stack web app with user accounts.
* Integrate an LLM or embedding model via API to solve a domain-specific use case.
* Deploy your service with continuous integration to Cloud Run, Vercel, or AWS.

---

### 3. Seek Mentorship & Code Reviews
Engage in open source contributions, peer code reviews, and community hackathons to gain feedback on code quality and engineering discipline.`,
  },
];

export const HELP_CATEGORIES = [
  'All',
  'Career Paths',
  'Skill Assessment',
  'Courses & Training',
  'Job Readiness',
] as const;

export function getHelpArticles(): HelpArticle[] {
  return HELP_ARTICLES;
}

export function getPopularArticles(): HelpArticle[] {
  return HELP_ARTICLES.filter((a) => a.popular);
}

export function getArticleById(id: string): HelpArticle | undefined {
  return HELP_ARTICLES.find((a) => a.id === id);
}

export function searchHelpArticles(query: string, category: string = 'All'): HelpArticle[] {
  const q = query.trim().toLowerCase();
  return HELP_ARTICLES.filter((article) => {
    const matchesCategory = category === 'All' || article.category === category;
    if (!matchesCategory) return false;
    if (!q) return true;
    return (
      article.title.toLowerCase().includes(q) ||
      article.subtitle.toLowerCase().includes(q) ||
      article.content.toLowerCase().includes(q) ||
      (article.tags && article.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });
}
