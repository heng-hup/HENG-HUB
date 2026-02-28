import React, { useState } from "react";
import ChatMessageBubble from "./ChatMessageBubble";

const ChatBox = ({ user }) => {
  const [messages, setMessages] = useState([
    { sender: "Alice", text: "สวัสดีจาก HENG 💛" },
    { sender: "System", text: "เชื่อมต่อเรียบร้อยแล้ว ✅" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: user || "You", text: input }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full p-3 bg-gradient-to-b from-black to-gray-900 text-yellow-300 rounded-2xl">
      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {messages.map((m, i) => (
          <ChatMessageBubble key={i} sender={m.sender} text={m.text} />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="พิมพ์ข้อความ..."
          className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-500"
        >
          ส่ง
        </button>
      </div>
    </div>
  );
};

export default ChatBox;