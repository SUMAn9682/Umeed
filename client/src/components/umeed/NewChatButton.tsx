// components/umeed/NewChatButton.tsx
"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/Chatbot";

export const NewChatButton = () => {
  const startNewChat = useChatStore(state => state.startNewChat);
  
  return (
    <Button 
      variant="outline" 
      className="w-full mb-4 flex items-center gap-2"
      onClick={startNewChat}
    >
      <PlusCircle size={16} />
      <span>New Chat</span>
    </Button>
  );
};