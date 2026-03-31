export const exec = (data, setters) => {
  setters.setReplyTo({
    id: data.msgId,
    text: data.msgText,
    sender: data.sender || 'ผู้ส่ง'
  });
};
