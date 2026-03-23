import React from 'react';
import ToolButton from './ToolButton';

export default function ContactBtn({ onSend }) {
  const getContact = async () => {
    try {
      if ('contacts' in navigator) {
        // เรียก Native Contact Picker
        const contacts = await navigator.contacts.select(['name', 'tel']);
        if (contacts.length) onSend(`👤 รายชื่อ: ${contacts[0].name} (${contacts[0].tel[0]})`);
      } else {
        alert("เบราว์เซอร์ไม่รองรับการดึงรายชื่อ");
      }
    } catch (e) { console.log(e); }
  };

  return <ToolButton icon="👤" label="ส่งรายชื่อ" onClick={getContact} />;
}
