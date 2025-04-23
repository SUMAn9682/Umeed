"use client";

import { Sidebar } from "@/components/umeed/Sidebar";
import { ChatContainer } from "@/components/umeed/ChatContainer";
import { useChatStore } from "@/store/Chatbot";
import { useEffect } from "react";

export default function Home() {
  const { fetchSessions } = useChatStore();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <main className="flex h-screen -mt-12">
      <Sidebar />

      <div className="flex-1 md:ml-16 h-full transition-all duration-300">
        <ChatContainer />
      </div>
    </main>
  );
}
