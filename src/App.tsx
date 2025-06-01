import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Chat } from '@/components/Chat';
import { ChatProvider } from '@/contexts/ChatContext';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8 text-center">
          واجهة المحادثة العربية
        </h1>
        <ChatProvider>
          <Chat />
        </ChatProvider>
        <div className="fixed bottom-4 right-4 text-sm text-muted-foreground">
          انقر على أيقونة المحادثة في الزاوية اليسرى السفلية للبدء
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;