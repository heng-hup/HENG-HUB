export const exec = (msgId, setters) => {
  // สั่ง Filter ข้อความออกจาก State messages ใน chat.jsx
  setters.setMessages(prev => prev.filter(m => m.id !== msgId));
};
