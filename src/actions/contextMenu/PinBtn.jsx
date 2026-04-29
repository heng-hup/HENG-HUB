import React from 'react';
import { ref, update } from "firebase/database";
import { db } from "../../firebase"; 

const PinBtn = ({ messageId, currentPinnedStatus, chatId, onPinSuccess }) => {

  const handlePin = async () => {
    try {
      const messageRef = ref(db, `messages/${messageId}`);
      const chatRef = ref(db, `chats/${chatId}`);
      const newStatus = !currentPinnedStatus;

      await update(messageRef, {
        isPinned: newStatus
      });

      if (newStatus) {
        await update(chatRef, {
          announcementId: messageId,
          lastUpdated: Date.now()
        });
      }

      if (onPinSuccess) onPinSuccess(newStatus);
    } catch (error) {
      console.error("Pin Error:", error);
    }
  };

  return (
    <button 
      onClick={handlePin}
      style={{
        ...styles.pinButton,
        backgroundColor: currentPinnedStatus ? '#fff9e6' : '#ffffff'
      }}
    >
      📌 <span style={styles.label}>{currentPinnedStatus ? 'เลิกปักหมุด' : 'ปักหมุด'}</span>
    </button>
  );
};

const styles = {
  // แก้ไขจุดนี้: pinButton ต้องมี : อันเดียวและตามด้วย { ให้ถูกต้อง
  pinButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    padding: '10px',
    border: '1px solid #eee',
    borderRadius: '12px',
    cursor: 'pointer',
    width: '85px',
    transition: 'all 0.2s ease'
  },
  label: {
    fontSize: '11px',
    color: '#333',
    fontWeight: 'bold'
  }
};

export default PinBtn;
