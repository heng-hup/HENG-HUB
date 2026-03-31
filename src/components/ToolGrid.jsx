import React from 'react';
import { 
  Mail, Users, Folder, Gift, 
  Calendar, MapPin, Calculator, Send, Utensils, 
  CloudSun, Bike, PhoneCall 
} from 'lucide-react';

export default function ToolGrid({ onSend }) {
  // ✅ รายชื่อ 12 ปุ่มเมนูหลักเท่านั้น (ไม่มีกล้อง/รูปภาพ เพราะแยกไปอยู่แถวบนแล้ว)
  const tools = [
    { icon: Mail, label: 'เมล์' },
    { icon: Users, label: 'รายชื่อ' },
    { icon: Folder, label: 'สื่อ/ไฟล์' },
    { icon: Gift, label: 'ของขวัญ' },
    { icon: Calendar, label: 'ปฏิทิน' },
    { icon: MapPin, label: 'ตำแหน่ง' },
    { icon: Calculator, label: 'คิดเลข' },
    { icon: Send, label: 'ส่งไฟล์' },
    { icon: Utensils, label: 'ร้านอาหาร' },
    { icon: CloudSun, label: 'อากาศ' },
    { icon: Bike, label: 'เรียกใช้รถ' },
    { icon: PhoneCall, label: 'โทรด่วน' }
  ];

  return (
    <div style={{ 
      backgroundColor: '#001F3F', 
      padding: '30px 20px', 
      borderTop: '1px solid #1a3a5a' 
    }}>
      {/* 📱 แสดงเฉพาะ Grid 12 ปุ่มเมนู */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '25px 20px' 
      }}>
        {tools.map((t, i) => (
          <div 
            key={i} 
            onClick={() => onSend(`ใช้งาน: ${t.label}`, 'action')} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '10px', 
              cursor: 'pointer' 
            }}
          >
            <div style={{ 
              width: '55px', 
              height: '55px', 
              borderRadius: '18px', 
              border: '1px solid #FFD700', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: 'rgba(255, 215, 0, 0.05)'
            }}>
              <t.icon size={26} color="#FFD700" />
            </div>
            <span style={{ color: '#FFF', fontSize: '13px' }}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
