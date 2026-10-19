import { ChatbotWidget } from './components/chatbot';
import { HelpCircle, Shield, BookOpen, MessageSquare, Zap, Sparkles } from 'lucide-react';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Portal Header / Navigation Bar */}
      <header style={{
        background: '#072227',
        color: '#ffffff',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        fontSize: '13px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Shield size={18} color="#10b981" />
          <span style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.2px' }}>NCCT Career Portal</span>
          <span style={{ color: '#94a3b8' }}>• AI Career Guidance & Counselling</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#10b981',
            padding: '4px 10px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600
          }}>
            <Sparkles size={12} /> AI Advisor Active
          </span>
        </div>
      </header>

      {/* Main hero page */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#ecfdf5',
            color: '#059669',
            padding: '4px 12px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 12
          }}>
            <HelpCircle size={14} /> 24/7 AI-Powered Career Counselling
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0b2f37', margin: '0 0 12px' }}>
            Empower Your Career Journey with AI Guidance
          </h1>
          <p style={{ fontSize: '16px', color: '#64748b', maxWidth: 640, margin: '0 auto' }}>
            Explore personalized career roadmaps, assess your skill readiness, discover in-demand courses, or click the career assistant in the bottom-right corner for interactive guidance.
          </p>
        </div>

        {/* Feature showcase cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 48 }}>
          <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#e6f4f6', color: '#0f3f49', display: 'grid', placeItems: 'center', marginBottom: 16 }}>
              <BookOpen size={20} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Career Roadmaps</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
              Comprehensive guides covering skill assessments, transition roadmaps, portfolio building, and industry requirements.
            </p>
          </div>

          <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#ecfdf5', color: '#059669', display: 'grid', placeItems: 'center', marginBottom: 16 }}>
              <Zap size={20} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Auto-Resizing Chatbot</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
              Click any career question on the chatbot homepage to smoothly expand the widget into an interactive full article or conversation view.
            </p>
          </div>

          <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f1f5f9', color: '#0f766e', display: 'grid', placeItems: 'center', marginBottom: 16 }}>
              <MessageSquare size={20} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: '#0f172a' }}>AI Career Counselling</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
              Seamlessly switch between Home, Messages, and Help tabs with real-time career advice and multilingual support.
            </p>
          </div>
        </div>
      </main>

      {/* The Chatbot Widget (opens cleanly without unwanted popups) */}
      <ChatbotWidget />
    </div>
  );
}