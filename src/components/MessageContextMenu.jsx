import React from 'react';
import { st } from '../styles/chatStyles';
import { Plus } from 'lucide-react';

export default function MessageContextMenu({ x, y, msg, onAction, onEmoji }) {
  const emojis = ['👍', '❤️', '😆', '😮', '😢', '😡', '🙏', '🔥', '✨'];

  // รวม Action ทั้งหมดที่พี่ต้องการไว้ใน Grid
  const actions = [
    { id: 'copy_all', label: 'คัดลอกทั้งหมด', icon: '📋' },
    { id: 'translate', label: 'แปลข้อความ', icon: '🌐' }, 
    { id: 'note', label: 'บันทึกช่วยจำ', icon: '📔' },
    { id: 'delete_local', label: 'ลบข้อความ', icon: '🗑️' }, // ✨ ลบเฉพาะฝั่งเรา
    { id: 'reply', label: 'ตอบกลับ', icon: '↩️' },
    { id: 'share', label: 'แชร์', icon: '🔄' },
    { id: 'pin', label: 'ปักหมุด', icon: '📌' },
    { id: 'capture', label: 'จับภาพ', icon: '🔍' },
  ];

  return (
    <div 
      style={{
        ...st.whiteMenu, 
        position: 'fixed', 
        left: x, 
        top: y, 
        width: '320px', 
        zIndex: 10000, 
        backgroundColor: '#FFF',
        borderRadius: '20px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
      }} 
      onClick={(e) => e.stopPropagation()}
    >
      
      {/* 1. ส่วน Emoji */}
      <div style={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '12px 10px',
        borderBottom: '1px solid #F0F0F0'
      }}>
        {emojis.map(e => (
          <span 
            key={e} 
            style={{ cursor: 'pointer', fontSize: '22px' }} 
            onClick={() => { 
              onEmoji(e); 
              onAction('close_menu_only'); 
            }} 
          >
            {e}
          </span>
        ))}
        <div style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1.5px solid #E5E5E5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Plus size={16} color="#BDBDBD" />
        </div>
      </div>

      {/* 2. ส่วนปุ่ม Grid (4 คอลัมน์) */}
      <div style={{
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '12px', 
        padding: '15px',
        textAlign: 'center'
      }}>
        {actions.map(item => (
          <div 
            key={item.id} 
            style={{cursor: 'pointer'}} 
            onClick={(e) => {
              e.stopPropagation();
              // ✅ ส่งทั้ง id และ text ให้ครบตามที่ไฟล์หลักรอรับ
              onAction(item.id, { msgId: msg.msgId, msgText: msg.msgText });
              onAction('close_menu_only'); 
            }}
          >
            <div style={{
              fontSize: '22px', marginBottom: '6px', backgroundColor: '#F9F9FB', 
              padding: '10px', borderRadius: '14px', border: '1px solid #F0F0F2'
            }}>{item.icon}</div>
            <div style={{fontSize: '10px', color: '#4A4A4A', fontWeight: '500'}}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* 3. ส่วน "ยกเลิกข้อความ" (แดงเด่นๆ ด้านล่าง) */}
      <div 
        style={{
          margin: '0 15px 15px 15px', padding: '14px', borderRadius: '18px',
          backgroundColor: '#FFF5F5', display: 'flex', justifyContent: 'center', 
          alignItems: 'center', cursor: 'pointer', border: '1px solid #FFEBEB'
        }}
        onClick={(e) => { 
          e.stopPropagation(); 
          // ✅ ใช้ ID 'unsend' เพื่อแยก Logic กับการลบปกติ
          onAction('unsend', { msgId: msg.msgId }); 
          onAction('close_menu_only'); 
        }}
      >
        <span style={{fontSize: '22px', marginRight: '12px'}}>🚫</span>
        <span style={{color: '#FF4D4D', fontWeight: 'bold', fontSize: '15px'}}>ยกเลิกส่งข้อความ </span>
      </div>
    </div>
  );
}
