// store/Chatbot.ts
import { create } from 'zustand';
import { ChatMessage, ChatSession } from '@/types/chatbot';
import { chatApi } from '@/components/umeed/apiService';

interface ChatStore {
  // State
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  isLoading: boolean;
  error: string | null;
  
  
  // Actions
  fetchSessions: () => Promise<void>;
  fetchSession: (sessionId: string) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  startNewChat: () => void;
  deleteSession: (sessionId: string) => Promise<void>;
  updateSessionTitle: (sessionId: string, title: string) => Promise<void>;
  clearAllSessions: () => Promise<void>;
  uploadImage: (imageFile: File, message?: string) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  // Initial state
  sessions: [],
  currentSession: null,
  isLoading: false,
  error: null,
  
  // Actions
  fetchSessions: async () => {
    set({ isLoading: true, error: null });
    try {
      const sessions = await chatApi.getSessions();
      set({ sessions, isLoading: false });
    } catch (error) {
      console.error('Error fetching sessions:', error);
      set({ error: 'Failed to fetch sessions', isLoading: false });
    }
  },
  
  fetchSession: async (sessionId: string) => {
    set({ isLoading: true, error: null });
    try {
      const session = await chatApi.getSession(sessionId);
      set({ currentSession: session, isLoading: false });
    } catch (error) {
      console.error('Error fetching session:', error);
      set({ error: 'Failed to fetch session', isLoading: false });
    }
  },
  
  sendMessage: async (message: string) => {
    const currentSession = get().currentSession;
    set({ isLoading: true, error: null });
    
    try {
      // Optimistically update the UI
      if (currentSession) {
        set({
          currentSession: {
            ...currentSession,
            messages: [
              ...currentSession.messages,
              { role: 'user', content: message } as ChatMessage
            ]
          }
        });
      }
      
      // Send the message to the API
      const response = await chatApi.sendMessage(message, currentSession?._id);
      
      // Update with the response
      set({
        currentSession: {
          _id: response.sessionId,
          title: currentSession?.title || response.sessionId,
          messages: response.context,
          updatedAt: new Date().toISOString(),
          createdAt: currentSession?.createdAt || new Date().toISOString()
        },
        isLoading: false
      });
      
      // Refresh the sessions list to get the updated session
      get().fetchSessions();
    } catch (error) {
      console.error('Error sending message:', error);
      set({ error: 'Failed to send message', isLoading: false });
    }
  },
  
  startNewChat: () => {
    set({ currentSession: null });
  },
  
  deleteSession: async (sessionId: string) => {
    set({ isLoading: true, error: null });
    try {
      await chatApi.deleteSession(sessionId);
      
      // Update local state
      const { sessions, currentSession } = get();
      const updatedSessions = sessions.filter(session => session._id !== sessionId);
      
      set({ 
        sessions: updatedSessions,
        currentSession: currentSession?._id === sessionId ? null : currentSession,
        isLoading: false
      });
    } catch (error) {
      console.error('Error deleting session:', error);
      set({ error: 'Failed to delete session', isLoading: false });
    }
  },
  
  updateSessionTitle: async (sessionId: string, title: string) => {
    set({ isLoading: true, error: null });
    try {
      await chatApi.updateSessionTitle(sessionId, title);
      
      // Update local state
      const { sessions, currentSession } = get();
      const updatedSessions = sessions.map(session => 
        session._id === sessionId ? { ...session, title } : session
      );
      
      set({ 
        sessions: updatedSessions,
        currentSession: currentSession?._id === sessionId ? { ...currentSession, title } : currentSession,
        isLoading: false
      });
    } catch (error) {
      console.error('Error updating session title:', error);
      set({ error: 'Failed to update session title', isLoading: false });
    }
  },
  
  clearAllSessions: async () => {
    set({ isLoading: true, error: null });
    try {
      await chatApi.clearAllSessions();
      set({ sessions: [], currentSession: null, isLoading: false });
    } catch (error) {
      console.error('Error clearing sessions:', error);
      set({ error: 'Failed to clear sessions', isLoading: false });
    }
  },

  

// Then add this implementation in the create function
  uploadImage: async (imageFile: File, message?: string) => {
  const currentSession = get().currentSession;
  set({ isLoading: true, error: null });
  
  try {
    const messageContent = message?.trim() 
    ? message 
    : "I've uploaded a medical document. Can you analyze it and explain what it says in simple terms?";
    // Optimistically update UI to show uploading state
    if (currentSession) {
      set({
        currentSession: {
          ...currentSession,
          messages: [
            ...currentSession.messages,
            { 
              role: 'user', 
              content: messageContent,
              attachment: { 
                type: 'image',
                url: URL.createObjectURL(imageFile),
                uploading: true 
              }
            } as ChatMessage
          ]
        }
      });
    }
    
    // Upload the image
    const response = await chatApi.uploadMedicalImage(imageFile, currentSession?._id, message);
    
    // Update with the response including the image
    set({
      currentSession: {
        _id: response.sessionId,
        title: currentSession?.title || response.sessionId,
        messages: response.context,
        updatedAt: new Date().toISOString(),
        createdAt: currentSession?.createdAt || new Date().toISOString()
      },
      isLoading: false
    });
    
    // Refresh the sessions list
    get().fetchSessions();
  } catch (error) {
    console.error('Error uploading image:', error);
    set({ 
      error: 'Failed to upload image. Please try again or use a different file.',
      isLoading: false 
    });
    
    // Remove the optimistic update if it failed
    if (currentSession) {
      set({
        currentSession: {
          ...currentSession,
          messages: currentSession.messages.filter(msg => !msg.attachment?.uploading)
        }
      });
    }
  }
},
}));