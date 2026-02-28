// heng/backend/api_gateway/providers/market.js
import express from "express";
const router = express.Router();

// 🛍️ ตัวอย่างสินค้าจำลองใน HENG MARKET
const products = [
  { id: 1, name: "เสื้อยืด HENG Official", price: 299, cashback: 5 },
  { id: 2, name: "กระเป๋า HENG Coin Wallet", price: 899, cashback: 10 },
  { id: 3, name: "แก้วมงคล HENG", price: 159, cashback: 3 },
];

// 📦 GET /api/market
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🛍️ Welcome to HENG MARKET API",
    data: products,
  });
});

// 🔍 GET /api/market/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ success: false, error: "ไม่พบสินค้า" });
  }
  res.json({ success: true, data: product });
});

export default router;