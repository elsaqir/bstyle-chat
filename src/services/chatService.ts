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

      // First check if the response is ok
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      // Get the response text first
      const text = await response.text();
      
      // Check if we have any content
      if (!text.trim()) {
        return {
          message: 'عذراً، لم يتم استلام رد من الخادم.',
          status: 'error'
        };
      }

      // Try to parse the JSON
      try {
        const data = JSON.parse(text);
        return {
          message: data.reply || data.message || 'عذراً، لم أتمكن من فهم الرسالة.',
          status: 'success'
        };
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        return {
          message: 'عذراً، تم استلام رد غير صالح من الخادم.',
          status: 'error'
        };
      }
    } catch (error) {
      console.error('Webhook error:', error);
      return {
        message: 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.',
        status: 'error'
      };
    }
  }
};