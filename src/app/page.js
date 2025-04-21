"use client";
import React from "react";
import { useState } from "react";
import ChatCard from "../../componets/chat-card";
import Sidebar from "../../componets/sidebar";
import { MdMenu, MdClose } from "react-icons/md";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* Sidebar para pantallas grandes (siempre visible) y pantallas pequeñas (condicional) */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out transform
          md:relative md:translate-x-0 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar />
      </div>
      
      {/* Overlay para cerrar sidebar en móvil cuando está abierto */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/25 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col relative">
        {/* Botón de menú para móviles */}
        <div className="md:hidden p-4 bg-gray-800 text-white flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-700 focus:outline-none"
          >
            {sidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
          <h2 className="ml-3 text-lg font-semibold">Herramientas IA</h2>
        </div>
        
        {/* Contenedor del chat */}
        <div className="flex-1">
          <ChatCard />
        </div>
      </div>
    </div>
  );
}