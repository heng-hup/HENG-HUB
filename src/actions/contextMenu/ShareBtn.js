export const exec = async (textContext) => {
  if (navigator.share) {
    await navigator.share({ text: textContext });
  } else {
    // ถ้า Browser ไม่รองรับ ให้ก๊อปปี้ลง Clipboard แทน
    navigator.clipboard.writeText(textContext);
    alert("คัดลอกลิงก์เพื่อแชร์แล้ว");
  }
};
