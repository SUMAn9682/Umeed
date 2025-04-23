// components/umeed/ChatContainer.tsx
"use client";

import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export const ChatContainer = () => {
  return (
    // Button to toggle the sidebar
    
    <div className="flex flex-col h-[100vh] pt-20 bg-background text-foreground">
      <ChatMessages />
      <ChatInput />
    </div>
  );
};