// heng/backend/api_gateway/providers/travel.js

// Mock API provider: Travel services (ตัวจำลอง API ท่องเที่ยว)
import express from "express";
const router = express.Router();

// ข้อมูลจำลอง (mock)
const travelData = [
  { id: 1, country: "Japan", package: "ทัวร์ญี่ปุ่นสุดเฮง 7 วัน", price: 59999 },
  { id: 2, country: "Thailand", package: "ภูเก็ตสบายใจ 3 วัน 2 คืน", price: 8999 },
  { id: 3, country: "Korea", package: "เที่ยวเกาหลี สายบุญ สายช้อป", price: 45999 },
];

// 📍 GET /api/travel
router.get("/", (req, res) => {
  res.json({ success: true, data: travelData });
});

// 📍 GET /api/travel/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const found = travelData.find((t) => t.id === id);
  if (!found) return res.status(404).json({ error: "ไม่พบแพ็คเกจนี้" });
  res.json({ success: true, data: found });
});

export default router;