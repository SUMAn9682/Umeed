// src/store/Notification.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  _id: string;
  userId: string;
  type: 'blood_request' | 'other';
  message: string;
  redirectUrl: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  socketConnected: boolean;
  
  // Actions
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
  deleteAllNotifications: () => void;
  setSocketConnected: (isConnected: boolean) => void;
  
  // Helper getters
  getUnreadNotifications: () => Notification[];
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      socketConnected: false,
      
      setNotifications: (notifications) => 
        set({ 
          notifications, 
          unreadCount: notifications.filter(n => !n.isRead).length 
        }),
        
      addNotification: (notification) => 
        set((state) => {
          const existingIndex = state.notifications.findIndex(n => n._id === notification._id);
          
          // If notification already exists, don't add it again
          if (existingIndex !== -1) {
            return state;
          }
          
          const newNotifications = [notification, ...state.notifications];
          const unreadCount = newNotifications.filter(n => !n.isRead).length;
          
          return { 
            notifications: newNotifications,
            unreadCount
          };
        }),
        
      markAsRead: (notificationId) => 
        set((state) => {
          const newNotifications = state.notifications.map(n => 
            n._id === notificationId ? { ...n, isRead: true } : n
          );
          
          return {
            notifications: newNotifications,
            unreadCount: newNotifications.filter(n => !n.isRead).length
          };
        }),
        
      markAllAsRead: () => 
        set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, isRead: true })),
          unreadCount: 0
        })),
        
      deleteNotification: (notificationId) => 
        set((state) => {
          const newNotifications = state.notifications.filter(n => n._id !== notificationId);
          
          return {
            notifications: newNotifications,
            unreadCount: newNotifications.filter(n => !n.isRead).length
          };
        }),
        
      deleteAllNotifications: () => 
        set({ notifications: [], unreadCount: 0 }),
        
      setSocketConnected: (isConnected) => 
        set({ socketConnected: isConnected }),
        
      getUnreadNotifications: () => 
        get().notifications.filter(n => !n.isRead)
    }),
    {
      name: 'notification-storage',
      partialize: (state) => ({ 
        notifications: state.notifications,
        unreadCount: state.unreadCount
      }),
    }
  )
);