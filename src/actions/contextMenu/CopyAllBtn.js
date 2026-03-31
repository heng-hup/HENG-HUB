export const exec = async (textContext) => {
  if (!textContext) return;
  try {
    await navigator.clipboard.writeText(textContext);
    console.log("คัดลอกข้อความทั้งหมดแล้ว");
  } catch (err) {
    alert("ไม่สามารถคัดลอกได้");
  }
};
