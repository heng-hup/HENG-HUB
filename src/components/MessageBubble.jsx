import React, { useState, useRef } from 'react';
import { st } from '../styles/chatStyles';

export default function MessageBubble({ 
  m, 
  onDeleteMessage, 
  onContextMenu, // รับฟังก์ชันจัดการเมนูมาจากตัวแม่
  onExtractText 
}) {
  const [fullImage, setFullImage] = useState(null);
  const isMe = m.sender === 'me';
  const hasMedia = m.sticker || m.image || m.file;
  
  // ✅ ระบบจับการกดค้าง (Long Press) สำหรับมือถือ
  const timerRef = useRef(null);
  const handleTouchStart = (e) => {
    timerRef.current = setTimeout(() => onContextMenu(e, m), 500);
  };
  const handleTouchEnd = () => clearTimeout(timerRef.current);

  const downloadMedia = async (url, fileName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName || `HENG_SAVE_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) { console.error("Save failed", err); }
  };

  return (
    <>
      <div 
        // ✅ คลิกขวาบนคอม
        onContextMenu={(e) => onContextMenu(e, m)}
        // ✅ กดค้างบนมือถือ
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          display: 'flex',
          flexDirection: isMe ? 'row-reverse' : 'row',
          alignItems: 'flex-end',
          marginBottom: '20px',
          padding: '0 25px', 
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
          
          {/* สติ๊กเกอร์ (ขยับเข้าที่แล้ว) */}
          {m.sticker && (
            <div style={{ marginBottom: '5px' }}>
              <img src={m.sticker} style={{ width: '130px', height: '130px', display: 'block', objectFit: 'contain' }} />
            </div>
          )}

          {/* เนื้อหาแชท */}
          {!m.sticker && (
            <div style={{
              ...st.bubble,
              position: 'relative',
              background: (m.image || m.file) ? 'transparent' : (isMe ? '#007AFF' : '#FFF'),
              color: isMe ? '#FFF' : '#000',
              padding: (m.image || m.file) ? '0px' : '12px 16px',
              borderRadius: '18px',
              boxShadow: (m.image || m.file) ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
            }}>
              {m.image && <img src={m.image} style={{ maxWidth: '100%', borderRadius: '14px', cursor: 'zoom-in' }} onClick={() => setFullImage(m.image)} />}
              {m.text && <span style={{ fontSize: '15px' }}>{m.text}</span>}
            </div>
          )}

          {/* ปุ่มดาวน์โหลดแจ้งชัดเจน */}
          {m.image && (
            <div onClick={() => downloadMedia(m.image)} style={{ marginTop: '8px', cursor: 'pointer', textAlign: isMe ? 'right' : 'left' }}>
              <div style={{ fontSize: '24px' }}>📥</div>
              <div style={{ fontSize: '9px', color: '#888' }}>กดเพื่อดาวน์โหลดลงเครื่อง</div>
            </div>
          )}
        </div>

        {/* เวลาข้างแชท */}
        <div style={{ fontSize: '11px', color: '#999', margin: isMe ? '0 10px 6px 0' : '0 0 6px 10px', alignSelf: 'flex-end' }}>
          {m.time}
        </div>
      </div>

      {/* หน้าจอใหญ่ มีแค่ กาปิด ✕ */}
      {fullImage && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000', zIndex: 10000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '25px' }} onClick={() => setFullImage(null)}>
            <div style={{ fontSize: '38px', color: '#FFF', cursor: 'pointer' }}>✕</div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={fullImage} style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
          </div>
        </div>
      )}
    </>
  );
}
