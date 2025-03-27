"use client";
import React from "react";
import { MdChat, MdDelete } from "react-icons/md";

export default function Sidebar() {
  const [conversations, setConversations] = React.useState([
    { id: 1, title: "Nueva conversación" }
  ]);

  return (
    <div className="w-64 h-full bg-gray-900 text-gray-200 flex flex-col border-r border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <button
          className="w-full border border-gray-600 rounded-md py-2 px-4 text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition"
          onClick={() => {
            setConversations(prev => [...prev, {
              id: Date.now(),
              title: `Conversación ${prev.length + 1}`
            }]);
          }}
        >
          <MdChat size={18} />
          Nueva conversación
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {conversations.map(conv => (
          <div
            key={conv.id}
            className="p-3 rounded-md hover:bg-gray-800 cursor-pointer flex justify-between items-center group"
          >
            <span className="truncate text-sm">{conv.title}</span>
            <button
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition"
              onClick={(e) => {
                e.stopPropagation();
                setConversations(prev => prev.filter(c => c.id !== conv.id));
              }}
            >
              <MdDelete size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        <div className="flex items-center">
          <div className="mr-3">
            <img
              src="https://www.ucne.edu/p/images/logoUCNE.png"
              className="size-12 object-contain"
              alt="Logo UCNE"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="leading-tight">Universidad Católica Nordestana</p>
            <p className="text-xs mt-1 leading-tight text-">Inteligencia Artificial</p>
          </div>
        </div>
      </div>
    </div>
  );
}