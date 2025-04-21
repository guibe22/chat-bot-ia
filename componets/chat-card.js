"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import HeaderChat from "./header-chat";
import Dialog from "./Dialog";
import DotAnimation from "./dot-animation";
import FooterCard from "./footer-card";

export default function ChatCard() {
    const user = { id: 1, username: "user" };
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messageType, setMessageType] = useState("text");
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedMessages = localStorage.getItem("chatMessages");
            if (storedMessages) {
                setMessages(JSON.parse(storedMessages));
            }
        }
    }, []);

    const saveMessagesToLocalStorage = (messages) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("chatMessages", JSON.stringify(messages));
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const userMessage = {
            user: { id: 1, username: "user" },
            message: newMessage,
            timestamp: new Date().toISOString(),
        };

        setMessages((prevMessages) => {
            const newMessages = [...prevMessages, userMessage];
            saveMessagesToLocalStorage(newMessages);
            return newMessages;
        });

        setNewMessage("");
        setIsTyping(true);

        try {
            const response = await axios.post("/api/send-message", {
                message: newMessage,
                history: messages,
            });
            if (response.status === 200) {
                const botMessage = {
                    user: { id: 2, username: "ChatBot" },
                    message: response.data.response || "[Imagen Generada]",
                    timestamp: new Date().toISOString()
                };

                setMessages((prevMessages) => {
                    const newMessages = [...prevMessages, botMessage];
                    saveMessagesToLocalStorage(newMessages);
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error al obtener respuesta del chatbot:", error);
        } finally {
            setIsTyping(false);
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <div className="w-full h-screen flex flex-col">
        <HeaderChat setMessages={setMessages} />
    
        {/* Chat Scrollable Area */}
        <div className="flex-1 overflow-hidden md:pb-20 pb-12"> {/* Ajustamos el padding para que no se cubra en móviles */}
            <div ref={chatContainerRef} className="h-full overflow-y-auto p-2 md:p-4 bg-gray-100 w-full">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center">
                        <img
                            src="/victorbot.png"
                            className="size-40"
                        />
                        <h2 className="text-xl font-semibold text-gray-700 mb-1">VICTOR BOT</h2>
                        <p className="text-gray-500">Envía un mensaje para comenzar</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex flex-col ${msg.user.id === user.id ? "items-end" : "items-start"}`}>
                                <span className="text-xs text-gray-500 font-semibold mb-1">{msg.user.username}</span>
                                <div
                                    className={`relative p-2 md:p-3 rounded-3xl max-w-[95%] md:max-w-[85%] break-words ${msg.user.id === user.id
                                        ? "bg-blue-500 text-white rounded-tr-none"
                                        : "bg-white rounded-tl-none shadow-md"
                                        }`}
                                >
                                    <Dialog isSender={msg.user.id === user.id}>{msg.message}</Dialog>
                                </div>
                                <span className="text-xs mt-1 text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                            </div>
                        ))}
                        {isTyping && <DotAnimation />}
                    </div>
                )}
            </div>
        </div>
    
        <div className="sticky bottom-0 w-full border-t bg-white mb-6 z-10">
            <FooterCard
                setNewMessage={setNewMessage}
                newMessage={newMessage}
                sendMessage={sendMessage}
            />
        </div>
    </div>

    );
}