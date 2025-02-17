'use client';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Dialog from './Dialog';

export default function ChatCard() {
  const user = { id: 1, username: 'user' };

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  const sendMessage = async () => {
    if (!newMessage) return; 

    const userMessage = {
      user: { id: 1, username: 'user' },
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]); 
    setNewMessage(''); 
    setIsTyping(true); 

    try {
    
      const response = await axios.post('/api/send-message', { message: newMessage, history: messages });

      const botMessage = {
        user: { id: 2, username: 'ChatBot' },
        message: response.data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]); 
    } catch (error) {
      console.error('Error al obtener respuesta del chatbot:', error);
      setIsTyping(false); 
    } finally {
      setIsTyping(false); 
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full h-[90vh] max-w-4xl bg-white/80 backdrop-blur-md shadow-lg rounded-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white p-4 text-gray-800 font-semibold text-center border-b">CHAT BOT</div>

      {/* Messages Container */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100 w-full">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${msg.user.id === user.id ? 'items-end' : 'items-start'} ${
              index > 0 && messages[index - 1].user.id === msg.user.id ? 'mt-1 mb-1' : 'mt-3 mb-2'
            }`}
          >
            {(index === 0 || messages[index - 1].user.id !== msg.user.id) && (
              <span className="text-xs text-gray-500 font-semibold mb-1">{msg.user.username}</span>
            )}
            <div
              className={`relative p-3 rounded-3xl max-w-[85%] break-words overflow-hidden
              ${msg.user.id === user.id ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-white rounded-tl-none shadow-md'}`}
            >
              <Dialog isSender={msg.user.id === user.id}>{msg.message}</Dialog>
            </div>
            <span className={`text-xs flex flex-col mt-1 ${msg.user.id === user.id ? 'items-end mr-2' : 'ml-2 text-gray-500'}`}>
              {new Date(msg.timestamp).toLocaleDateString()}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center justify-start mt-3">
            <div className="bg-gray-300 p-3 rounded-3xl max-w-[75%] break-words">
              <p className="text-sm text-gray-500">El chatbot está escribiendo...</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer - Input Group */}
      <div className="bg-white p-3 border-t flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe un mensaje..."
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
          Enviar
        </button>
      </div>
    </div>
  );
}
