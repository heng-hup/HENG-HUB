import React from 'react';

const EmojiAction = ({ onSelectEmoji }) => {
  const emojis = ['❤️', '👍', '😊', '😂', '😮', '😢'];

  return (
    <div style={styles.container}>
      {emojis.map((emoji) => (
        <button key={emoji} onClick={() => onSelectEmoji(emoji)} style={styles.emojiBtn}>
          {emoji}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex', gap: '5px', padding: '5px', background: '#f9f9f9', borderRadius: '20px'
  },
  emojiBtn: {
    border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer'
  }
};
export default EmojiAction;
