import { ArrowUp, Mic, Paperclip } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { chatbotConfig } from '../../config/chatbotConfig';
import { useI18n } from '../../i18n';

interface Props { onSend: (text: string) => void; disabled?: boolean }

export function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);
  const { t } = useI18n();
  const max = chatbotConfig.maxMessageLength;

  useEffect(() => {
    if (window.matchMedia('(min-width: 641px)').matches) ref.current?.focus();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    const needed = el.scrollHeight + 2;
    el.style.height = `${Math.min(needed, 120)}px`;
    el.style.overflowY = needed > 120 ? 'auto' : 'hidden';
  }, [value]);

  const submit = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue('');
  };
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); submit(); }
  };

  return (
    <div className="cb-input">
      <label htmlFor="ncct-cb-input" className="cb-sr">{t.inputPlaceholder}</label>
      <button type="button" className="cb-icon-btn cb-input__icon-btn" aria-label="Attach file" title="Attach file">
        <Paperclip size={18} aria-hidden="true" />
      </button>
      <textarea
        id="ncct-cb-input" ref={ref} rows={1} value={value} maxLength={max}
        onChange={(e) => setValue(e.target.value)} onKeyDown={onKeyDown}
        placeholder={t.inputPlaceholder}
      />
      <button type="button" className="cb-icon-btn cb-input__icon-btn" aria-label="Use microphone" title="Use microphone">
        <Mic size={18} aria-hidden="true" />
      </button>
      <button type="button" className="cb-send" onClick={submit} disabled={disabled || !value.trim()} aria-label={t.sendMessage} title={t.sendMessage}>
        <ArrowUp size={18} aria-hidden="true" />
      </button>
      {value.length > max * 0.8 && <span className="cb-count" aria-live="polite">{value.length}/{max}</span>}
    </div>
  );
}
