import React from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';

interface ChatBubbleProps {
  className?: string;
}

export function ChatBubble({ className }: ChatBubbleProps) {
  const { state, toggleChat } = useChat();

  return (
    <Button
      onClick={toggleChat}
      variant="default"
      size="icon"
      className={cn(
        "fixed bottom-4 left-4 h-14 w-14 rounded-full shadow-lg z-50 chat-bubble-container",
        state.isOpen ? "opacity-0 pointer-events-none" : "chat-bubble-pulse",
        className
      )}
      aria-label={state.isOpen ? "إغلاق المحادثة" : "فتح المحادثة"}
    >
      <MessageSquare className="h-6 w-6" />
    </Button>
  );
}