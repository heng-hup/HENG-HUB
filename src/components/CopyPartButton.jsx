import React from 'react';

export default function CopyPartButton({ msg, onAction }) {
  const handleCopyPart = (e) => {
    e.stopPropagation();
    const elementId = `msg-text-${msg.id}`;
    const targetElement = document.getElementById(elementId);
    
    if (targetElement) {
      // 1. สร้าง Range เลือกข้อความ
      const range = document.createRange();
      const selection = window.getSelection();
      selection.removeAllRanges();
      range.selectNodeContents(targetElement);
      selection.addRange(range);

      // 🔥 2. เทคนิคแบบ LINE: เปิดโหมดแก้ไขชั่วคราวแล้ว Focus 
      // เพื่อให้เมนูระบบ (Copy/Paste) ของ iOS/Android เด้งขึ้นมาทันที
      targetElement.setAttribute('contenteditable', 'true');
      targetElement.focus();
      
      // 3. ปิดโหมดแก้ไขทันที (เพื่อไม่ให้แป้นพิมพ์เด้งขึ้นมาบัง)
      setTimeout(() => {
        targetElement.removeAttribute('contenteditable');
      }, 50); 

      console.log("Selection active & System Menu triggered");
    }

    // 4. ส่งสัญญาณไปปิดเมนู Context Menu สีขาวในไฟล์แม่
    if (onAction) onAction('copy_part', msg);
  };

  return (
    <div style={{ cursor: 'pointer' }} onClick={handleCopyPart}>
      <div style={{
        fontSize: '22px', marginBottom: '6px', backgroundColor: '#F9F9FB', 
        padding: '10px', borderRadius: '14px', border: '1px solid #F0F0F2',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        ✂️
      </div>
      <div style={{ fontSize: '10px', color: '#4A4A4A', fontWeight: '500' }}>
        คัดลอกบางส่วน
      </div>
    </div>
  );
}
