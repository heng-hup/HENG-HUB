import React from 'react';
import { st } from '../styles/chatStyles';

export default function MessageBubble({ m, isSearching, searchTerm, onContextMenu }) {
  return (
    <div 
      onContextMenu={(e) => onContextMenu(e, m)} 
      // เพิ่ม tabIndex เพื่อให้ Element นี้สามารถถูก Focus ได้ (ช่วยเรื่องจุดลากบนมือถือ)
      tabIndex={0}
      style={{
        ...st.bubble, 
        position: 'relative',
        // ✅ ถ้าเป็นสติ๊กเกอร์ ให้พื้นหลังโปร่งใส ถ้าเป็นข้อความปกติให้ใช้สีตาม Sender
        background: m.sticker ? 'transparent' : (m.sender === 'me' ? '#007AFF' : '#FFF'), 
        color: m.sender === 'me' ? '#FFF' : '#000',
        // ✅ ขอบสีทองเวลาค้นหาเจอ
        border: isSearching && searchTerm && m.text?.toLowerCase().includes(searchTerm.toLowerCase()) 
          ? '2px solid #FFD700' 
          : 'none',
        // ✅ เปิดโหมดให้ลากคลุมดำได้
        userSelect: 'text',
        WebkitUserSelect: 'text',
        padding: m.sticker ? '5px' : '10px 15px',
        boxShadow: m.sticker ? 'none' : '0 2px 5px rgba(0,0,0,0.1)',
        outline: 'none',
        cursor: 'text'
      }}
    >
      {/* 1. ส่วนแสดงการตอบกลับ (Reply) */}
      {m.replyData && (
        <div style={{
          fontSize: '11px', 
          opacity: 0.7, 
          borderLeft: '2px solid', 
          paddingLeft: '5px', 
          marginBottom: '5px',
          color: m.sender === 'me' ? '#EEE' : '#666'
        }}>
          {m.replyData.text}
        </div>
      )}

      {/* 2. ส่วนแสดงสติ๊กเกอร์ (ถ้ามีค่า sticker จะแสดงรูปทันที) */}
      {m.sticker && (
        <img 
          src={m.sticker} 
          alt="sticker" 
          style={{ 
            width: '120px', 
            height: '120px', 
            display: 'block', 
            borderRadius: '10px',
            marginBottom: '5px',
            objectFit: 'contain'
          }} 
          draggable="false"
        />
      )}
      
      {/* 3. ส่วนแสดงข้อความ (ใส่ ID ไว้สำหรับฟังก์ชัน "คัดลอกบางส่วน" เพื่อสั่งไฮไลท์) */}
      {m.text && (
        <span 
          id={`msg-text-${m.id}`} 
          style={{ 
            display: 'inline-block', 
            wordBreak: 'break-word',
            userSelect: 'text', 
            WebkitUserSelect: 'text' 
          }}
        >
          {m.text}
        </span>
      )}

      {/* 4. ส่วนแสดง Emoji Reaction (ที่กดค้างเลือกหัวใจ/ยิ้ม) */}
      {m.emoji && (
        <div style={{ 
          position: 'absolute', 
          bottom: '-15px', 
          right: '5px', 
          fontSize: '16px', 
          background: '#FFF', 
          borderRadius: '10px', 
          padding: '2px 5px', 
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          zIndex: 10
        }}>
          {m.emoji}
        </div>
      )}

      {/* 5. ส่วนแสดงเวลาส่งข้อความ */}
      <div style={{
        ...st.timeText,
        color: m.sticker ? '#888' : (m.sender === 'me' ? 'rgba(255,255,255,0.8)' : '#999'),
        marginTop: '4px',
        textAlign: 'right'
      }}>
        {m.time}
      </div>
    </div>
  );
}
