import React, { useState } from 'react';
import { 
  Search, Phone, Video, MoreVertical, ArrowLeft, X 
} from 'lucide-react';

// 1. Import หน้าจอต่างๆ ที่อยู่ในเครื่องพี่
import MediaGalleryModal from './MediaGalleryModal'; 
import ChatActionSlider from './ChatActionSlider'; 

export default function ChatBox({ onBack }) {
  // 3. State สำหรับเปิด/ปิด หน้าจอสื่อ
  const [showMedia, setShowMedia] = useState(false);
  
  // 🔍 State สำหรับระบบค้นหาข้อความแชทในห้อง
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // ข้อมูลแชท (ส่วนนี้พี่อาจจะใช้ข้อมูลจริงจากเครื่องพี่มาใส่แทนนะครับ)
  const [messages] = useState([
    { id: 1, text: 'สวัสดีครับพี่ ยินดีต้อนรับสู่ HENG HENG', sender: 'other', time: '10:00' },
    { id: 2, text: 'กดที่ปุ่ม + ด้านล่างเพื่อดูไฟล์สื่อนะครับ', sender: 'other', time: '10:01' },
    { id: 3, text: 'รับทราบครับผม', sender: 'me', time: '10:05' },
  ]);

  // ✅ ระบบกรองข้อความเวลาพิมพ์ค้นหา
  const filteredMessages = messages.filter(msg => 
    msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={st.container}>
      {/* --- 🟡 Header แถบสีเหลือง (รวมปุ่มค้นหาและปุ่มโทร) --- */}
      <div style={st.yellowHeader}>
        <div style={st.headerLeft}>
          <ArrowLeft size={22} onClick={onBack} style={{ cursor: 'pointer' }} />
          
          {!isSearching ? (
            <div style={st.userInfo}>
              <span style={st.userName}>HENG HENG</span>
              <span style={st.userStatus}>ออนไลน์</span>
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

        <div style={st.headerRight}>
          {!isSearching && (
            <Search size={22} onClick={() => setIsSearching(true)} style={{ cursor: 'pointer' }} />
          )}
          <Phone size={22} style={{ cursor: 'pointer' }} />
          <Video size={22} style={{ cursor: 'pointer' }} />
          <MoreVertical size={22} style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* --- 💬 พื้นที่แชท --- */}
      <div style={st.chatArea}>
        {filteredMessages.length > 0 ? filteredMessages.map(msg => (
          <div key={msg.id} style={msg.sender === 'me' ? st.myMsgRow : st.otherMsgRow}>
            <div style={msg.sender === 'me' ? st.myBubble : st.otherBubble}>
              {msg.text}
              <div style={st.msgTime}>{msg.time}</div>
            </div>
          </div>
        )) : (
          <div style={st.noResult}>ไม่พบข้อความที่ค้นหา...</div>
        )}
      </div>

      {/* 4. ส่วน Slider ด้านล่าง (ส่งฟังก์ชันเปิด Media ให้ปุ่มทำงาน) */}
      <ChatActionSlider onMediaClick={() => setShowMedia(true)} />

      {/* 5. หน้าจอ Modal สื่อ/ไฟล์ (จะแสดงเมื่อ showMedia เป็น true) */}
      {showMedia && (
        <MediaGalleryModal onClose={() => setShowMedia(false)} />
      )}
    </div>
  );
}

const st = {
  container: { display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F8FAFC', position: 'relative' },
  yellowHeader: { height: '60px', backgroundColor: '#EAB308', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 15px', color: '#003366' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '10px', flex: 1 },
  headerRight: { display: 'flex', gap: '15px' },
  userInfo: { display: 'flex', flexDirection: 'column' },
  userName: { fontWeight: 'bold', fontSize: '15px' },
  userStatus: { fontSize: '10px', opacity: 0.8 },
  searchBox: { flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#FFF', borderRadius: '20px', padding: '5px 10px', marginRight: '10px' },
  searchInput: { flex: 1, border: 'none', outline: 'none', fontSize: '13px', color: '#003366' },
  chatArea: { flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
  otherMsgRow: { display: 'flex', justifyContent: 'flex-start' },
  myMsgRow: { display: 'flex', justifyContent: 'flex-end' },
  otherBubble: { backgroundColor: '#FFF', padding: '8px 12px', borderRadius: '15px 15px 15px 0', fontSize: '14px', maxWidth: '75%', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
  myBubble: { backgroundColor: '#003366', color: '#FFF', padding: '8px 12px', borderRadius: '15px 15px 0 15px', fontSize: '14px', maxWidth: '75%' },
  msgTime: { fontSize: '9px', opacity: 0.6, marginTop: '4px', textAlign: 'right' },
  noResult: { textAlign: 'center', marginTop: '20px', color: '#94A3B8', fontSize: '12px' }
};
