// 📊 HENG ANALYTICS API
import express from "express";
import axios from "axios";

const router = express.Router();

/**
 * 🔹 ตัวอย่าง Analytics Router
 * ใช้ทดสอบระบบดึงข้อมูลสถิติ (Google, API ภายนอก, หรือภายใน)
 */

// ดึงข้อมูลยอดขายสมมติ
router.get("/sales", async (req, res) => {
  try {
    const data = [
      { month: "Jan", revenue: 25000 },
      { month: "Feb", revenue: 32000 },
      { month: "Mar", revenue: 41000 },
    ];
    res.json({ status: "ok", source: "mock-data", result: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ดึงข้อมูลจาก API สถิติภายนอก (ตัวอย่าง)
router.get("/crypto", async (req, res) => {
  try {
    const result = await axios.get("https://api.coingecko.com/api/v3/global");
    res.json(result.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;