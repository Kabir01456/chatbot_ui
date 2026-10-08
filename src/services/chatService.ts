import { chatbotConfig } from '../config/chatbotConfig';
import type {
  ChatReply, ChatTransport, ConversationDetail, ConversationSummary, SendMessageRequest,
} from '../types/chatbot';
import { httpJson } from './http';
import { mockTransport, restTransport } from './chatTransport';

/**
 * INTEGRATION POINT (transport): pick the transport here.
 * For Socket.IO, replace the 'socket' branch with createSocketTransport(io(...)) (see chatTransport.ts).
 */
function createTransport(): ChatTransport {
  switch (chatbotConfig.transport) {
    case 'rest': return restTransport;
    case 'socket': return restTransport; // TODO: createSocketTransport(io(chatbotConfig.socketUrl, { withCredentials: true }))
    default: return mockTransport;
  }
}

let transport = createTransport();
const isMock = () => chatbotConfig.transport === 'mock';
const api = (p: string) => `${chatbotConfig.apiBaseUrl}${p}`;

export const chatService = {
  /** The backend identifies the user from the session; only message + conversationId are sent. */
  sendMessage: (req: SendMessageRequest): Promise<ChatReply> => transport.sendMessage(req),
  subscribe: (handler: (reply: ChatReply) => void) => transport.subscribeToMessage(handler),
  disconnect: () => transport.disconnect(),
  /** Test/host hook: swap the transport at runtime. */
  useTransport(next: ChatTransport) { transport = next; },

  async listConversations(): Promise<ConversationSummary[]> {
    if (isMock()) return [];
    return httpJson(api(chatbotConfig.endpoints.conversations));
  },
  async loadConversation(id: string): Promise<ConversationDetail> {
    if (isMock()) return { conversationId: id, messages: [] };
    return httpJson(api(chatbotConfig.endpoints.conversation(id)));
  },
};
