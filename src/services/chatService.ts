import { ApiResponse } from '@/types/chat';

// Enhanced Arabic responses with more natural conversation flow
const responses = [
  {
    patterns: ['مرحبا', 'السلام', 'اهلا', 'hi', 'hello'],
    responses: [
      'مرحباً! كيف يمكنني مساعدتك اليوم؟',
      'أهلاً وسهلاً! كيف أستطيع خدمتك؟',
      'مرحباً بك! هل لديك أي استفسارات؟'
    ]
  },
  {
    patterns: ['طلب', 'اوردر', 'الطلب', 'order'],
    responses: [
      'يمكنني مساعدتك بخصوص طلبك. هل لديك رقم الطلب؟',
      'بالتأكيد، سأساعدك في متابعة طلبك. هل يمكنك مشاركة رقم الطلب؟',
      'لمتابعة طلبك، أحتاج إلى رقم الطلب من فضلك.'
    ]
  },
  {
    patterns: ['مشكلة', 'مساعدة', 'مشكله', 'help'],
    responses: [
      'آسف لسماع ذلك. هل يمكنك إخباري المزيد عن المشكلة التي تواجهها؟',
      'دعني أساعدك في حل هذه المشكلة. هل يمكنك وصفها بالتفصيل؟',
      'أنا هنا لمساعدتك. ما هي المشكلة التي تواجهها بالضبط؟'
    ]
  },
  {
    patterns: ['شكرا', 'شكراً', 'thanks'],
    responses: [
      'العفو! هل هناك شيء آخر تحتاج إليه؟',
      'سعدت بمساعدتك! هل لديك أي استفسارات أخرى؟',
      'أنا دائماً في خدمتك. هل تحتاج إلى مساعدة أخرى؟'
    ]
  }
];

function getRandomResponse(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)];
}

function findMatchingResponse(message: string): string {
  const defaultResponses = [
    'عذراً، لم أفهم طلبك بشكل واضح. هل يمكنك إعادة صياغة سؤالك؟',
    'هل يمكنك توضيح طلبك بشكل أكثر تفصيلاً؟',
    'عذراً، لم أستطع فهم رسالتك. هل يمكنك شرح ما تحتاجه بطريقة أخرى؟'
  ];

  const lowercaseMessage = message.toLowerCase();
  
  const matchingPattern = responses.find(response =>
    response.patterns.some(pattern => 
      lowercaseMessage.includes(pattern.toLowerCase())
    )
  );

  return matchingPattern 
    ? getRandomResponse(matchingPattern.responses)
    : getRandomResponse(defaultResponses);
}

export const chatService = {
  sendMessage: async (content: string): Promise<ApiResponse> => {
    // Simulate network delay (500-1500ms)
    const delay = Math.random() * 1000 + 500;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    try {
      // 5% chance of error for testing error handling
      if (Math.random() < 0.05) {
        throw new Error('Network error');
      }

      const response = findMatchingResponse(content);
      return { message: response, status: 'success' };
    } catch (error) {
      return { 
        message: 'عذراً، حدث خطأ في النظام. يرجى المحاولة مرة أخرى.',
        status: 'error'
      };
    }
  }
};