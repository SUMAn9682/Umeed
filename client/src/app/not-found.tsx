"use client";

import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/95 px-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-md w-full text-center">
        {/* 404 text */}
        <div className="mb-6 relative">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
          
          {/* Simple line effect */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-primary/30 animate-pulse"></div>
        </div>

        <h2 className="text-2xl font-medium mb-6">
          Page Not Found
        </h2>

        <p className="text-muted-foreground mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="w-full sm:w-auto">
            <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/20 px-4 py-2 rounded-md text-white w-full sm:w-auto">
              <Home className="h-4 w-4 mr-2" />
              <span>Back to Home</span>
            </button>
          </Link>
          
          <Link href="/contact" className="w-full sm:w-auto">
            <button className="flex items-center justify-center space-x-2 border border-primary/20 hover:bg-primary/5 px-4 py-2 rounded-md w-full sm:w-auto">
              <span>Contact Support</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </Link>
        </div>
      </div>
      
      {/* Health-related subtle icon */}
      <div className="absolute bottom-8 opacity-20">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M2 12H5.67L8.5 7L12.5 17L15.33 12H22" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-primary"
          />
        </svg>
      </div>
    </div>
  );
}

export default NotFound;