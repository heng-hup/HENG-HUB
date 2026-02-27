import { io } from "socket.io-client";

let socket;

export const connectSocket = () => {
  socket = io("https://heng-communication-server.com"); // URL backend
};

export const sendMessage = (msg) => {
  socket.emit("chat-message", msg);
};

export const listenMessages = (callback) => {
  socket.on("chat-message", callback);
};