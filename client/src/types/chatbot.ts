// types/chatbot.ts

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: Date;
  }
  
  export interface ChatSession {
    _id: string;
    title: string;
    messages: ChatMessage[];
    updatedAt: string;
    createdAt: string;
  }
  
  export interface User {
    _id: string;
    info?: {
      bloodGroup?: string;
      height?: number;
      weight?: number;
    };
  }