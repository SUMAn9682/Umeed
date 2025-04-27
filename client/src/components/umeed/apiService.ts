// components/umeed/apiService.ts
import { api } from "@/helpers/api";
import { ChatSession } from "@/types/chatbot";

export const chatApi = {
    // Send a message to the chatbot
    sendMessage: async (message: string, sessionId?: string) => {
      const response = await api.post('/chat/chat', { message, sessionId });
      return response.data;
    },
  
    // Get all chat sessions
    getSessions: async () => {
      const response = await api.get('/chat/sessions');
      return response.data.sessions as ChatSession[];
    },
  
    // Get a specific chat session
    getSession: async (sessionId: string) => {
      const response = await api.get(`/chat/sessions/${sessionId}`);
      return response.data.session as ChatSession;
    },
  
    // Delete a chat session
    deleteSession: async (sessionId: string) => {
      const response = await api.delete(`/chat/sessions/${sessionId}`);
      return response.data;
    },
  
    // Update a chat session title
    updateSessionTitle: async (sessionId: string, title: string) => {
      const response = await api.patch(`/chat/sessions/${sessionId}/title`, { title });
      return response.data.session as ChatSession;
    },
  
    // Clear all chat sessions
    clearAllSessions: async () => {
      const response = await api.delete('/chat/sessions');
      return response.data;
    },

    // Upload medical image
    uploadMedicalImage: async (imageFile: File, sessionId?: string, message?: string) => {
      const formData = new FormData();
      formData.append('medicalImage', imageFile);
      
      if (sessionId) {
        formData.append('sessionId', sessionId);
      }
      
      if (message?.trim()) {
        formData.append('message', message);
      }
      
      const response = await api.post('/chat/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    },
  };