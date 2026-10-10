import { AlertCircle, RefreshCw } from 'lucide-react';
import { useI18n } from '../../i18n';
import type { ChatErrorCode } from '../../types/chatbot';

const ERROR_KEYS: Record<ChatErrorCode, keyof import('../../i18n/types').Translations> = {
  network: 'errorNetwork',
  timeout: 'errorTimeout',
  auth: 'errorAuth',
  empty: 'errorEmpty',
  server: 'errorServer',
  disconnected: 'errorDisconnected',
};

export function ChatErrorState({ code, onRetry }: { code: ChatErrorCode; onRetry?: () => void }) {
  const { t } = useI18n();
  return (
    <div className="cb-error" role="alert">
      <AlertCircle size={16} aria-hidden="true" />
      <p>{t[ERROR_KEYS[code]]}</p>
      {onRetry && code !== 'auth' && (
        <button type="button" className="cb-btn cb-btn--ghost" onClick={onRetry}>
          <RefreshCw size={14} aria-hidden="true" /> {t.retry}
        </button>
      )}
    </div>
  );
}
