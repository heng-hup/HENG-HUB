// heng/backend/api_gateway/AI Core API/aiRouter.js
import express from "express";
import { hengAI } from "../../ai/aiConnector.js";

const router = express.Router();

/**
 * 🤖 AI Core API
 * ใช้สำหรับเชื่อมต่อสมองกลาง HENG AI Orchestrator
 * ครอบคลุมทั้งการแปลภาษา, วิเคราะห์พฤติกรรม, และคำนวณพลังชีวิต
 */

// ✅ Endpoint หลัก
router.post("/process", async (req, res) => {
  try {
    const { user, input } = req.body;

    // ตรวจสอบค่าที่ส่งเข้ามา
    if (!user || !input) {
      return res.status(400).json({
        success: false,
        error: "ข้อมูลไม่ครบ กรุณาระบุ user และ input",
      });
    }

    // ประมวลผลโดยสมอง HENG AI
    const result = await hengAI(user, input);

    // ส่งผลลัพธ์กลับ
    res.json({
      success: true,
      source: "HENG AI Core",
      result,
    });
  } catch (error) {
    console.error("❌ AI Router Error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ✅ ทดสอบการเชื่อมต่อ AI
router.get("/status", (req, res) => {
  res.json({
    system: "HENG AI Core API",
    status: "🟢 Active",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

export default router;