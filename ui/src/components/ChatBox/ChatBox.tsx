import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ChatMessage from "./ChatMessage";
import { useChat } from "../../hooks/useChat";

const ChatBox: React.FC = () => {
  const [inputMessage, setInputMessage] = useState("");
  const messages = useSelector((state: RootState) => state.chat.messages);
  const { sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div className="relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border shadow-soft-xl">
      <div className="relative z-10 flex flex-col flex-auto  p-4">
        <h5 className="pt-2 mb-6 font-bold text-gray-700">Chat</h5>
        <div
          id="chat-messages"
          className="flex-grow h-[350px] overflow-y-auto mb-4 text-[13px]" // Added height limit to make chat messages scrollable
        >
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isUser={message.isUser}
              shouldAnimate={!message.isUser && index === messages.length - 1}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-auto flex">
          <input
            type="text"
            className="flex-grow mr-2 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="bg-gradient-to-tl from-purple-700 to-pink-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
