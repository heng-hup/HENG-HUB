// heng/backend/sockets/chatSocket.js
export function attachChatSocket(io) {
  io.on("connection", socket => {
    console.log("socket connected", socket.id);
    socket.on("joinRoom", ({ room, user }) => {
      socket.join(room);
      socket.to(room).emit("system", { msg: `${user} joined` });
    });
    socket.on("chatMessage", ({ room, user, text }) => {
      io.to(room).emit("chatMessage", { user, text, ts: Date.now() });
    });
    socket.on("disconnect", () => console.log("socket disconnected", socket.id));
  });
}