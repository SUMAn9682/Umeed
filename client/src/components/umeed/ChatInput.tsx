// components/umeed/ChatInput.tsx
"use client";

import { useState, useRef } from "react";
import { useChatStore } from "@/store/Chatbot";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, isLoading, uploadImage } = useChatStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedFile) {
      // Handle file upload first if a file is selected
      const currentMessage = message.trim()
      await uploadImage(selectedFile, currentMessage || undefined);
      
      // Then send the text message if there is one
      // if (currentMessage && !isLoading) {
      //   await sendMessage(currentMessage);
      //   setMessage("");
      // }
      
      // Reset file state
      setMessage("");
      setSelectedFile(null);
      setPreviewImage(null);
      return;
    }
    
    if (message.trim()  && !selectedFile && !isLoading) {
      // Handle text message only
      await sendMessage(message);
      setMessage("");
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setPreviewImage(null);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image or PDF
    if (!file.type.match('image.*') && file.type !== 'application/pdf') {
      toast('Please upload an image or PDF file.');
      return;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast('File size should not exceed 5MB.');
      return;
    }
    
    setSelectedFile(file);
    
    // Create preview for images (not for PDFs)
    if (file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // For PDFs just show an icon or placeholder
      setPreviewImage('/pdf-icon.png');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      {/* Selected file preview */}
      {selectedFile && (
        <div className="mb-4 p-3 rounded-lg border bg-secondary/30">
          <div className="flex items-center space-x-3">
            {previewImage && (
              <div className="w-16 h-16 relative rounded overflow-hidden bg-secondary">
                <Image 
                  src={previewImage} 
                  alt="Document preview" 
                  className="object-cover w-full h-full"
                  width={64}
                  height={64}
                />
              </div>
            )}
            <div className="flex-1 text-left">
              <p className="text-sm font-medium truncate">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type}
              </p>
            </div>
            <Button 
              type="button"
              variant="ghost" 
              size="sm"
              onClick={removeSelectedFile}
              className="h-8 w-8 p-0 rounded-full"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex items-end gap-2">
        {/* File upload button (left side) */}
        <Button 
          type="button"
          variant="outline" 
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "h-10 w-10 rounded-full flex-shrink-0",
            selectedFile ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
          )}
          disabled={isLoading}
        >
          <Paperclip size={18} />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*, application/pdf"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isLoading}
          />
        </Button>
        
        {/* Drag & drop area */}
        <div 
          className="hidden"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
        
        {/* Text input (middle) */}
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your health concerns..."
            className="min-h-[60px] max-h-[200px] resize-none"
            disabled={isLoading}
          />
        </div>
        
        {/* Send button (right side) */}
        <Button 
          type="submit" 
          className="h-10 w-10 rounded-full p-0 flex-shrink-0"
          disabled={(!selectedFile && !message.trim()) || isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <SendHorizontal size={18} />
          )}
        </Button>
      </div>
    </form>
  );
};