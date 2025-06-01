import React, { KeyboardEvent } from 'react';
import { Send, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  className?: string;
}

export function ChatInput({ className }: ChatInputProps) {
  const { state, sendMessage, setInput } = useChat();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.input.trim()) {
      await sendMessage(state.input);
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "border-t p-4 bg-card rounded-b-lg",
        className
      )}
      dir="rtl"
    >
      <div className="flex items-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full h-10 w-10 flex-shrink-0 hover:bg-muted"
          aria-label="تسجيل صوتي"
        >
          <Mic className="h-5 w-5" />
        </Button>

        <Textarea
          ref={textareaRef}
          value={state.input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب رسالتك..."
          className="min-h-10 resize-none rounded-xl bg-muted"
          rows={1}
          aria-label="مربع إدخال الرسالة"
          dir="rtl"
        />

        <Button 
          type="submit"
          variant="primary"
          className="rounded-full h-10 w-10 p-0 flex-shrink-0"
          disabled={!state.input.trim() || state.isLoading}
          aria-label="إرسال"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}