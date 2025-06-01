import React from 'react';
import { cn } from '@/lib/utils';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useChat } from '@/contexts/ChatContext';

interface ChatWindowProps {
  className?: string;
}

export function ChatWindow({ className }: ChatWindowProps) {
  const { state } = useChat();

  if (!state.isOpen) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 w-full max-w-[400px] h-[600px] bg-card rounded-lg shadow-lg flex flex-col slide-in z-50",
        "border border-border",
        className
      )}
      aria-label="نافذة المحادثة"
    >
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}