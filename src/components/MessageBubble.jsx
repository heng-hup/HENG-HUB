import React, { useState, useRef, useEffect } from 'react';
import { st } from '../styles/chatStyles';

export default function MessageBubble({ 
  m, 
  onContextMenu, // ฟังก์ชันหลักที่แม่ส่งมาเพื่อเปิดเมนู
  onOpenImageViewer 
}) {
  const [fullImage, setFullImage] = useState(null);
  const isMe = m.sender === 'me';
  const hasMedia = m.sticker || m.image || m.file;
  
  // ✅ Refs สำหรับจับการกดค้าง (Long Press) บนมือถือให้แม่นยำ
  const timerRef = useRef(null);
  const bubbleRef = useRef(null);
  const isLongPress = useRef(false);

  // ✅ ฟังก์ชันจัดการ Context Menu (World-Class Precision)
  // จะถูกเรียกใช้ทั้งจาก Long Press และ Right Click
  const handleContextMenu = (e) => {
    e.preventDefault(); // กันเมนูบราวเซอร์เดิมขึ้น
    e.stopPropagation(); // ✅ สำคัญที่สุด: กันไม่ให้ Event ไหลไปโดนพื้นหลัง

    // ตรวจสอบว่าจุดที่กดคือเนื้อหาจริงๆ ไม่ใช่ช่องว่างในกล่อง
    const target = e.target;
    if (target === bubbleRef.current || bubbleRef.current.contains(target)) {
      onContextMenu(e, m); // เปิดเมนูระดับโลก
    }
  };

  // ✅ จับ Touch Events สำหรับ Long Press (มือถือ)
  const handleTouchStart = (e) => {
    e.stopPropagation(); // ✅ กันไม่ให้โดนพื้นหลัง
    isLongPress.current = false;
    // ตั้งเวลา 500ms ถ้ากดค้างถึงถือว่าเป็น Long Press
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      handleContextMenu(e); // เรียกใช้ฟังก์ชันเปิดเมนูตัวเดียวกัน
    }, 500);
  };

  const handleTouchEnd = (e) => {
    // ถ้าปล่อยนิ้วก่อน 500ms ให้ยกเลิก Timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // ถ้าเป็นการกดค้างสำเร็จแล้ว (isLongPress=true)
    // กันไม่ให้ Event อื่นๆ (เช่น Click) ทำงานต่อ
    if (isLongPress.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // ✅ Cleanup Timer เมื่อ Component ถูกทำลาย
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const downloadMedia = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl; link.download = `HENG_${Date.now()}.jpg`;
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) { console.error("Save failed", err); }
  };

  return (
    <>
      {/* 1. Main Container: จัด Layout หลักให้สมดุลระดับมืออาชีพ */}
      <div style={{
        display: 'flex',
        flexDirection: isMe ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        marginBottom: '16px',
        padding: isMe ? '0 12px 0 60px' : '0 60px 0 12px', // ✅ ปรับ Padding ให้ชิดขอบนอกมากขึ้นแต่ยังสมดุล
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        // ❌ ห้ามใส่ Context Menu Event ที่นี่ เพราะคือพื้นที่ว่างพื้นหลัง
      }}>
        
        {/* 2. เนื้อหาแชท: จำกัดความกว้างเพื่อความสวยงาม ( maxWidth ) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
          
          {/* สติ๊กเกอร์: พื้นหลังใสเสมอ */}
          {m.sticker && (
            <div 
              ref={bubbleRef} // ✅ ใส่ Ref เพื่อจับ Event
              onContextMenu={handleContextMenu} // คลิกขวาบนคอม
              onTouchStart={handleTouchStart}   // กดค้างบนมือถือ
              onTouchEnd={handleTouchEnd}
              style={{ marginBottom: '4px', cursor: 'pointer', WebkitTouchCallout: 'none' /* กันเมนู iOS */ }}
            >
              <img src={m.sticker} alt="sticker" style={{ width: '130px', height: '130px', display: 'block', objectFit: 'contain' }} />
            </div>
          )}

          {/* กล่องข้อความ/รูปภาพ/ไฟล์ */}
          {!m.sticker && (
            <div 
              ref={bubbleRef} // ✅ ใส่ Ref เพื่อจับ Event ให้แม่นยำเฉพาะตรงนี้
              onContextMenu={handleContextMenu} // คลิกขวาบนคอม
              onTouchStart={handleTouchStart}   // กดค้างบนมือถือ
              onTouchEnd={handleTouchEnd}
              style={{
                ...st.bubble,
                position: 'relative',
                background: hasMedia ? 'transparent' : (isMe ? '#007AFF' : '#FFF'),
                color: isMe ? '#FFF' : '#000',
                padding: hasMedia ? '0px' : '12px 16px',
                borderRadius: '18px',
                boxShadow: hasMedia ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                WebkitTouchCallout: 'none', // ✅ สำคัญมากสำหรับมือถือ กันเมนูเดิมขึ้น
                userSelect: 'none' // ✅ สำคัญมากสำหรับมือถือ กันการคลุมดำตอนกดค้าง
              }}>
              
              {/* รูปภาพ */}
              {m.image && (
                <img src={m.image} alt="uploaded" style={{ maxWidth: '100%', borderRadius: '14px', display: 'block' }} onClick={() => setFullImage(m.image)} />
              )}
              
              {/* ข้อความ */}
              {m.text && <span style={{ fontSize: '15px', lineHeight: '1.4' }}>{m.text}</span>}
            </div>
          )}

          {/* ปุ่มดาวน์โหลด: ชัดเจนระดับมืออาชีพ */}
          {m.image && (
            <div onClick={() => downloadMedia(m.image)} style={{ marginTop: '6px', cursor: 'pointer', textAlign: isMe ? 'right' : 'left' }}>
              <div style={{ fontSize: '24px' }}>📥</div>
              <div style={{ fontSize: '9px', color: '#888' }}>กดเพื่อดาวน์โหลดลงเครื่อง</div>
            </div>
          )}
        </div>

        {/* 3. เวลาส่ง: สมดุลระดับโลก วางข้างแชทเสมอ */}
        <div style={{
          fontSize: '11px',
          color: '#999',
          margin: isMe ? '0 8px 4px 0' : '0 0 4px 8px', 
          alignSelf: 'flex-end',
          whiteSpace: 'nowrap',
          pointerEvents: 'none' // ✅ สำคัญ: เวลาห้ามรับ Event เมนู
        }}>
          {m.time}
        </div>
      </div>

      {/* หน้าจอขยายรูปใหญ่: คลีนที่สุด เหลือแค่ ✕ */}
      {fullImage && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000', zIndex: 10000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px' }} onClick={() => setFullImage(null)}>
            <div style={{ fontSize: '38px', color: '#FFF', cursor: 'pointer' }}>✕</div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={fullImage} alt="Full view" style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
          </div>
        </div>
      )}
    </>
  );
}
