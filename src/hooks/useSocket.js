import { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_URL = "https://socket.hengheng88.app"; // เปลี่ยนตามโดเมนของชัญญานุช

export function useSocket() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, { transports: ["websocket"] });
    setSocket(newSocket);

    newSocket.on("connect", () => setConnected(true));
    newSocket.on("disconnect", () => setConnected(false));

    return () => newSocket.close();
  }, []);

  return { socket, connected };
}