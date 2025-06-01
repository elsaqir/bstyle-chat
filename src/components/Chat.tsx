import React from 'react';
import { RtlProvider } from '@/components/ui/rtl-provider';
import { ChatBubble } from './chat/ChatBubble';
import { ChatWindow } from './chat/ChatWindow';
import { Toaster } from '@/components/ui/toaster';

export function Chat() {
  return (
    <RtlProvider>
      <div className="chat-container">
        <ChatBubble />
        <ChatWindow />
        <Toaster />
      </div>
    </RtlProvider>
  );
}