// components/umeed/Sidebar.tsx
"use client";

import { useEffect } from "react";
import { useChatStore } from "@/store/Chatbot";
import { NewChatButton } from "./NewChatButton";
import { SessionItem } from "./SessionItem";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SidebarProps {
  bloodGroup?: string;
}

export const Sidebar = ({ bloodGroup }: SidebarProps) => {
  const { sessions, fetchSessions, clearAllSessions } = useChatStore();
  
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);
  
  return (
    <div className="w-full h-full flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Umeed</h2>
        </div>
        
        {bloodGroup && (
          <div className="mb-4 p-2 bg-sidebar-primary/10 rounded-md text-sm">
            <p className="font-medium">Blood Group: {bloodGroup}</p>
          </div>
        )}
        
        <NewChatButton />
        
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Recent Chats</h3>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Trash2 size={14} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear all chats?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your chat history.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearAllSessions}>
                  Clear all
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {sessions.length === 0 ? (
          <div className="text-center text-muted-foreground p-4">
            No chat history
          </div>
        ) : (
          sessions.map((session) => (
            <SessionItem key={session._id} session={session} />
          ))
        )}
      </div>
    </div>
  );
};