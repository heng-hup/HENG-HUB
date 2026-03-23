import React from 'react';
import ToolButton from './ToolButton';

export default function GiftBtn({ onSend }) {
  
  const handleSendGift = () => {
    // จำลองรายการของขวัญมงคลตามธีม HENG
    const gifts = [
      { name: '🧧 ซองแดงนำโชค', value: '888 P' },
      { name: '🎁 กล่องสุ่มเศรษฐี', value: '1,000 P' },
      { name: '💎 เพชรเจ็ดสี', value: '500 P' },
      { name: '💰 ถุงทองเรียกทรัพย์', value: '9,999 P' }
    ];

    // สุ่มเลือกของขวัญ 1 ชิ้น
    const randomGift = gifts[Math.floor(Math.random() * gifts.length)];

    // ยืนยันก่อนส่ง
    const confirmSend = window.confirm(`คุณต้องการส่ง "${randomGift.name}" ให้เพื่อนใช่หรือไม่?`);

    if (confirmSend) {
      // ส่งข้อมูลในรูปแบบพิเศษเพื่อให้ระบบแชทแยกแยะได้
      const giftMessage = `🎁 [GIFT] คุณได้รับของขวัญพิเศษ!\n━━━━━━━━━━━━━━\nไอเทม: ${randomGift.name}\nมูลค่า: ${randomGift.value}\n━━━━━━━━━━━━━━\n(กดที่ข้อความเพื่อรับของรางวัล)`;
      
      onSend(giftMessage);
    }
  };

  return (
    <ToolButton 
      icon="🎁" 
      label="ส่งของขวัญ" 
      onClick={handleSendGift} 
    />
  );
}
