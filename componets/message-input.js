"use client";
import React, { useRef, useEffect } from 'react';

export default function MessageInput({ newMessage, setNewMessage, sendMessage }) {
  const textareaRef = useRef(null);
  const maxChars = 1000;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 200; // 200px como máximo
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [newMessage]);

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={newMessage}
        onChange={(e) => {
          if (e.target.value.length <= maxChars) {
            setNewMessage(e.target.value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        placeholder="Escribe un mensaje..."
        className="w-full border border-gray-300 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={1}
        style={{ minHeight: "50px" }}
      />
      <button
        onClick={sendMessage}
        disabled={!newMessage.trim()}
        className={`absolute right-2 bottom-4 p-1 rounded-full ${
          newMessage.trim() 
            ? "text-blue-500 hover:text-blue-600 hover:bg-blue-50" 
            : "text-gray-400"
        } transition-colors`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>
    </div>
  );
}