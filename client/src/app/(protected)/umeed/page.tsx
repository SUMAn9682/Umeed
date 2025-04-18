// app/page.tsx
"use client";

import { Sidebar } from "@/components/umeed/Sidebar";
import { ChatContainer } from "@/components/umeed/ChatContainer";
import { useChatStore } from "@/store/Chatbot";
import { useEffect } from "react";
import { useAuthStore } from "@/store/Auth";



export default function Home() {
  const { fetchSessions } = useChatStore();
  const userBG = useAuthStore(state => state?.bloodGroup);
  
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);
  
  return (
    <main className="flex h-screen">
      <div className="w-64 h-full">
      {/* Set a fixed width for the Sidebar */}
      <Sidebar bloodGroup={userBG ?? undefined} />
    </div>
      
      <div className="flex-1 md:ml-16 h-full transition-all duration-300">
        <ChatContainer />
      </div>
    </main>
  );
}