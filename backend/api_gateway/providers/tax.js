// heng/backend/api_gateway/providers/tax.js
import express from "express";
const router = express.Router();

// 💼 ตัวอย่างอัตราภาษี mock ต่อประเทศ
const taxRates = {
  TH: { vat: 7, wht: 3, corporate: 20 },
  US: { vat: 10, wht: 5, corporate: 21 },
  JP: { vat: 8, wht: 2, corporate: 23 },
  SG: { vat: 9, wht: 2, corporate: 17 },
};

// ✅ GET /api/tax/rates?country=TH
router.get("/rates", (req, res) => {
  const country = (req.query.country || "TH").toUpperCase();
  const rate = taxRates[country];
  if (!rate)
    return res.status(404).json({ success: false, error: "ไม่พบข้อมูลประเทศนี้" });
  res.json({ success: true, country, rate });
});

// ✅ POST /api/tax/calc
router.post("/calc", (req, res) => {
  const { country = "TH", amount = 1000 } = req.body;
  const rate = taxRates[country];
  if (!rate)
    return res.status(404).json({ success: false, error: "ไม่พบข้อมูลประเทศนี้" });

  const vat = (amount * rate.vat) / 100;
  const wht = (amount * rate.wht) / 100;
  const corp = (amount * rate.corporate) / 100;

  res.json({
    success: true,
    country,
    base_amount: amount,
    vat,
    wht,
    corporate_tax: corp,
    total_tax: vat + wht + corp,
    net_after_tax: amount - (vat + wht + corp),
  });
});

// ✅ GET /api/tax/all
router.get("/all", (req, res) => {
  res.json({
    success: true,
    message: "🌎 HENG GLOBAL TAX RATE DATABASE",
    countries: taxRates,
  });
});

export default router;