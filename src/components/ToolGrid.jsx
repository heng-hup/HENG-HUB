import React from 'react';
import { st } from '../styles/chatStyles';
import { 
  Pin, Gift, Folder, Users, Calendar, 
  FileText, Calculator, MapPin, Mail, UserPlus 
} from 'lucide-react'; 

export default function ToolGrid({ onAction }) {
  
  const tools = [
    // แถวบน (5 ปุ่ม)
    { id: 1, label: 'ปักหมุด', icon: <Pin size={24} />, action: 'pin_view', type: 'action' },
    { id: 2, label: 'ของขวัญ', icon: <Gift size={24} />, action: 'send_gift', type: 'action' }, 
    { id: 3, label: 'สื่อ/ไฟล์', icon: <Folder size={24} />, action: 'media', type: 'action' },
    // ✅ แก้ไข action ให้ตรงกับ chat.jsx (เดิมเป็น contact_picker)
    { id: 4, label: 'รายชื่อ', icon: <Users size={24} />, action: 'open_contacts', type: 'action' }, 
    { id: 5, label: 'ปฏิทิน', icon: <Calendar size={24} />, action: 'calendar', type: 'action' },
    
    // แถวล่าง (5 ปุ่ม)
    { id: 6, label: 'ส่งไฟล์', icon: <FileText size={24} />, action: 'open_file', type: 'action' },
    { id: 7, label: 'คิดเลข', icon: <Calculator size={24} />, action: 'calculator', type: 'action' },
    { id: 8, label: 'ตำแหน่ง', icon: <MapPin size={24} />, action: 'open_map', type: 'action' },
    // ✅ แก้ไข action ให้ตรงกับ chat.jsx (เดิมเป็น note)
    { id: 9, label: 'เมลล์', icon: <Mail size={24} />, action: 'open_mail', type: 'action' }, 
    { id: 10, label: 'สร้างกลุ่ม', icon: <UserPlus size={24} />, action: 'create_group', type: 'action' },
  ];

  return (
    <div style={st.toolsGrid}>
      {tools.map((tool) => (
        <div 
          key={tool.id} 
          style={st.toolItem} 
          onClick={() => {
            // ส่ง Action กลับไปที่ไฟล์หลัก (HengHengSuperApp)
            onAction(tool.action);
          }}
        >
          <div style={st.iconCircle}>
            {/* บังคับสีไอคอนให้เป็นสีทอง #FFD700 ตามธีมแอปพี่ */}
            {React.cloneElement(tool.icon, { color: "#FFD700" })}
          </div>
          <span style={st.toolLabel}>{tool.label}</span>
        </div>
      ))}
    </div>
  );
}
