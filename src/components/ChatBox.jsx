import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Phone, Video, MoreVertical, ArrowLeft, X 
} from 'lucide-react';
import { io } from 'socket.io-client';

// 1. Import ส่วนประกอบอื่นๆ ของพี่
import MediaGalleryModal from './MediaGalleryModal'; 
import ChatActionSlider from './ChatActionSlider'; 

// 🌏 URL ของ Signaling Server บน Fly.io ของพี่
const SIGNALING_SERVER = "https://heng-signaling.fly.dev"; 

export default function ChatBox({ onBack }) {
  const [showMedia, setShowMedia] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 📞 State สำหรับเก็บเบอร์ที่ลูกค้าพิมพ์เอง
  const [targetNumber, setTargetNumber] = useState(''); 

  const socketRef = useRef();

  // ✅ ระบบเชื่อมต่อ Socket.io กับ Fly.io
  useEffect(() => {
    socketRef.current = io(SIGNALING_SERVER);

    // ฟังเหตุการณ์เมื่อมีสายเรียกเข้า
    socketRef.current.on("incoming-call", (data) => {
      alert(`มีสายเรียกเข้าจาก: ${data.fromName || 'ผู้ใช้ HENG'}`);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  // ✅ ฟังก์ชันจัดการการโทร (แยก Mobile / Desktop)
  const handleCall = (isVideo) => {
    if (!targetNumber) {
      alert("กรุณาใส่เบอร์โทรศัพท์ก่อนครับพี่");
      return;
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // 📱 โทรข้างนอก (เข้าแอปโทรศัพท์ของเครื่องมือถือ)
      window.location.href = isVideo ? `facetime:${targetNumber}` : `tel:${targetNumber}`;
    } else {
      // 💻 โทรข้างใน (ส่งสัญญาณผ่าน Fly.io)
      if (socketRef.current) {
        socketRef.current.emit("call-user", {
          toNumber: targetNumber,
          type: isVideo ? "video" : "voice",
          fromName: "HENG USER"
        });
        alert(`กำลังโทรภายในระบบไปที่เบอร์: ${targetNumber}...`);
      }
    }
  };

  // ข้อมูลแชทตัวอย่าง
  const [messages] = useState([
    { id: 1, text: 'สวัสดีครับ ยินดีต้อนรับสู่ HENG HENG', sender: 'other', time: '10:00' },
    { id: 2, text: 'พิมพ์เบอร์โทรศัพท์ที่แถบด้านบนเพื่อเริ่มการโทรได้เลยครับ', sender: 'other', time: '10:01' },
    { id: 3, text: 'ทดสอบระบบปักหมุดและระบบโทรเรียบร้อย', sender: 'me', time: '10:05' },
  ]);

  const filteredMessages = messages.filter(msg => 
    msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={st.container}>
      {/* --- 🟡 Header สีเหลือง --- */}
      <div style={st.yellowHeader}>
        <div style={st.headerLeft}>
          <ArrowLeft size={22} onClick={onBack} style={{ cursor: 'pointer' }} />
          
          {!isSearching ? (
            <div style={st.userInfo}>
              <span style={st.userName}>HENG HENG</span>
              {/* ⌨️ ช่องกรอกเบอร์โทรศัพท์ (ลูกค้าพิมพ์เอง) */}
              <input 
                type="tel"
                placeholder="พิมพ์เบอร์ที่จะโทร..."
                value={targetNumber}
                onChange={(e) => setTargetNumber(e.target.value)}
                style={st.numberInput}
              />
            </div>
          ) : (
            <div style={st.searchBox}>
              <input 
                autoFocus
                placeholder="ค้นหาข้อความในแชท..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={st.searchInput}
              />
              <X 
                size={18} 
                onClick={() => { setIsSearching(false); setSearchTerm(''); }} 
                style={{ cursor: 'pointer', color: '#64748B' }} 
              />
            </div>
          )}
        </div>

        {/* --- 📞 ปุ่มฟังก์ชันการโทร --- */}
        <div style={st.headerRight}>
          {!isSearching && (
            <Search size={22} onClick={() => setIsSearching(true)} style={{ cursor: 'pointer' }} />
          )}
          <Phone size={22} onClick={() => handleCall(false)} style={{ cursor: 'pointer' }} />
          <Video size={22} onClick={() => handleCall(true)} style={{ cursor: 'pointer' }} />
          <MoreVertical size={22} style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* --- 💬 พื้นที่แสดงข้อความแชท --- */}
      <div style={st.chatArea}>
        {filteredMessages.map(msg => (
          <div key={msg.id} style={msg.sender === 'me' ? st.myMsgRow : st.otherMsgRow}>
            <div style={msg.sender === 'me' ? st.myBubble : st.otherBubble}>
              {msg.text}
              <div style={st.msgTime}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. ส่วน Slider และ Modal สื่อ */}
      <ChatActionSlider onMediaClick={() => setShowMedia(true)} />
      {showMedia && <MediaGalleryModal onClose={() => setShowMedia(false)} />}
    </div>
  );
}

const st = {
  container: { display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F8FAFC', position: 'relative' },
  yellowHeader: { height: '70px', backgroundColor: '#EAB308', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 15px', color: '#003366' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '10px', flex: 1 },
  headerRight: { display: 'flex', gap: '15px' },
  userInfo: { display: 'flex', flexDirection: 'column', flex: 1 },
  userName: { fontWeight: 'bold', fontSize: '14px' },
  numberInput: { 
    backgroundColor: 'rgba(255,255,255,0.3)', 
    border: '1px solid rgba(0,0,0,0.1)', 
    borderRadius: '6px', 
    padding: '4px 10px', 
    fontSize: '12px', 
    color: '#003366',
    marginTop: '4px',
    outline: 'none',
    width: '140px'
  },
  searchBox: { flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#FFF', borderRadius: '20px', padding: '5px 10px', marginRight: '10px' },
  searchInput: { flex: 1, border: 'none', outline: 'none', fontSize: '13px', color: '#003366' },
  chatArea: { flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
  otherMsgRow: { display: 'flex', justifyContent: 'flex-start' },
  myMsgRow: { display: 'flex', justifyContent: 'flex-end' },
  otherBubble: { backgroundColor: '#FFF', padding: '8px 12px', borderRadius: '15px 15px 15px 0', fontSize: '14px', maxWidth: '75%', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
  myBubble: { backgroundColor: '#003366', color: '#FFF', padding: '8px 12px', borderRadius: '15px 15px 0 15px', fontSize: '14px', maxWidth: '75%' },
  msgTime: { fontSize: '9px', opacity: 0.6, marginTop: '4px', textAlign: 'right' },
};
