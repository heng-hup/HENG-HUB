// heng/backend/api_gateway/providers/finance.js
import express from "express";
import axios from "axios";

const router = express.Router();

// 🌍 mock data
const accounts = [
  { id: 1, name: "HENG Wallet", balance: 10500, currency: "THB" },
  { id: 2, name: "Crypto Wallet", balance: 2.35, currency: "BTC" },
  { id: 3, name: "USD Reserve", balance: 3200, currency: "USD" },
];

// 📊 API ฟรีสำหรับอัตราแลกเปลี่ยน (จาก ExchangeRate API)
const EXCHANGE_URL = "https://open.er-api.com/v6/latest/THB";

// ✅ GET /api/finance/accounts
router.get("/accounts", (req, res) => {
  res.json({
    success: true,
    message: "💰 HENG FINANCE ACCOUNTS",
    data: accounts,
  });
});

// ✅ GET /api/finance/rates
router.get("/rates", async (req, res) => {
  try {
    const { base = "THB" } = req.query;
    const { data } = await axios.get(`https://open.er-api.com/v6/latest/${base}`);
    res.json({
      success: true,
      base: data.base_code,
      date: data.time_last_update_utc,
      rates: data.rates,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "ไม่สามารถดึงข้อมูลอัตราแลกเปลี่ยนได้",
      error: e.message,
    });
  }
});

// ✅ POST /api/finance/convert
router.post("/convert", async (req, res) => {
  const { from = "THB", to = "USD", amount = 1 } = req.body;
  try {
    const { data } = await axios.get(`https://open.er-api.com/v6/latest/${from}`);
    const rate = data.rates[to];
    if (!rate) return res.status(400).json({ success: false, error: "ไม่รองรับสกุลเงินนี้" });
    const converted = (amount * rate).toFixed(2);
    res.json({
      success: true,
      from,
      to,
      rate,
      amount,
      converted,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

export default router;