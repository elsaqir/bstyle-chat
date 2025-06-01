import React from 'react';
import { X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useChat } from '@/contexts/ChatContext';

interface ChatHeaderProps {
  className?: string;
}

export function ChatHeader({ className }: ChatHeaderProps) {
  const { toggleChat } = useChat();

  return (
    <div 
      className={cn(
        "flex items-center justify-between p-4 bg-primary text-primary-foreground rounded-t-lg border-b border-primary/10",
        className
      )}
      dir="rtl"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-3 w-3 rounded-full bg-green-400" />
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">بي ستايل بوت</h3>
          <p className="text-xs opacity-90">متصل دائماً</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-primary-foreground hover:bg-primary/90"
          aria-label="اتصال"
        >
          <Phone className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-primary-foreground hover:bg-primary/90"
          onClick={toggleChat}
          aria-label="إغلاق"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}