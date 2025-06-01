import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { useChat } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatMessagesProps {
  className?: string;
}

export function ChatMessages({ className }: ChatMessagesProps) {
  const { state, retryLastMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  return (
    <ScrollArea 
      className={cn("flex-1 p-4 overflow-y-auto", className)} 
      dir="rtl"
    >
      {state.messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p>ابدأ محادثة جديدة...</p>
        </div>
      ) : (
        <>
          {state.messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              onRetry={retryLastMessage}
            />
          ))}
        </>
      )}
      
      {state.isLoading && (
        <div className="flex justify-end mb-2">
          <div className="bg-agent-message text-foreground rounded-lg px-4 py-3 message-fade-in rounded-br-none">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      {state.error && (
        <div className="bg-destructive/10 text-destructive p-2 rounded mb-2 text-sm">
          <p>{state.error}</p>
          <button 
            onClick={retryLastMessage}
            className="text-primary hover:underline text-xs mt-1"
          >
            إعادة المحاولة
          </button>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </ScrollArea>
  );
}