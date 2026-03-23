import React from 'react';
import { Folder } from 'lucide-react';
// ดึงสไตล์หลักของพี่มาใช้งาน
import { st } from '../../styles/chatStyles';

// ✅ รับ Props ชื่อ onClick เพื่อเชื่อมโยงการเปิด Modal จากหน้า ChatBox
export default function MediaBtn({ onClick }) {
  return (
    <div 
      style={{ ...st.toolItem, cursor: 'pointer' }} 
      onClick={onClick}
    >
      <div style={st.iconCircle}>
        {/* ใช้ไอคอน Folder สีทองตามธีม HENG HENG */}
        <Folder size={24} color="#FFD700" fill="#FFD700" fillOpacity={0.2} />
      </div>
      <span style={st.toolLabel}>สื่อ/ไฟล์/ลิงก์</span>
    </div>
  );
}
