import React, { useState } from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';
import LiveOverlay from './LiveOverlay';

export default function HostView() {
  const [token, setToken] = useState("");

  const startLive = async () => {
    try {
      // 📍 เรียกไปที่ API Port 4000 ของคุณนัต
      const response = await fetch('http://localhost:4000/api/live/token?room=HengRoom1');
      const data = await response.json();
      
      if (data.token) {
        setToken(data.token);
      } else {
        alert("ไม่ได้รับ Token จากระบบ");
      }
    } catch (e) {
      console.error("Fetch Error:", e);
      alert("เชื่อมต่อ Backend Port 4000 ไม่ได้ครับ");
    }
  };

  if (!token) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <button 
          onClick={startLive} 
          className="bg-yellow-400 hover:bg-yellow-500 text-black p-6 rounded-full font-bold text-xl shadow-lg transition-all transform hover:scale-105"
        >
          START HENG LIVE ⚡️
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        // 📍 URL เซิร์ฟเวอร์จริงของคุณนัต
        serverUrl="wss://hengheng-app-u9uv9u9s.livekit.cloud"
        onDisconnected={() => setToken("")}
        onError={(err) => {
          console.error("LiveKit Error:", err);
          alert("การเชื่อมต่อเซิร์ฟเวอร์ไลฟ์ขัดข้อง");
        }}
      >
        <VideoConference />
        <LiveOverlay isHost={true} onLeave={() => setToken("")} />
      </LiveKitRoom>
    </div>
  );
}
