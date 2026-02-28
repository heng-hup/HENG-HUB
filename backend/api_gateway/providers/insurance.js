// heng/backend/api_gateway/providers/insurance.js
import express from "express";
const router = express.Router();

// 🩺 mock data – บริการประกันภัย HENG GLOBAL
const insurances = [
  {
    id: 1,
    name: "HENG Health Care",
    coverage: "ค่ารักษาพยาบาลสูงสุด 2,000,000 บาท/ปี",
    premium: 2999,
  },
  {
    id: 2,
    name: "HENG Travel Safe",
    coverage: "ประกันการเดินทางทั่วโลก คุ้มครองสูงสุด 5,000,000 บาท",
    premium: 499,
  },
  {
    id: 3,
    name: "HENG Life Protect",
    coverage: "ชีวิตและทุพพลภาพถาวร รวมถึงโควิด-19",
    premium: 899,
  },
];

// 🌍 GET /api/insurance
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🏥 Welcome to HENG INSURANCE API",
    data: insurances,
  });
});

// 🔍 GET /api/insurance/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const plan = insurances.find((i) => i.id === id);
  if (!plan) {
    return res.status(404).json({ success: false, error: "ไม่พบข้อมูลประกันภัย" });
  }
  res.json({ success: true, data: plan });
});

export default router;