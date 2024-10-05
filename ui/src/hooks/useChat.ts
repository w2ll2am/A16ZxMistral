import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/slices/chatSlice";

const WS_URL = "http://127.0.0.1:8000/ws/dashboard";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  sender?: string;
}

export const useChat = () => {
  const socket = useRef<WebSocket | null>(null);
  const dispatch = useDispatch();

  const connect = useCallback(() => {
    console.log("Attempting to connect to WebSocket...");
    socket.current = new WebSocket(WS_URL);

    socket.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.current.onmessage = (event) => {
      console.log("Received message:", event.data);
      try {
        const message: Message = JSON.parse(event.data);
        console.log("Parsed message:", message);
        dispatch(addMessage(message));
      } catch (error) {
        console.error("Error parsing received message:", error);
      }
    };

    socket.current.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      setTimeout(() => {
        console.log("Attempting to reconnect...");
        connect();
      }, 5000);
    };

    socket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, [dispatch]);

  useEffect(() => {
    connect();

    return () => {
      if (socket.current) {
        console.log("Closing WebSocket connection...");
        socket.current.close();
      }
    };
  }, [connect]);

  const sendMessage = (text: string) => {
    if (socket.current?.readyState === WebSocket.OPEN) {
      const message: Message = {
        id: Date.now().toString(),
        text,
        isUser: true,
        sender: "You",
      };
      console.log("Sending message:", message);
      socket.current.send(JSON.stringify(message));
      dispatch(addMessage(message));
    } else {
      console.error(
        "WebSocket is not connected. ReadyState:",
        socket.current?.readyState
      );
    }
  };

  return { sendMessage };
};
