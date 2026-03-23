import React from 'react';
import { Pin } from 'lucide-react'; 

const PinnedBtn = ({ onAction }) => {
  const handleClick = () => {
    // สั่ง Action ไปที่ Chat.jsx ให้เลิกย่อแถบปักหมุด (กางออก)
    if (onAction) {
      onAction('pin_view'); 
    }
  };

  return (
    <div onClick={handleClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: '5px' }}>
      <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(255, 215, 0, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #FFD700' }}>
        <Pin size={24} color="#FFD700" />
      </div>
      <span style={{ fontSize: '12px', color: '#FFF' }}>ข้อความที่ปักหมุด</span>
    </div>
  );
};

export default PinnedBtn;
