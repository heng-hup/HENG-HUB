import React from 'react';
import { ref, update } from "firebase/database";
import { db } from "../../firebase"; 

const PinBtn = ({ messageId, currentPinnedStatus, chatId, onPinSuccess }) => {
  const handlePin = async () => {
    try {
      const newStatus = !currentPinnedStatus;
      await update(ref(db, `messages/${messageId}`), { isPinned: newStatus });
      if (newStatus) {
        await update(ref(db, `chats/${chatId}`), { announcementId: messageId });
      }
      if (onPinSuccess) onPinSuccess(newStatus);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handlePin} style={styles.pinButton}>
      📌 <span style={styles.label}>{currentPinnedStatus ? 'เลิกปักหมุด' : 'ปักหมุด'}</span>
    </button>
  );
};

const styles = {
  pinButton: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '5px', padding: '10px', border: '1px solid #eee', borderRadius: '12px',
    cursor: 'pointer', width: '85px'
  },
  label: { fontSize: '11px', color: '#333', fontWeight: 'bold' }
};
export default PinBtn;
