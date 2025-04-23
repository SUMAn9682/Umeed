// src/service/socketService.ts
import { io, Socket, Manager } from "socket.io-client";
import { useNotificationStore } from "@/store/Notifcation";

let socket: Socket | null = null;
const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Debounce handling to prevent duplicate notifications
let isHandlingNotification = false;
let notificationTimeout: NodeJS.Timeout | null = null;

export const initializeSocket = (userId: string): Socket => {
  if (socket && socket.connected) {
    console.log('Socket already connected');
    return socket;
  }

  // Close any existing connection
  if (socket) {
    socket.disconnect();
  }

  // Initialize socket connection
  socket = io(SOCKET_URL, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    auth: { userId },
    path: '/socket.io/',
  });

  // Get the notification store methods
  const store = useNotificationStore.getState();

  // Connection events
  socket.on("connect", () => {
    console.log('Socket connected with ID:', socket?.id);
    store.setSocketConnected(true);
    
    // Join user's room for notifications
    socket?.emit("joinRoom", userId);
    
    console.log(`Joining room: ${userId}`);
  });

  socket.on("roomJoined", (response) => {
    console.log('Room joined response:', response);
  });

  // Handle different notification types with debouncing
  socket.on("receiveNotification", (notification) => {
    if (isHandlingNotification) {
      return;
    }

    isHandlingNotification = true;

    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }

    notificationTimeout = setTimeout(() => {
      console.log('Received notification:', notification);
      store.addNotification(notification);
      
      // Show browser notification if permission is granted
      if (typeof window !== 'undefined' && 
          Notification && 
          Notification.permission === 'granted') {
        new Notification('Umeed Notification', {
          body: notification.message,
          icon: '/logo.png'
        });
      }
      
      isHandlingNotification = false;
      notificationTimeout = null;
    }, 100); // Small delay to prevent duplicate events
  });

  // Handle blood request notifications specifically
  socket.on("bloodRequest", (notification) => {
    if (isHandlingNotification) {
      return;
    }

    isHandlingNotification = true;

    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }

    notificationTimeout = setTimeout(() => {
      console.log('Received blood request notification:', notification);
      store.addNotification({
        ...notification,
        type: 'blood_request',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      isHandlingNotification = false;
      notificationTimeout = null;
    }, 100);
  });

  // Error handling
  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
    store.setSocketConnected(false);
  
    // Safely access the manager and its options
    const manager = socket?.io as Manager;
    
    if (manager && manager.opts) {
      const currentTransports = manager.opts.transports as string[];
      
      if (Array.isArray(currentTransports) && currentTransports.includes('websocket')) {
        console.log('Falling back to polling transport');
        manager.opts.transports = ['polling'];
      }
    }
  });

  socket.on("disconnect", (reason) => {
    console.log('Socket disconnected:', reason);
    store.setSocketConnected(false);
    
    if (reason === "io server disconnect") {
      console.log('Attempting to reconnect...');
      socket?.connect();
    }
  });

  return socket;
};

export const getSocket = (): Socket | null => {
  if (!socket) {
    console.warn('Socket not initialized. Call initializeSocket first.');
    return null;
  }
  return socket;
};

export const closeSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    useNotificationStore.getState().setSocketConnected(false);
    console.log('Socket connection closed');
  }
};

// Helper to send a test notification (useful for debugging)
export const sendTestNotification = (userId: string): void => {
  const socket = getSocket();
  if (socket) {
    socket.emit('sendNotification', {
      room: userId,
      notification: {
        _id: 'test-' + Date.now(),
        userId,
        type: 'other',
        message: 'This is a test notification',
        redirectUrl: '/dashboard',
        isRead: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    });
  }
};