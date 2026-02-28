import { io } from "socket.io-client";

// ⚡ กำหนด URL ของ Socket Server
const SOCKET_URL = "https://socket.hengheng88.app"; // แก้เป็นโดเมนจริงของชัญญานุช

let socket;

// ✅ เชื่อมต่อเซิร์ฟเวอร์
export function connectSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on("connect", () => console.log("✅ Connected to HENG Socket"));
    socket.on("disconnect", () => console.warn("⚠️ Disconnected from HENG Socket"));
  }
  return socket;
}

// ✅ ส่งข้อความ (ใช้ในระบบแชต)
export function sendMessage(room = "global", text) {
  if (!socket) return;
  const message = {
    room,
    text,
    time: new Date().toISOString(),
  };
  socket.emit("sendMessage", message);
}

// ✅ ฟังข้อความ (Realtime Chat)
export function listenMessages(callback) {
  if (!socket) return;
  socket.on("message", (msg) => {
    console.log("💬 New message:", msg);
    callback(msg);
  });
}

// ✅ เข้าห้อง (ใช้เวลาโทรหรือแชตรวม)
export function joinRoom(roomId) {
  if (socket) {
    socket.emit("joinRoom", roomId);
    console.log(`📡 Joined room: ${roomId}`);
  }
}

// ✅ ออกจากห้อง
export function leaveRoom(roomId) {
  if (socket) {
    socket.emit("leaveRoom", roomId);
    console.log(`🚪 Left room: ${roomId}`);
  }
}

// ✅ ส่งสัญญาณ WebRTC (ใช้ตอนโทรเห็นหน้า)
export function sendSignal(to, signalData) {
  if (socket) {
    socket.emit("signal", { to, signalData });
  }
}

// ✅ ฟังสัญญาณ WebRTC
export function listenSignal(callback) {
  if (socket) {
    socket.on("signal", (data) => callback(data));
  }
}

// ✅ ปิดการเชื่อมต่อ
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    console.log("❌ Socket disconnected manually");
  }
}