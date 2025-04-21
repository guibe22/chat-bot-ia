import React from 'react'
import { MdDelete } from "react-icons/md";

export default function HeaderChat({ setMessages }) {
    return (
        <div className="bg-white p-4 flex justify-between items-center shadow-sm">
            <h2 className="text-lg font-semibold">Asistente de IA</h2>
            <button
                onClick={() => {
                    if (confirm("¿Estás seguro de borrar el historial de esta conversación?")) {
                        setMessages([]);
                        if (typeof window !== "undefined") {
                            localStorage.removeItem("chatMessages");
                        }
                    }
                }}
                className="text-gray-500 hover:text-red-500 p-1 rounded-md hover:bg-gray-100 transition"
                title="Borrar historial"
            >
                <MdDelete size={20} />
            </button>
        </div>
    )
}