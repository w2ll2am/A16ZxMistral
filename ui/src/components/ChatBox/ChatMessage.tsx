import React, { useState, useEffect, useCallback } from "react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  shouldAnimate: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isUser,
  shouldAnimate,
}) => {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  // Function to clean the message
  const cleanMessage = useCallback((msg: string) => {
    let cleanedMsg = msg;
    // Additional cleanup logic can be added here if necessary
    return cleanedMsg.trim();
  }, []);

  useEffect(() => {
    const cleanedMessage = cleanMessage(message);

    if (shouldAnimate && !isUser) {
      let index = -1;
      const animationSpeed = 30; // Adjust this value to change animation speed

      const intervalId = setInterval(() => {
        if (index < cleanedMessage.length) {
          setDisplayedMessage((prev) => {
            // Ensure previous state or an empty string is always provided
            return prev + (cleanedMessage[index] || "");
          });
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, animationSpeed);

      const cursorIntervalId = setInterval(() => {
        setCursorVisible((prev) => !prev);
      }, 500);

      return () => {
        clearInterval(intervalId);
        clearInterval(cursorIntervalId);
        setCursorVisible(false); // Ensure cursor visibility is reset
      };
    } else {
      setDisplayedMessage(cleanedMessage);
    }
  }, [message, shouldAnimate, isUser, cleanMessage]);
  setTimeout(() => setCursorVisible(false), 3500);
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`rounded-lg py-2 px-4 max-w-[85%] ${
          isUser ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {displayedMessage}
        {shouldAnimate && !isUser && cursorVisible && (
          <span className="inline-block w-2 h-4 ml-1 bg-gray-800 animate-blink"></span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
