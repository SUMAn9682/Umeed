// components/umeed/ChatMessages.tsx
"use client";

import { useRef, useEffect } from "react";
import { useChatStore } from "@/store/Chatbot";
import { Avatar } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/types/chatbot";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  
  return (
    <div className={cn(
      "flex gap-3 p-4",
      isUser ? "bg-secondary/30" : "bg-background"
    )}>
      <Avatar className={cn(
        "h-8 w-8 flex items-center justify-center",
        isUser ? "bg-primary" : "bg-blue-500"
      )}>
        {isUser ? <User size={16} color="white" /> : <Bot size={16} color="white" />}
      </Avatar>
      
      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-medium mb-1">
          {isUser ? "You" : "Medical Assistant"}
        </p>
        {/* Display image if present */}
        {message.attachment?.url && (
                <div className="mb-2">
                  <img 
                    src={message.attachment.url} 
                    alt="Medical document" 
                    className="rounded max-h-48 max-w-full object-contain"
                  />
                  {message.attachment.uploading && (
                    <div className="mt-1 text-xs text-blue-200">Uploading...</div>
                  )}
                </div>
              )}
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export const ChatMessages = () => {
  const { currentSession, isLoading } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSession?.messages]);
  
  if (!currentSession) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <Bot size={64} className="text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Welcome to Umeed</h3>
        <p className="text-center text-muted-foreground max-w-md">
          Ask questions about your health, symptoms, medicines, or get advice based on your health profile.
        </p>
      </div>
    );
  }
  
  return (
    <div className="flex-1 overflow-y-auto">
      {currentSession.messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      
      {isLoading && (
        <div className="p-4 flex items-center gap-3">
          <Avatar className="h-8 w-8 flex items-center justify-center bg-blue-500">
            <Bot size={16} color="white" />
          </Avatar>
          <div className="flex space-x-2">
            <div className="h-3 w-3 bg-muted-foreground/40 rounded-full animate-bounce" />
            <div className="h-3 w-3 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="h-3 w-3 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};