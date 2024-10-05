import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import { addMessage } from "../slices/chatSlice";

const SOCKET_SERVER_URL = "http://localhost:8000";

export const useChat = () => {
  const socket = useRef<Socket | null>(null);
  const dispatch = useDispatch();

  const connect = useCallback(() => {
    socket.current = io(SOCKET_SERVER_URL);

    socket.current.on("connect", () => {
      console.log("Connected to server");
    });

    socket.current.on("message", (data: { user: string; message: string }) => {
      dispatch(
        addMessage({
          id: Date.now().toString(),
          text: data.message,
          isUser: false,
          sender: data.user,
        })
      );
    });

    socket.current.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.current.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
  }, [dispatch]);

  useEffect(() => {
    connect();

    return () => {
      socket.current?.disconnect();
    };
  }, [connect]);

  const sendMessage = (message: string) => {
    if (socket.current?.connected) {
      socket.current.emit("message", message);
      dispatch(
        addMessage({
          id: Date.now().toString(),
          text: message,
          isUser: true,
          sender: "You",
        })
      );
    } else {
      console.error("Socket is not connected");
    }
  };

  return { sendMessage };
};
