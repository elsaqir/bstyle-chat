import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Chat } from '@/components/Chat';
import { ChatProvider } from '@/contexts/ChatContext';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ChatProvider>
        <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold mb-8 text-center">
            واجهة المحادثة العربية
          </h1>
          <div className="fixed bottom-4 right-4 text-sm text-muted-foreground">
            انقر على أيقونة المحادثة في الزاوية اليسرى السفلية للبدء
          </div>
          <Chat />
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;