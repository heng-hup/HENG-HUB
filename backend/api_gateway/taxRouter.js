import express from "express";
const router = express.Router();

// 🧾 คำนวณภาษี
router.post("/calculate", (req, res) => {
  const { income } = req.body;
  const vat = income * 0.07;
  const wht = income * 0.03;
  const net = income - vat - wht;

  res.json({
    income,
    vat,
    wht,
    net,
    message: "ภาษีคำนวณอัตโนมัติแล้ว ✅",
  });
});

export default router;