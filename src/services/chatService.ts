import { ApiResponse } from '@/types/chat';

const WEBHOOK_URL = 'https://ribtrnwb.rpcld.net/webhook/bstyle';

export const chatService = {
  sendMessage: async (content: string): Promise<ApiResponse> => {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      return { 
        message: data.reply || data.message || 'عذراً، لم أتمكن من فهم الرسالة.',
        status: 'success' 
      };
    } catch (error) {
      console.error('Webhook error:', error);
      return { 
        message: 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.',
        status: 'error'
      };
    }
  }
};