import React from 'react';
import { ref, remove } from "firebase/database";
import { db } from "../../firebase"; 

const UnsendBtn = ({ messageId, senderId, currentUserId, onUnsendSuccess }) => {
  const handleUnsend = async () => {
    if (senderId !== currentUserId) {
      alert("ยกเลิกได้เฉพาะข้อความของคุณเท่านั้น");
      return;
    }
    if (window.confirm("ต้องการยกเลิกการส่งใช่หรือไม่?")) {
      try {
        await remove(ref(db, `messages/${messageId}`));
        if (onUnsendSuccess) onUnsendSuccess();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <button onClick={handleUnsend} style={styles.unsendButton}>
      🚫 <span style={styles.label}>ยกเลิกการส่ง</span>
    </button>
  );
};

const styles = {
  unsendButton: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '5px', padding: '10px', background: '#fff', border: '1px solid #ff4d4d',
    borderRadius: '12px', cursor: 'pointer', width: '85px'
  },
  label: { fontSize: '11px', color: '#ff4d4d', fontWeight: 'bold' }
};
export default UnsendBtn;
