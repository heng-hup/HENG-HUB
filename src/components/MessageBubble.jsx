import React, { useState, useRef, useEffect } from 'react';
import { st } from '../styles/chatStyles';

export default function MessageBubble({ 
  m, 
  onContextMenu, 
  onOpenImageViewer 
}) {
  const [fullImage, setFullImage] = useState(null);
  const isMe = m.sender === 'me';
  const hasMedia = m.sticker || m.image || m.file;
  
  const timerRef = useRef(null);
  const bubbleRef = useRef(null);
  const isLongPress = useRef(false);

  // ✅ ฟังก์ชันเปิดเมนู (คงเดิม)
  const handleContextMenu = (e) => {
    if (e.cancelable) e.preventDefault();
    e.stopPropagation();

    const target = e.target;
    if (bubbleRef.current && (target === bubbleRef.current || bubbleRef.current.contains(target))) {
      onContextMenu(e, m);
    }
  };

  // ✅ จับ Touch Start (คงเดิม)
  const handleTouchStart = (e) => {
    e.stopPropagation();
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      handleContextMenu(e);
    }, 500); 
  };

  // ✅ จับ Touch Move (คงเดิม)
  const handleTouchMove = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // ✅ จับ Touch End (คงเดิม)
  const handleTouchEnd = (e) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isLongPress.current) {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const downloadMedia = async (url, fileName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl; 
      link.download = fileName || `HENG_${Date.now()}.jpg`;
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) { console.error("Save failed", err); }
  };

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: isMe ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        marginBottom: '16px',
        padding: isMe ? '0 12px 0 60px' : '0 60px 0 12px',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
      }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
          
          {/* 1. สติ๊กเกอร์ */}
          {m.sticker && (
            <div 
              ref={bubbleRef}
              onContextMenu={handleContextMenu}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ marginBottom: '4px', cursor: 'pointer', WebkitTouchCallout: 'none' }}
            >
              <img src={m.sticker} alt="sticker" style={{ width: '130px', height: '130px', display: 'block', objectFit: 'contain' }} />
            </div>
          )}

          {/* 2. กล่องข้อความ / รูปภาพ / ไฟล์ */}
          {!m.sticker && (
            <div 
              ref={bubbleRef}
              onContextMenu={handleContextMenu}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                ...st.bubble,
                position: 'relative',
                // ✅ ปรับสีน้ำเงินเข้มและสีเทานวลตามรูป
                background: hasMedia && !m.text ? 'transparent' : (isMe ? '#0055FF' : '#E4E6EB'),
                color: isMe ? '#FFF' : '#050505',
                padding: hasMedia && !m.text ? '0px' : '12px 16px',
                borderRadius: '18px',
                boxShadow: hasMedia && !m.text ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                WebkitTouchCallout: 'none',
                userSelect: 'none'
              }}>
              
              {m.image && (
                <img 
                  src={m.image} 
                  alt="uploaded" 
                  style={{ maxWidth: '100%', borderRadius: '14px', display: 'block', marginBottom: m.text ? '8px' : '0' }} 
                  onClick={() => setFullImage(m.image)} 
                />
              )}

              {m.file && (
                <div 
                  onClick={() => window.open(m.file.url, '_blank')}
                  style={{
                    display: 'flex', alignItems: 'center', padding: '10px',
                    background: isMe ? 'rgba(255,255,255,0.2)' : '#F0F0F0',
                    borderRadius: '12px', marginBottom: m.text ? '8px' : '0'
                  }}
                >
                  <span style={{ fontSize: '24px', marginRight: '8px' }}>📄</span>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '13px', fontWeight: '500', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{m.file.name}</div>
                    <div style={{ fontSize: '11px', opacity: 0.7 }}>{m.file.size}</div>
                  </div>
                </div>
              )}
              
              {m.text && <span style={{ fontSize: '15px', lineHeight: '1.4', wordBreak: 'break-word' }}>{m.text}</span>}
            </div>
          )}

          {m.image && (
            <div onClick={() => downloadMedia(m.image)} style={{ marginTop: '6px', cursor: 'pointer', textAlign: isMe ? 'right' : 'left' }}>
              <span style={{ fontSize: '18px' }}>📥</span>
              <span style={{ fontSize: '10px', color: '#888', marginLeft: '4px' }}>บันทึกรูป</span>
            </div>
          )}
        </div>

        <div style={{
          fontSize: '11px', color: '#999',
          margin: isMe ? '0 8px 4px 0' : '0 0 4px 8px', 
          alignSelf: 'flex-end', whiteSpace: 'nowrap', pointerEvents: 'none'
        }}>
          {m.time}
        </div>
      </div>

      {fullImage && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000', zIndex: 10000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', textAlign: 'right' }} onClick={() => setFullImage(null)}>
            <span style={{ fontSize: '30px', color: '#FFF', cursor: 'pointer' }}>✕</span>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
            <img src={fullImage} alt="Full view" style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
          </div>
        </div>
      )}
    </>
  );
}
