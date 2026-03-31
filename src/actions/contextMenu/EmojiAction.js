export const exec = (emojiCode, msgId, setters) => {
  console.log(`React ${emojiCode} to message ${msgId}`);
  // ส่งไป update ใน state messages ของ chat.jsx
  setters.setMessages(prev => prev.map(m => 
    m.id === msgId ? { ...m, reaction: emojiCode } : m
  ));
};
