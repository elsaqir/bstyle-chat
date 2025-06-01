export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
}

export interface ChatState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  input: string;
}

export interface ChatContextType {
  state: ChatState;
  toggleChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  setInput: (input: string) => void;
  retryLastMessage: () => Promise<void>;
}

export interface ApiResponse {
  message: string;
  status: 'success' | 'error';
}