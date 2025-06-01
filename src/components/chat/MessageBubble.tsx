import React from 'react';
import { cn, formatTime } from '@/lib/utils';
import { Message } from '@/types/chat';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  onRetry?: () => void;
}

export function MessageBubble({ message, onRetry }: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  const isError = message.status === 'error';
  const isDelivered = message.status === 'delivered' || message.status === 'read';
  
  return (
    <div
      className={cn(
        "flex mb-4",
        isUser ? "justify-start" : "justify-end"
      )}
      dir="rtl"
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 relative group",
          isUser
            ? "bg-primary text-primary-foreground mr-auto rounded-bl-none"
            : "bg-muted text-foreground ml-auto rounded-br-none"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
        
        <div className="flex items-center justify-end gap-1 mt-1">
          {isError && (
            <button
              onClick={onRetry}
              className="flex items-center text-destructive hover:underline gap-1 text-xs"
            >
              <AlertTriangle className="h-3 w-3" />
              <span>فشل الإرسال - إعادة المحاولة</span>
            </button>
          )}
          {isDelivered && !isUser && (
            <CheckCircle2 className="h-3 w-3 text-primary" />
          )}
          <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    </div>
  );
}