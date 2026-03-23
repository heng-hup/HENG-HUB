import React from 'react';
import { st } from '../../styles/chatStyles';

export default function ToolButton({ icon, label, onClick }) {
  return (
    <div style={st.toolItem} onClick={onClick}>
      <div style={st.iconCircle}>{icon}</div>
      <div style={st.toolLabel}>{label}</div>
    </div>
  );
}
