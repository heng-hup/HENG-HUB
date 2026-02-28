// backend/ai/aiPostCore.js
export async function analyzeTextAI(text) {
  // จำลองการวิเคราะห์โพสต์ด้วย AI
  const tags = [];
  if (text.toLowerCase().includes("heng")) tags.push("heng");
  if (text.toLowerCase().includes("market")) tags.push("shopping");
  if (text.toLowerCase().includes("coin")) tags.push("finance");
  if (text.toLowerCase().includes("ai")) tags.push("innovation");

  // ประเมินคะแนนจากความยาว
  const score = Math.min(text.length / 100, 1);

  return { tags, score };
}