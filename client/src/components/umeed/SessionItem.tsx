// components/umeed/SessionItem.tsx
"use client";

import { useState } from "react";
import { ChatSession } from "@/types/chatbot";
import { useChatStore } from "@/store/Chatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Pencil, Save, Trash, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SessionItemProps {
  session: ChatSession;
}

export const SessionItem = ({ session }: SessionItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(session.title);
  const { fetchSession, deleteSession, updateSessionTitle, currentSession } = useChatStore();
  
  const isActive = currentSession?._id === session._id;
  
  const handleSelect = () => {
    if (!isEditing) {
      fetchSession(session._id);
    }
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSession(session._id);
  };
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };
  
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateSessionTitle(session._id, title);
    setIsEditing(false);
  };
  
  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTitle(session.title);
    setIsEditing(false);
  };
  
  return (
    <div 
      className={`p-3 my-1 rounded-md flex items-center justify-between cursor-pointer group transition-colors ${
        isActive ? "bg-primary/10" : "hover:bg-secondary"
      }`}
      onClick={handleSelect}
    >
      <div className="flex items-center gap-2 flex-1 overflow-hidden">
        <MessageSquare size={16} className="flex-shrink-0" />
        
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="h-7"
            autoFocus
          />
        ) : (
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium truncate">{session.title}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(session.updatedAt), { addSuffix: true })}
            </span>
          </div>
        )}
      </div>
      
      {isEditing ? (
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={handleSave}
          >
            <Save size={14} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-7 w-7"
            onClick={handleCancel}
          >
            <X size={14} />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-1  opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-7 w-7"
            onClick={handleEditClick}
          >
            <Pencil size={14} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash size={14} />
          </Button>
        </div>
      )}
    </div>
  );
};