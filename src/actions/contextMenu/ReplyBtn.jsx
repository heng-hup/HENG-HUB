import React from 'react';

const ReplyBtn = ({ message, onReply }) => {
  
  const handleReplyClick = () => {
    // ส่งข้อมูลข้อความที่ต้องการตอบกลับไปยัง Component หลัก
    if (onReply) {
      onReply({
        id: message.id,
        sender: message.senderName || 'ผู้ใช้',
        text: message.text,
        timestamp: message.timestamp
      });
    }
  };

  return (
    <button 
      onClick={handleReplyClick}
      style={styles.replyButton}
      title="ตอบกลับ"
    >
      ↩️ <span style={styles.label}>ตอบกลับ</span>
    </button>
  );
};

const styles = {
  replyButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    padding: '10px',
    background: '#ffffff',
    border: '1px solid #eee',
    borderRadius: '12px',
    cursor: 'pointer',
    width: '85px',
    transition: 'background 0.2s'
  },
  label: {
    fontSize: '11px',
    color: '#333',
    fontWeight: 'bold'
  }
};

export default ReplyBtn;
