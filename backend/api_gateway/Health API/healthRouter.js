// heng/backend/api_gateway/Health API/healthRouter.js
import express from "express";

const router = express.Router();

/**
 * 🩺 HENG Health API
 * ระบบสุขภาพอัจฉริยะ: ตรวจสุขภาพ, ประกัน, คลินิก, และวิเคราะห์ด้วย AI
 */

// ✅ ทดสอบระบบ
router.get("/status", (req, res) => {
  res.json({
    system: "HENG Health API",
    status: "🟢 Active",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ✅ รายการตรวจสุขภาพทั่วไป
router.get("/packages", (req, res) => {
  const healthPackages = [
    {
      id: 1,
      title: "ตรวจสุขภาพพื้นฐาน",
      price: "999 THB",
      details: ["วัดความดัน", "ตรวจน้ำตาล", "ตรวจไขมันในเลือด"],
    },
    {
      id: 2,
      title: "ตรวจสุขภาพครบวงจร",
      price: "2,999 THB",
      details: ["X-ray", "ตรวจหัวใจ ECG", "ตรวจเลือดละเอียด"],
    },
    {
      id: 3,
      title: "ตรวจสุขภาพ AI วิเคราะห์พฤติกรรม",
      price: "1,499 THB",
      details: ["AI วิเคราะห์สุขภาพจากการใช้ชีวิต", "คำแนะนำส่วนบุคคล"],
    },
  ];
  res.json({ success: true, total: healthPackages.length, data: healthPackages });
});

// ✅ สมัครแพ็กเกจสุขภาพ
router.post("/register", (req, res) => {
  const { user, packageId } = req.body;

  if (!user || !packageId) {
    return res.status(400).json({
      success: false,
      message: "กรุณาระบุ user และ packageId",
    });
  }

  res.json({
    success: true,
    message: `✅ ${user.name} จองแพ็กเกจสุขภาพ #${packageId} สำเร็จแล้ว`,
    reward: "ได้รับพลังบุญ +10 และส่วนลดประกัน 5%",
  });
});

export default router;