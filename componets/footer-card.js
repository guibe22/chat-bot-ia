import React, { useRef, useEffect } from 'react';
import MessageInput from './message-input';

export default function FooterCard({ setNewMessage, newMessage, sendMessage }) {
  const textareaRef = useRef(null);
  const maxChars = 1000;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 10 * 24;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [newMessage]);

  return (
    <div className="bg-white p-4">
      <div className="relative">
        <div className="bg-white p-4 border-t border-gray-200">
          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            maxChars={maxChars}
          />
        </div>
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className="absolute right-2 bottom-2 p-1 text-blue-500 hover:text-blue-600 disabled:text-gray-400"
        >
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-1 text-center">
        {newMessage.length}/{maxChars} caracteres
      </div>
    </div>
  );
}