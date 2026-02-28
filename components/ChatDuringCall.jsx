import { useState } from "react";
import ChatMessageBubble from "./ChatMessageBubble";

export default function ChatDuringCall({ messages, onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex flex-col bg-[#111]/80 backdrop-blur-lg rounded-t-2xl p-3 absolute bottom-0 w-full h-1/2">
      <div className="flex-1 overflow-y-auto space-y-2 mb-2">
        {messages.map((m, i) => (
          <ChatMessageBubble key={i} message={m} />
        ))}
      </div>

      <div className="flex items-center bg-[#222] rounded-full px-3 py-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="พิมพ์ข้อความ..."
          className="flex-1 bg-transparent text-white outline-none"
        />
        <button onClick={handleSend} className="text-yellow-400 text-xl font-bold">
          ➤
        </button>
      </div>
    </div>
  );
}