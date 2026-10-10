import { GraduationCap } from 'lucide-react';
import { useI18n } from '../../i18n';
import type { UserProfile } from '../../types/user';
import { getFirstName } from '../../utils/chatbotUtils';
import { AssistantAvatar } from './ChatMessage';
import { QuickSuggestions } from './QuickSuggestions';
import { RichText } from './RichText';

export function EmptyChatState({ profile, onSelect }: { profile: UserProfile | null; onSelect: (text: string) => void }) {
  const { t } = useI18n();
  const name = getFirstName(profile);
  const greeting = name
    ? t.greetingWithName.replace('{name}', name)
    : t.greetingDefault;
  
  const suggestions = [
    t.suggestion1, t.suggestion2, t.suggestion3, t.suggestion4, t.suggestion5,
  ];

  return (
    <div className="cb-empty">
      <span className="cb-empty__icon" aria-hidden="true"><GraduationCap size={26} /></span>
      <h3>{t.welcomeTitle}</h3>
      <p>{t.welcomeSubtitle}</p>
      <div className="cb-msg cb-msg--ai cb-empty__greeting">
        <AssistantAvatar />
        <div className="cb-bubble"><RichText text={greeting} /></div>
      </div>
      <QuickSuggestions suggestions={suggestions} onSelect={onSelect} />
    </div>
  );
}
