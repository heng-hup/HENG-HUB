// heng/backend/api_gateway/Travel API/travelRouter.js
import express from "express";

const router = express.Router();

/**
 * ✈️ HENG Travel API
 * ระบบท่องเที่ยวระดับโลก จองตั๋ว ที่พัก ทัวร์ พร้อมส่วนลด HENG
 */

// ✅ ตรวจสอบระบบ
router.get("/status", (req, res) => {
  res.json({
    system: "HENG Travel API",
    status: "🟢 Active",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ✅ แสดงทัวร์แนะนำ
router.get("/tours", (req, res) => {
  const tours = [
    {
      id: 1,
      name: "ทัวร์ญี่ปุ่น ซากุระบาน",
      price: "35,000 THB",
      cashback: "8%",
    },
    {
      id: 2,
      name: "เที่ยวไทยในฝัน HENG TRAVEL",
      price: "4,999 THB",
      cashback: "5%",
    },
    {
      id: 3,
      name: "ยุโรปสุดหรู HENG PREMIUM",
      price: "89,000 THB",
      cashback: "10%",
    },
  ];
  res.json({ success: true, total: tours.length, data: tours });
});

// ✅ จองทัวร์
router.post("/book", (req, res) => {
  const { user, tourId } = req.body;
  if (!user || !tourId) {
    return res.status(400).json({
      success: false,
      message: "กรุณาระบุ user และ tourId",
    });
  }

  res.json({
    success: true,
    message: `✈️ ${user.name} จองทัวร์หมายเลข ${tourId} เรียบร้อยแล้ว!`,
    discount: "รับส่วนลด 10% ด้วย HENG Coupon",
  });
});

export default router;