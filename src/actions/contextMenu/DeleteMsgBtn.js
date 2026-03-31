export const exec = (msgId, setters) => {
  if (window.confirm("ต้องการลบข้อความนี้จากหน้าจอของคุณใช่หรือไม่?")) {
    setters.setMessages(prev => prev.filter(m => m.id !== msgId));
  }
};
