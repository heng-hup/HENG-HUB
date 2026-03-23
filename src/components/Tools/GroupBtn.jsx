import React from 'react';
import { UserPlus } from 'lucide-react';
import { st } from '../../styles/chatStyles';

export default function GroupBtn({ onClick }) {
  return (
    <div style={st.toolItem} onClick={onClick}>
      <div style={st.iconCircle}>
        <UserPlus size={24} color="#FFD700" />
      </div>
      <span style={st.toolLabel}>สร้างกลุ่ม</span>
    </div>
  );
}
