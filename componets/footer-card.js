import React, { useRef, useEffect } from 'react';

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
    <div className="bg-white p-3 border-t flex flex-col space-y-2">
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
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none overflow-hidden"
        rows={1}
        style={{ minHeight: "24px", maxHeight: "240px" }}
      />
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm">{newMessage.length}/{maxChars} caracteres</span>
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          disabled={newMessage.length === 0} 
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
