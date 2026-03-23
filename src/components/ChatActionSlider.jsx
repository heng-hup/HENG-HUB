import React from 'react';
// Import ตัวปุ่ม MediaBtn จากโฟลเดอร์ Tools
import MediaBtn from './Tools/MediaBtn';

// ✅ รับ Props ชื่อ onMediaClick มาจากหน้า ChatBox
export default function ChatActionSlider({ onMediaClick }) {
  return (
    <div style={st.sliderContainer}>
      {/* ... ปุ่มอื่นๆ ของพี่ เช่น ปุ่มรูปภาพ, ปุ่มของขวัญ ... */}
      
      {/* ✅ 6. ส่งต่อฟังก์ชัน onClick ไปให้ MediaBtn เพื่อให้กดแล้ว Modal เปิด */}
      <MediaBtn onClick={onMediaClick} />
      
      {/* ... ปุ่มอื่นๆ ... */}
    </div>
  );
}

const st = {
  sliderContainer: { 
    display: 'flex', 
    overflowX: 'auto', 
    padding: '10px 15px', 
    gap: '20px',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #E2E8F0',
    // ซ่อน scrollbar เพื่อความสวยงาม
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  }
};
