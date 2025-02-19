import { useEffect, useState } from "react";

const DotAnimation = () => {
  const baseText = "El chatbot está pensando";
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <span className="text-md font-semibold text-gray-800 transition-all duration-75">
        {baseText}
        <span className="animate-pulse ">{dots}</span>
      </span>
    </div>
  );
};

export default DotAnimation;
