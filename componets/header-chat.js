import React from 'react'
import { MdDelete } from "react-icons/md";

export default function HeaderChat({ setMessages }) {
    return (
        <div className="bg-white p-4 text-gray-800 font-semibold border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">CHAT BOT</h2>
            <div className="relative group">
                <button
                    onClick={() => {
                        setMessages([]);
                        if (typeof window !== "undefined") {
                            localStorage.removeItem("chatMessages");
                        }
                    }}
                    className="rounded-full "
                >
                    <MdDelete size={24} />
                </button>

                <div className="absolute top-full right-0 mt-2 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                    Borrar historial
                    <div className="absolute right-2 top-0 -translate-y-full border-4 border-transparent border-b-gray-900"></div>
                </div>
            </div>
        </div>
    )
}
