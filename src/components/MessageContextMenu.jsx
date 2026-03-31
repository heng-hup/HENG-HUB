import React from 'react';
import { st } from '../styles/chatStyles';
import { Plus } from 'lucide-react';

export default function MessageContextMenu({ x, y, msg, onAction, onEmoji }) {
  const emojis = ['👍', '❤️', '😆', '😮', '😢', '😡', '🙏', '🔥', '✨'];

  // --- [ส่วนคำนวณตำแหน่งใหม่ เพื่อไม่ให้เมนูแหว่งหรือตกขอบ] ---
  const menuWidth = 320;
  const screenWidth = window.innerWidth;
  
  // ปรับ x ให้เมนูอยู่กลางนิ้ว และไม่หลุดขอบจอซ้าย-ขวา
  let adjustedX = x - (menuWidth / 2); 
  if (adjustedX + menuWidth > screenWidth) adjustedX = screenWidth - menuWidth - 20;
  if (adjustedX < 20) adjustedX = 20;

  // ปรับ y ให้เมนูเด้งขึ้นมาทับข้อความพอดี (ไม่จมลงข้างล่าง)
  const adjustedY = y - 100; 

  const actions = [
    { id: 'copy_all', label: 'คัดลอกทั้งหมด', icon: '📋' },
    { id: 'translate', label: 'แปลข้อความ', icon: '🌐' }, 
    { id: 'note', label: 'บันทึกช่วยจำ', icon: '📔' },
    { id: 'delete_local', label: 'ลบข้อความ', icon: '🗑️' },
    { id: 'reply', label: 'ตอบกลับ', icon: '↩️' },
    { id: 'share', label: 'แชร์', icon: '🔄' },
    { id: 'pin', label: 'ปักหมุด', icon: '📌' },
    { id: 'capture', label: 'จับภาพ', icon: '🔍' },
  ];

  return (
    <div 
      style={{
        ...st.whiteMenu, 
        position: 'fixed', // ใช้ fixed เพื่อให้ลอยทับ Header และทุกอย่าง
        left: `${adjustedX}px`, 
        top: `${adjustedY}px`, 
        width: `${menuWidth}px`, 
        zIndex: 999999, // ดันให้สูงที่สุดเพื่อแก้ปัญหาเมนูจม
        backgroundColor: '#FFF',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        paddingBottom: '10px'
      }} 
      onClick={(e) => e.stopPropagation()}
    >
      
      {/* 1. ส่วน Emoji - กดแล้วจะส่ง emoji และปิดเมนูทันที */}
      <div style={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '15px 12px',
        borderBottom: '1px solid #F2F2F2'
      }}>
        {emojis.map(e => (
          <span 
            key={e} 
            style={{ cursor: 'pointer', fontSize: '24px' }} 
            onClick={() => { 
              onEmoji(e, msg.msgId); 
              onAction('close_menu_only'); 
            }} 
          >
            {e}
          </span>
        ))}
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid #EEE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Plus size={18} color="#CCC" />
        </div>
      </div>

      {/* 2. ส่วนปุ่ม Grid (4 คอลัมน์) ตามดีไซน์ HENG HENG */}
      <div style={{
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '15px', 
        padding: '20px 15px',
        textAlign: 'center'
      }}>
        {actions.map(item => (
          <div 
            key={item.id} 
            style={{ cursor: 'pointer' }} 
            onClick={(e) => {
              e.stopPropagation();
              onAction(item.id, { ...msg, msgText: msg.msgText || msg.content });
              onAction('close_menu_only'); 
            }}
          >
            <div style={{
              fontSize: '24px', marginBottom: '8px', backgroundColor: '#F8F9FA', 
              padding: '12px', borderRadius: '16px', border: '1px solid #F0F0F0'
            }}>{item.icon}</div>
            <div style={{ fontSize: '11px', color: '#444', fontWeight: '600' }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* 3. ส่วน "ยกเลิกส่งข้อความ" (สีแดงพรีเมียม) */}
      <div 
        style={{
          margin: '5px 15px 10px 15px', padding: '15px', borderRadius: '18px',
          backgroundColor: '#FFF5F5', display: 'flex', justifyContent: 'center', 
          alignItems: 'center', cursor: 'pointer', border: '1px solid #FFEBEB'
        }}
        onClick={(e) => { 
          e.stopPropagation(); 
          onAction('unsend', { msgId: msg.msgId }); 
          onAction('close_menu_only'); 
        }}
      >
        <span style={{ fontSize: '22px', marginRight: '12px' }}>🚫</span>
        <span style={{ color: '#FF4D4D', fontWeight: 'bold', fontSize: '16px' }}>ยกเลิกส่งข้อความ</span>
      </div>
    </div>
  );
}
