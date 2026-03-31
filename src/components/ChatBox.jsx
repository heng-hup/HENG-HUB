import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Phone, Video, MoreVertical, ArrowLeft, X, PhoneIncoming, PhoneOff, Image as ImageIcon, Loader2 
} from 'lucide-react';
import { io } from 'socket.io-client';

// 🔥 นำเข้า Storage จากไฟล์ที่เราเพิ่งสร้าง
import { storage } from '../firebase'; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import MediaGalleryModal from './MediaGalleryModal'; 
import ChatActionSlider from './ChatActionSlider'; 

// 🌏 URL ของ Signaling Server บน Fly.io
const SIGNALING_SERVER = "https://heng-signaling.fly.dev"; 

export default function ChatBox({ onBack }) {
  const [showMedia, setShowMedia] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [targetNumber, setTargetNumber] = useState(''); 
  const [newMessage, setNewMessage] = useState(''); // สำหรับช่องพิมพ์ข้อความ
  const [isUploading, setIsUploading] = useState(false); // สถานะอัปโหลดรูป

  // 📞 State สำหรับระบบจัดการสายเรียกเข้า
  const [incomingCall, setIncomingCall] = useState(null); 
  const socketRef = useRef();
  const fileInputRef = useRef(); // สำหรับปุ่มเลือกรูป
  
  // 🎵 เตรียมเสียงเรียกเข้าแบรนด์ HENG (ไฟล์ต้องอยู่ที่ public/sounds/heng-ringtone.mp3)
  const ringtoneRef = useRef(new Audio('/sounds/heng-ringtone.mp3'));

  useEffect(() => {
    socketRef.current = io(SIGNALING_SERVER);

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
    if (ringtoneRef.current) {
      ringtoneRef.current.loop = true;
      ringtoneRef.current.currentTime = 0; 
      const playPromise = ringtoneRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          window.addEventListener('click', () => { ringtoneRef.current.play(); }, { once: true });
        });
      }
    }
  };

  const stopRingtone = () => {
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
  };

  // --- ฟังก์ชัน รับ/วางสาย ---
  const answerCall = () => { stopRingtone(); alert("กำลังเชื่อมต่อสาย..."); setIncomingCall(null); };
  const rejectCall = () => { stopRingtone(); if (socketRef.current && incomingCall) { socketRef.current.emit("reject-call", { to: incomingCall.fromId }); } setIncomingCall(null); };

  // --- ฟังก์ชันโทรออก ---
  const handleCall = (isVideo) => {
    if (!targetNumber) { alert("กรุณาใส่เบอร์โทรศัพท์ก่อนครับพี่"); return; }
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = isVideo ? `facetime:${targetNumber}` : `tel:${targetNumber}`;
    } else {
      if (socketRef.current) {
        socketRef.current.emit("call-user", { toNumber: targetNumber, type: isVideo ? "video" : "voice", fromName: "HENG USER" });
        alert(`กำลังโทรออกไปที่เบอร์ ${targetNumber}...`);
      }
    }
  };

  // --- 🔥 ฟังก์ชันอัปโหลดรูปภาพ (หัวใจสำคัญ) ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ตรวจสอบว่าเป็นไฟล์รูปภาพหรือไม่
    if (!file.type.startsWith('image/')) { alert("กรุณาเลือกไฟล์รูปภาพครับพี่"); return; }

    setIsUploading(true); // แสดงสถานะกำลังโหลด
    
    // สร้างชื่อไฟล์แบบสุ่มเพื่อไม่ให้ซ้ำกัน
    const fileName = `heng_${Date.now()}_${file.name}`;
    // สร้าง Reference ไปยังที่เก็บไฟล์บน Firebase Storage
    const storageRef = ref(storage, `chat_images/${fileName}`);
    // เริ่มอัปโหลด
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => { /* สามารถทำ Progress Bar ตรงนี้ได้ */ },
      (error) => { console.error("Upload failed", error); alert("อัปโหลดรูปไม่สำเร็จครับ"); setIsUploading(false); },
      () => {
        // อัปโหลดเสร็จแล้ว -> ดึง URL ของรูปออกมา
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // ส่ง URL ของรูปภาพเข้าไปในแชททันที
          sendChatMessage(downloadURL); 
          setIsUploading(false);
        });
      }
    );
  };

  // ข้อมูลแชท (ตัวอย่าง URL รูปภาพเพื่อให้พี่เห็นภาพตอน Deploy)
  const [messages, setMessages] = useState([
    { id: 1, text: 'ยินดีต้อนรับสู่ HENG HENG แพลตฟอร์ม', sender: 'other', time: '10:00' },
    { id: 2, text: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=500', sender: 'me', time: '10:05' },
  ]);

  // --- ฟังก์ชันส่งข้อความแชท ---
  const sendChatMessage = (text) => {
    const textToSend = text || newMessage;
    if (!textToSend.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: textToSend,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
    setNewMessage(''); // ล้างช่องพิมพ์
  };

  const filteredMessages = messages.filter(msg => 
    msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={st.container}>
      
      {/* Input ไฟล์แบบซ่อน (สำหรับปุ่มเลือกรูป) */}
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />

      {/* --- 🔔 หน้าจอเด้งรับสาย --- */}
      {incomingCall && (
        <div style={st.callOverlay}>
          <div style={st.callCard}>
            <div style={st.brandBadge}> CALL</div>
            <div style={st.callerAvatar}><PhoneIncoming size={45} color="#EAB308" /></div>
            <h2 style={st.callerName}>{incomingCall.fromName || "สายเรียกเข้า"}</h2>
            <p style={st.callType}>{incomingCall.type === 'video' ? 'วิดีโอคอลกำลังมา...' : 'กำลังเรียกสายเสียง...'}</p>
            <div style={st.callActions}>
              <button onClick={rejectCall} style={st.btnReject}><PhoneOff size={28} /></button>
              <button onClick={answerCall} style={st.btnAccept}><Phone size={28} /></button>
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
              <input type="tel" placeholder="เบอร์โทร..." value={targetNumber} onChange={(e) => setTargetNumber(e.target.value)} style={st.numberInput} />
            </div>
          ) : (
            <div style={st.searchBox}>
              <input autoFocus placeholder="ค้นหา..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={st.searchInput} />
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

      {/* --- 💬 Chat Area (อัปเดตใหม่: ส่งรูปเห็นเป็นรูป) --- */}
      <div style={st.chatArea}>
        {filteredMessages.map(msg => {
          // ตรวจสอบว่าข้อความเป็น URL รูปภาพหรือไม่
          const isImage = msg.text.match(/\.(jpeg|jpg|gif|png|webp|jfif)$/i) || msg.text.startsWith('blob:');

          return (
            <div key={msg.id} style={msg.sender === 'me' ? st.myMsgRow : st.otherMsgRow}>
              <div style={msg.sender === 'me' ? st.myBubble : st.otherBubble}>
                {isImage ? (
                  <div style={st.imageContainer}>
                    <img src={msg.text} alt="HENG" style={st.chatImage} onClick={() => window.open(msg.text, '_blank')} />
                    <div style={st.imageActions}>
                      <button onClick={() => {
                        const link = document.createElement('a');
                        link.href = msg.text;
                        link.download = `HENG_${Date.now()}.jpg`;
                        link.click();
                      }} style={st.actionBtn}>📥 ดาวน์โหลดต้นฉบับ</button>
                    </div>
                  </div>
                ) : (
                  <span>{msg.text}</span>
                )}
                <div style={st.msgTime}>{msg.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- ⌨️ Input Area (ปรับปรุงให้ส่งรูปได้) --- */}
      <div style={st.inputArea}>
        <button onClick={() => fileInputRef.current.click()} style={st.iconBtn}>
          {isUploading ? <Loader2 size={22} style={st.spinning} /> : <ImageIcon size={22} />}
        </button>
        <input 
          type="text" 
          placeholder="พิมพ์ข้อความ..." 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          onKeyPress={(e) => { if(e.key === 'Enter') sendChatMessage(); }} 
          style={st.mainInput} 
        />
        <button onClick={() => sendChatMessage()} style={st.sendBtn}>ส่ง</button>
      </div>

      <ChatActionSlider onMediaClick={() => setShowMedia(true)} />
      {showMedia && <MediaGalleryModal onClose={() => setShowMedia(false)} />}
    </div>
  );
}

const st = {
  container: { display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F8FAFC', position: 'relative', overflow: 'hidden' },
  callOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,30,60,0.95)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  callCard: { textAlign: 'center', color: 'white', width: '85%' },
  brandBadge: { backgroundColor: '#EAB308', color: '#003366', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block', marginBottom: '30px' },
  callerAvatar: { width: '110px', height: '110px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px', boxShadow: '0 0 20px rgba(234,179,8,0.5)' },
  callerName: { fontSize: '26px', margin: '10px 0', fontWeight: 'bold' },
  callType: { fontSize: '15px', opacity: 0.8, marginBottom: '50px' },
  callActions: { display: 'flex', justifyContent: 'space-around', width: '100%' },
  btnReject: { width: '65px', height: '65px', borderRadius: '50%', border: 'none', backgroundColor: '#EF4444', color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  btnAccept: { width: '65px', height: '65px', borderRadius: '50%', border: 'none', backgroundColor: '#22C55E', color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  yellowHeader: { height: '80px', backgroundColor: '#EAB308', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 15px', color: '#003366', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '10px', flex: 1 },
  headerRight: { display: 'flex', gap: '15px' },
  userInfo: { display: 'flex', flexDirection: 'column', flex: 1 },
  userName: { fontWeight: 'bold', fontSize: '15px' },
  numberInput: { backgroundColor: 'rgba(255,255,255,0.4)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '6px', padding: '5px 10px', fontSize: '13px', color: '#003366', marginTop: '4px', outline: 'none', width: '150px' },
  searchBox: { flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#FFF', borderRadius: '20px', padding: '5px 12px', marginRight: '10px' },
  searchInput: { flex: 1, border: 'none', outline: 'none', fontSize: '13px' },
  chatArea: { flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '70px' },
  otherMsgRow: { display: 'flex', justifyContent: 'flex-start' },
  myMsgRow: { display: 'flex', justifyContent: 'flex-end' },
  otherBubble: { backgroundColor: '#FFF', padding: '10px 14px', borderRadius: '18px 18px 18px 0', fontSize: '14px', maxWidth: '75%', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
  myBubble: { backgroundColor: '#003366', color: '#FFF', padding: '10px 14px', borderRadius: '18px 18px 0 18px', fontSize: '14px', maxWidth: '75%' },
  msgTime: { fontSize: '10px', opacity: 0.5, marginTop: '4px', textAlign: 'right' },
  imageContainer: { display: 'flex', flexDirection: 'column', gap: '5px' },
  chatImage: { maxWidth: '100%', maxHeight: '300px', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  imageActions: { display: 'flex', justifyContent: 'flex-end' },
  actionBtn: { fontSize: '10px', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', color: 'inherit', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' },
  // สไตล์สำหรับ Input Area ใหม่
  inputArea: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '70px', backgroundColor: '#FFF', display: 'flex', alignItems: 'center', padding: '0 15px', gap: '10px', borderTop: '1px solid #EEE' },
  iconBtn: { border: 'none', backgroundColor: 'transparent', color: '#003366', cursor: 'pointer' },
  mainInput: { flex: 1, height: '40px', borderRadius: '20px', border: '1px solid #DDD', padding: '0 15px', outline: 'none', fontSize: '14px' },
  sendBtn: { border: 'none', backgroundColor: '#003366', color: '#FFF', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' },
  spinning: { animation: 'spin 1s linear infinite' }, // แอนิเมชันโหลดรูป
};

// เพิ่ม CSS สำหรับแอนิเมชัน Loader ลงในไฟล์ (หรือใส่ใน index.css)
const styleSheet = document.styleSheets[0];
styleSheet.insertRule('@keyframes spin { 100% { transform: rotate(360deg); } }', styleSheet.cssRules.length);
