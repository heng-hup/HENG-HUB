import { useEffect, useRef, useState } from "react";
import { initCall, endCall } from "../../utils/webrtc";
import { connectSocket, sendMessage, listenMessages } from "../../utils/socket";
import ChatDuringCall from "../../components/ChatDuringCall";

export default function CallAndChat() {
  const videoRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    initCall(videoRef.current, setConnected);   // เริ่ม Video Stream
    connectSocket();                            // เชื่อม Socket Server
    listenMessages((msg) =>                     // ฟังข้อความใหม่
      setMessages((prev) => [...prev, msg])
    );
    return () => endCall();                     // ปิดสายเมื่อออก
  }, []);

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(text);                        // ส่งข้อความผ่าน Socket
      setMessages((prev) => [...prev, { self: true, text }]);
      setText("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h2 className="text-yellow-400 mb-2">📞 HENG CALL & CHAT</h2>
      <video ref={videoRef} autoPlay muted playsInline className="rounded-lg border border-yellow-400 w-3/4 mb-4" />

      {/* กล่องแชตระหว่างโทร */}
      <div className="w-3/4 bg-gray-900 p-3 rounded-xl h-64 overflow-y-auto mb-3">
        {messages.map((msg, i) => (
          <div key={i} className={`text-sm ${msg.self ? "text-yellow-300 text-right" : "text-gray-200"}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex w-3/4 gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="พิมพ์ข้อความ..."
          className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600"
        />
        <button onClick={handleSend} className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold">
          ส่ง
        </button>
      </div>
    </div>
  );
}