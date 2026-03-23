import React from 'react';
import ToolButton from './ToolButton';

export default function LocationBtn({ onSend }) {
  const shareLocation = () => {
    if (!navigator.geolocation) return alert("เครื่องคุณไม่รองรับ GPS");

    // เรียก API ขอตำแหน่งจริงจากมือถือ
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      onSend(`📍 พิกัดของฉัน: ${mapLink}`);
    }, (err) => alert("กรุณาเปิด GPS"), { enableHighAccuracy: true });
  };

  return <ToolButton icon="📍" label="แชร์ตำแหน่ง" onClick={shareLocation} />;
}
