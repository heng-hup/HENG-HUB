import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Phone, Video, MoreVertical, ArrowLeft, X, PhoneIncoming, PhoneOff 
} from 'lucide-react';
import { io } from 'socket.io-client';

import MediaGalleryModal from './MediaGalleryModal'; 
import ChatActionSlider from './ChatActionSlider'; 

// 🌏 URL ของ Signaling Server บน Fly.io
const SIGNALING_SERVER = "https://heng-signaling.fly.dev"; 

export default function ChatBox({ onBack }) {
  const [showMedia, setShowMedia] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [targetNumber, setTargetNumber] = useState(''); 

  // 📞 State สำหรับระบบจัดการสายเรียกเข้า
  const [incomingCall, setIncomingCall] = useState(null); 
  const socketRef = useRef();
  
  // 🎵 เตรียมเสียงเรียกเข้าแบรนด์ HENG (ไฟล์ต้องอยู่ที่ public/sounds/heng-ringtone.mp3)
  const ringtoneRef = useRef(new Audio('/sounds/heng-ringtone.mp3'));

  useEffect(() => {
    // เชื่อมต่อ Fly.io
    socketRef.current = io(SIGNALING_SERVER);

    // รับสัญญาณเมื่อมีคนโทรเข้า
    socketRef.current.on("incoming-call", (data) => {
      setIncomingCall(data);
      playRingtone();
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      stopRingtone();
    };
  }, []);

  // --- ฟังก์ชันจัดการเสียง ---
  const playRingtone = () => {
    ringtoneRef.current.loop = true;
    ringtoneRef.current.play().catch(e => console.log("รอการตอบโต้จาก User เพื่อเล่นเสียง"));
  };

  const stopRingtone = () => {
    ringtoneRef.current.pause();
    ringtoneRef.current.currentTime = 0;
  };

  // --- ฟังก์ชัน รับ/วางสาย ---
  const answerCall = () => {
    stopRingtone();
    alert("กำลังเชื่อมต่อสาย...");
    setIncomingCall(null);
    // Logic สำหรับเปิดหน้าจอคุย (WebRTC) จะอยู่ตรงนี้
  };

  const rejectCall = () => {
    stopRingtone();
    if (socketRef.current) {
      socketRef.current.emit("reject-call", { to: incomingCall.fromId });
    }
    setIncomingCall(null);
  };

  // --- ฟังก์ชันโทรออก ---
  const handleCall = (isVideo) => {
    if (!targetNumber) {
      alert("กรุณาใส่เบอร์โทรศัพท์ก่อนครับพี่");
      return;
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // 📱 โทรผ่านแอปมือถือ
      window.location.href = isVideo ? `facetime:${targetNumber}` : `tel:${targetNumber}`;
    } else {
      // 💻 โทรผ่านระบบ HENG (Fly.io)
      if (socketRef.current) {
        socketRef.current.emit("call-user", {
          toNumber: targetNumber,
          type: isVideo ? "video" : "voice",
          fromName: "HENG USER"
        });
        alert(`กำลังโทรออกไปที่เบอร์ ${targetNumber}...`);
      }
    }
  };

  // ข้อมูลแชท
  const [messages] = useState([
    { id: 1, text: 'ยินดีต้อนรับสู่ HENG HENG แพลตฟอร์ม', sender: 'other', time: '10:00' },
    { id: 2, text: 'ทดสอบระบบโทรเข้า-ออก และเสียงแบรนด์เรียบร้อย', sender: 'me', time: '10:05' },
  ]);

  const filteredMessages = messages.filter(msg => 
    msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={st.container}>
      
      {/* --- 🔔 หน้าจอเด้งรับสาย (Incoming Call UI) --- */}
      {incomingCall && (
        <div style={st.callOverlay}>
          <div style={st.callCard}>
            <div style={st.brandBadge}>HENG HENG CALL</div>
            <div style={st.callerAvatar}>
               <PhoneIncoming size={45} color="#EAB308" />
            </div>
            <h2 style={st.callerName}>{incomingCall.fromName || "สายเรียกเข้า"}</h2>
            <p style={st.callType}>
              {incomingCall.type === 'video' ? 'วิดีโอคอลกำลังมา...' : 'กำลังเรียกสายเสียง...'}
            </p>
            
            <div style={st.callActions}>
              <button onClick={rejectCall} style={st.btnReject}>
                <PhoneOff size={28} />
              </button>
              <button onClick={answerCall} style={st.btnAccept}>
                <Phone size={28} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 🟡 Header --- */}
      <div style={st.yellowHeader}>
        <div style={st.headerLeft}>
          <ArrowLeft size={22} onClick={onBack} style={{ cursor: 'pointer' }} />
          {!isSearching ? (
            <div style={st.userInfo}>
              <span style={st.userName}>HENG HENG</span>
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
              <input autoFocus placeholder="ค้นหาแชท..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={st.searchInput} />
              <X size={18} onClick={() => { setIsSearching(false); setSearchTerm(''); }} style={{ cursor: 'pointer' }} />
            </div>
          )}
        </div>
        <div style={st.headerRight}>
          {!isSearching && <Search size={22} onClick={() => setIsSearching(true)} style={{ cursor: 'pointer' }} />}
          <Phone size={22} onClick={() => handleCall(false)} style={{ cursor: 'pointer' }} />
          <Video size={22} onClick={() => handleCall(true)} style={{ cursor: 'pointer' }} />
          <MoreVertical size={22} style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* --- 💬 Chat Area --- */}
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

      <ChatActionSlider onMediaClick={() => setShowMedia(true)} />
      {showMedia && <MediaGalleryModal onClose={() => setShowMedia(false)} />}
    </div>
  );
}

const st = {
  container: { display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F8FAFC', position: 'relative', overflow: 'hidden' },
  // --- UI หน้าจอรับสาย ---
  callOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,30,60,0.95)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  callCard: { textAlign: 'center', color: 'white', width: '85%' },
  brandBadge: { backgroundColor: '#EAB308', color: '#003366', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block', marginBottom: '30px' },
  callerAvatar: { width: '110px', height: '110px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px', boxShadow: '0 0 20px rgba(234,179,8,0.5)' },
  callerName: { fontSize: '26px', margin: '10px 0', fontWeight: 'bold' },
  callType: { fontSize: '15px', opacity: 0.8, marginBottom: '50px' },
  callActions: { display: 'flex', justifyContent: 'space-around', width: '100%' },
  btnReject: { width: '65px', height: '65px', borderRadius: '50%', border: 'none', backgroundColor: '#EF4444', color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  btnAccept: { width: '65px', height: '65px', borderRadius: '50%', border: 'none', backgroundColor: '#22C55E', color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  // --- UI ปกติ ---
  yellowHeader: { height: '80px', backgroundColor: '#EAB308', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 15px', color: '#003366', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '10px', flex: 1 },
  headerRight: { display: 'flex', gap: '15px' },
  userInfo: { display: 'flex', flexDirection: 'column', flex: 1 },
  userName: { fontWeight: 'bold', fontSize: '15px' },
  numberInput: { backgroundColor: 'rgba(255,255,255,0.4)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '6px', padding: '5px 10px', fontSize: '13px', color: '#003366', marginTop: '4px', outline: 'none', width: '150px' },
  searchBox: { flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#FFF', borderRadius: '20px', padding: '5px 12px', marginRight: '10px' },
  searchInput: { flex: 1, border: 'none', outline: 'none', fontSize: '13px' },
  chatArea: { flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' },
  otherMsgRow: { display: 'flex', justifyContent: 'flex-start' },
  myMsgRow: { display: 'flex', justifyContent: 'flex-end' },
  otherBubble: { backgroundColor: '#FFF', padding: '10px 14px', borderRadius: '18px 18px 18px 0', fontSize: '14px', maxWidth: '75%', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
  myBubble: { backgroundColor: '#003366', color: '#FFF', padding: '10px 14px', borderRadius: '18px 18px 0 18px', fontSize: '14px', maxWidth: '75%' },
  msgTime: { fontSize: '10px', opacity: 0.5, marginTop: '4px', textAlign: 'right' }
};
