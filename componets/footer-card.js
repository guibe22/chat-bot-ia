import React from 'react'

export default function FooterCard({setNewMessage,newMessage,sendMessage, }) {
  return (
    <div className="bg-white p-3 border-t flex items-center space-x-2">
    {/* <select onChange={(e) => setMessageType(e.target.value)} className="border rounded-lg p-2">
        <option value="text">Texto</option>
        <option value="image">Imagen</option>
    </select> */}
    <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Escribe un mensaje..."
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
    <button onClick={sendMessage} className=" bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
        Enviar
    </button>
</div>
  )
}
