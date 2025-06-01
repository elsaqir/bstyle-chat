import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ChatState, ChatContextType, Message } from '@/types/chat';
import { generateId } from '@/lib/utils';
import { chatService } from '@/services/chatService';

// Initial state
const initialState: ChatState = {
  isOpen: false,
  messages: [],
  isLoading: false,
  error: null,
  input: ''
};

// Action types
type Action =
  | { type: 'TOGGLE_CHAT' }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'SEND_MESSAGE_START'; payload: Message }
  | { type: 'SEND_MESSAGE_SUCCESS'; payload: Message }
  | { type: 'SEND_MESSAGE_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

// Reducer
const chatReducer = (state: ChatState, action: Action): ChatState => {
  switch (action.type) {
    case 'TOGGLE_CHAT':
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case 'SET_INPUT':
      return {
        ...state,
        input: action.payload
      };
    case 'SEND_MESSAGE_START':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        isLoading: true,
        input: ''
      };
    case 'SEND_MESSAGE_SUCCESS':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        isLoading: false
      };
    case 'SEND_MESSAGE_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Create context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const toggleChat = () => {
    dispatch({ type: 'TOGGLE_CHAT' });
  };

  const setInput = (input: string) => {
    dispatch({ type: 'SET_INPUT', payload: input });
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    dispatch({ type: 'SEND_MESSAGE_START', payload: userMessage });

    try {
      const response = await chatService.sendMessage(content);
      
      if (response.status === 'error') {
        dispatch({ type: 'SEND_MESSAGE_ERROR', payload: response.message });
        return;
      }

      const agentMessage: Message = {
        id: generateId(),
        content: response.message,
        sender: 'agent',
        timestamp: new Date(),
        status: 'sent'
      };

      dispatch({ type: 'SEND_MESSAGE_SUCCESS', payload: agentMessage });
    } catch (error) {
      dispatch({ 
        type: 'SEND_MESSAGE_ERROR', 
        payload: 'حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.' 
      });
    }
  };

  const retryLastMessage = async () => {
    const lastUserMessage = [...state.messages]
      .reverse()
      .find(message => message.sender === 'user');
    
    if (lastUserMessage) {
      dispatch({ type: 'CLEAR_ERROR' });
      await sendMessage(lastUserMessage.content);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        state,
        toggleChat,
        sendMessage,
        setInput,
        retryLastMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Hook to use the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};