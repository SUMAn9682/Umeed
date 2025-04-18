// components/umeed/ChatContainer.tsx
"use client";

import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export const ChatContainer = () => {
  return (
    <div className="flex flex-col h-full">
      <ChatMessages />
      <ChatInput />
    </div>
  );
};