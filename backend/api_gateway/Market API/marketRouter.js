// heng/backend/api_gateway/Market API/marketRouter.js
import express from "express";

const router = express.Router();

/**
 * 🛍️ HENG Market API
 * ศูนย์รวมสินค้า บริการ และระบบคูปอง HENG ส่วนลดทั่วโลก
 */

// ✅ ตรวจสอบระบบ
router.get("/status", (req, res) => {
  res.json({
    system: "HENG Market API",
    status: "🟢 Active",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ✅ รายการสินค้าแนะนำ
router.get("/products", (req, res) => {
  const items = [
    { id: 1, name: "กาแฟสมุนไพร HENG", price: "199 THB", cashback: "5%" },
    { id: 2, name: "HENG Coin Card", price: "1,000 THB", cashback: "10%" },
    { id: 3, name: "เสื้อ HENG LIMITED", price: "499 THB", cashback: "7%" },
  ];
  res.json({ success: true, total: items.length, data: items });
});

// ✅ ซื้อสินค้า
router.post("/buy", (req, res) => {
  const { user, productId } = req.body;
  if (!user || !productId) {
    return res.status(400).json({
      success: false,
      message: "กรุณาระบุ user และ productId",
    });
  }

  res.json({
    success: true,
    message: `🛒 ${user.name} ซื้อสินค้าหมายเลข ${productId} สำเร็จแล้ว`,
    cashback: "5%",
    coupon: "HENG2026",
  });
});

export default router;