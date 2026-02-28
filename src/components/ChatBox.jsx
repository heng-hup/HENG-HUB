import React, { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { supabase } from "../utils/supabaseClient";

export default function ChatBox({ user = "Guest" }) {
  const { socket, connected } = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // โหลดข้อความเก่าจากฐานข้อมูล Supabase
  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await supabase
        .from("chat_logs")
        .select("*")
        .order("created_at", { ascending: true });
      setMessages(data || []);
    };
    loadMessages();
  }, []);

  // ฟังข้อความใหม่แบบ realtime ผ่าน Socket
  useEffect(() => {
    if (!socket) return;
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("message");
  }, [socket]);

  // ฟังก์ชันส่งข้อความ
  const sendMessage = async () => {
    if (!message.trim()) return;
    const msgData = {
      user,
      message,
      created_at: new Date().toISOString(),
    };
    socket.emit("sendMessage", msgData);
    await supabase.from("chat_logs").insert([msgData]);
    setMessage("");
  };

  return (
    <div className="bg-black/70 border border-yellow-500/20 p-4 rounded-xl text-white w-full max-w-md shadow-lg">
      <h2 className="text-yellow-400 text-lg mb-2 font-bold">💬 HENG CHAT</h2>

      <p className="text-sm mb-3">
        สถานะ:{" "}
        <span className={connected ? "text-green-400" : "text-red-400"}>
          {connected ? "เชื่อมต่อแล้ว ✅" : "ไม่ได้เชื่อมต่อ ❌"}
        </span>
      </p>

      <div className="h-80 overflow-y-auto border border-gray-700 rounded-lg p-2 bg-gray-900/70 mb-3">
        {messages.map((msg, i) => (
          <div key={i} className="text-sm mb-1">
            <b className="text-yellow-300">{msg.user}</b>: {msg.message}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="พิมพ์ข้อความ..."
          className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600"
        />
        <button
          onClick={sendMessage}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-300 transition"
        >
          ส่ง
        </button>
      </div>
    </div>
  );
}