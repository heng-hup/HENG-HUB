// heng/frontend/pages/chatcall.jsx
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000");

export default function ChatCall(){
  const [room, setRoom] = useState("global");
  const [msgs, setMsgs] = useState([]);
  useEffect(()=> {
    socket.emit("joinRoom", { room, user: "guest" });
    socket.on("chatMessage", m => setMsgs(prev=>[...prev, m]));
    return ()=> { socket.off("chatMessage"); };
  }, []);
  const send = () => {
    const text = document.getElementById("txt").value;
    socket.emit("chatMessage", { room, user: "you", text });
  };
  return (
    <div className="p-4">
      <div className="h-64 overflow-y-auto bg-gray-800 p-2">{msgs.map((m,i)=>(<div key={i} className="p-2">{m.user}: {m.text}</div>))}</div>
      <div className="flex gap-2 mt-2">
        <input id="txt" className="flex-1 p-2 bg-gray-700" />
        <button onClick={send} className="px-3 bg-yellow-400 text-black">Send</button>
      </div>
    </div>
  );
}