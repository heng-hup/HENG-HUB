// heng/backend/api_gateway/providers/shopee.js
import express from "express";
const router = express.Router();

// 🛍️ Mock ข้อมูลสินค้า Shopee (จำลอง API จริง)
const mockProducts = [
  { id: 1, name: "โทรศัพท์มือถือ HENG Edition", price: 5999, rating: 4.8 },
  { id: 2, name: "หูฟังไร้สาย HENG Pods", price: 1299, rating: 4.6 },
  { id: 3, name: "กระเป๋า HENG Travel", price: 899, rating: 4.7 },
  { id: 4, name: "เครื่องชงกาแฟ HENG Cafe", price: 2990, rating: 4.9 },
];

// ✅ GET /api/shopee/products
router.get("/products", (req, res) => {
  res.json({
    success: true,
    source: "Shopee Mock",
    data: mockProducts,
  });
});

// ✅ GET /api/shopee/product/:id
router.get("/product/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = mockProducts.find((p) => p.id === id);
  if (!item)
    return res.status(404).json({ success: false, error: "ไม่พบสินค้านี้" });
  res.json({ success: true, data: item });
});

// ✅ POST /api/shopee/search
router.post("/search", (req, res) => {
  const { query } = req.body;
  const results = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
  res.json({ success: true, query, results });
});

// ✅ export default
export default router;