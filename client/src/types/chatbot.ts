// types/chatbot.ts

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    attachment?: {
      type: 'image' | 'document' | null;
      url: string;
      public_id?: string;
      originalName?: string;
      uploading?: boolean; // Used for optimistic UI updates
    };
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