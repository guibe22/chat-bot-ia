import ChatCard from "../../componets/chat-card";




export default function Home() {

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[url('https://wallpapercave.com/wp/wp10299398.png')] bg-cover bg-center bg-no-repeat relative">
      <div className="w-full h-[90vh] max-w-4xl bg-white/80 backdrop-blur-md shadow-lg rounded-lg flex flex-col overflow-hidden">
        <ChatCard />
      </div>
    </div>

  );
}
