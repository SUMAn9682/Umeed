"use client";
import Footer from "@/components/footer/Footer";
import { useAuthStore } from "@/store/Auth";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return null;

  return (
    !isAuthenticated && (
      <div>
        <main className="min-h-screen flex items-center justify-center">
          {children}
        </main>
        <Footer />
      </div>
    )
  );
};

export default Layout;
