import { useEffect, useRef, useState } from "react";
import { initCall, endCall } from "../../utils/webrtc";
import { connectSocket, sendMessage, listenMessages } from "../../utils/socket";
import ChatDuringCall from "../../components/ChatDuringCall";

export default function CallAndChat() {
  const videoRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    initCall(videoRef.current, setConnected);
    connectSocket();
    listenMessages((msg) => setMessages((prev) => [...prev, msg]));
    return () => endCall();
  }, []);

  const handleSend = (text) => {
    const msg = { sender: "me", text };
    setMessages([...messages, msg]);
    sendMessage(msg);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white relative">
      {/* ส่วนกล้องหรือรูป */}
      <video ref={videoRef} autoPlay playsInline className="w-full h-1/2 object-cover" />

      {/* ส่วนแชตระหว่างโทร */}
      <ChatDuringCall messages={messages} onSend={handleSend} />

      {/* ปุ่มวางสาย */}
      <div className="absolute bottom-4 right-1/2 translate-x-1/2">
        <button
          onClick={endCall}
          className="bg-red-600 px-6 py-3 rounded-full font-bold text-white"
        >
          🚫 วางสาย
        </button>
      </div>
    </div>
  );
}