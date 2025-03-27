import ChatCard from "../../componets/chat-card";
import Sidebar from "../../componets/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen w-screen bg-gray-50 text-gray-800">
      <Sidebar />
      
      {/* Contenedor del chat */}
      <div className="flex-1 flex flex-col">
        <ChatCard />
      </div>
    </div>
  );
}