import React from 'react';

const AddEmojiBtn = ({ currentEmoji, onSelectEmoji }) => {
  // รายการอีโมจิยอดนิยม
  const popularEmojis = ['👍', '❤️', '😂', '😮', '😥', '😡', '🙏', '✨'];

  const handleClick = (emoji) => {
    if (currentEmoji === emoji) {
      // ถ้ากดซ้ำตัวเดิม ให้ส่งค่า null เพื่อลบออก
      onSelectEmoji(null);
    } else {
      // ถ้ากดตัวใหม่ ให้แทนที่ตัวเดิมทันที
      onSelectEmoji(emoji);
    }
  };

  return (
    <div className="emoji-selection-container" style={styles.container}>
      {popularEmojis.map((emoji, index) => (
        <button
          key={index}
          onClick={() => handleClick(emoji)}
          style={{
            ...styles.emojiButton,
            // ถ้าเป็นตัวที่เลือกอยู่ ให้ทำไฮไลท์สีฟ้าอ่อนเหมือน Facebook
            backgroundColor: currentEmoji === emoji ? '#e7f3ff' : 'transparent',
            borderRadius: '50%'
          }}
        >
          {emoji}
        </button>
      ))}
      <button style={styles.moreButton}>+</button>
    </div>
  );
};

const styles = {
  // เช็คเครื่องหมาย : ให้ถูกต้องเพื่อไม่ให้หน้าจอแดงครับ
  container: {
    display: 'flex',
    gap: '8px',
    padding: '8px',
    background: '#ffffff',
    borderRadius: '30px',
    boxShadow: '0 2px 15px rgba(0,0,0,0.15)',
    width: 'fit-content'
  },
  emojiButton: {
    fontSize: '24px',
    border: 'none',
    padding: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  moreButton: {
    fontSize: '18px',
    border: '1px solid #ddd',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    cursor: 'pointer',
    color: '#666',
    marginLeft: '5px',
    background: 'none'
  }
};

export default AddEmojiBtn;
