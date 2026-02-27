// heng/backend/ai/aiConnector.js
import { suggestAction } from "./aiSuggest.js";
import { translateText } from "./aiTranslate.js";
import { analyzeMerit } from "./aiMerit.js";

/**
 * 🧠 HENG AI Connector
 * รวมระบบ AI ทุกตัวเข้าด้วยกัน:
 *  - วิเคราะห์สิ่งที่ผู้ใช้ทำ (aiSuggest)
 *  - แปลข้อความเรียลไทม์ (aiTranslate)
 *  - ประเมินพลังบุญ / พลังชีวิต (aiMerit)
 */

export async function hengAI(user, input) {
  try {
    // แปลข้อความตามภาษาผู้ใช้
    const translation = await translateText(input, user.language || "th");

    // แนะนำสิ่งที่ควรทำต่อ
    const suggestion = suggestAction(user);

    // คำนวณบุญจากกิจกรรม
    const merit = calculateMerit(user.actions || []);

    // รวมผลลัพธ์ทั้งหมด
    return {
      success: true,
      user: user.name || "Guest",
      translation,
      suggestion,
      merit,
      energy: Math.floor(Math.random() * 100),
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("⚠️ HENG AI ERROR:", error.message);
    return { success: false, error: error.message };
  }
}