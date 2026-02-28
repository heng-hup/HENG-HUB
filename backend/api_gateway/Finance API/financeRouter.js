import express from "express";

const router = express.Router();

/**
 * 💰 HENG Finance API
 * รวมระบบการเงินทั้งหมด: wallet, heng coin, payment, withdraw, cashback, coupon
 */

// ✅ ตรวจสอบสถานะระบบการเงิน
router.get("/status", (req, res) => {
  res.json({
    system: "HENG Finance API",
    status: "🟢 Active",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ✅ ข้อมูลกระเป๋าเงิน
router.get("/wallet/:userId", (req, res) => {
  const { userId } = req.params;
  res.json({
    userId,
    balanceTHB: 12500.75,
    hengCoin: 320,
    cashback: "7%",
    lastUpdated: new Date().toISOString(),
  });
});

// ✅ เติมเงินเข้าระบบ
router.post("/wallet/deposit", (req, res) => {
  const { user, amount, method } = req.body;

  if (!user || !amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "กรุณาระบุข้อมูลให้ครบ (user, amount, method)",
    });
  }

  res.json({
    success: true,
    message: `💵 ${user.name} เติมเงิน ${amount.toLocaleString()} THB สำเร็จผ่าน ${method}`,
    balance: 12500.75 + amount,
  });
});

// ✅ ถอนเงินออกจากระบบ
router.post("/wallet/withdraw", (req, res) => {
  const { user, amount, destination } = req.body;

  if (!user || !amount || !destination) {
    return res.status(400).json({
      success: false,
      message: "กรุณาระบุ user, amount, destination",
    });
  }

  if (amount > 12500.75) {
    return res.status(400).json({
      success: false,
      message: "ยอดเงินในบัญชีไม่เพียงพอ",
    });
  }

  res.json({
    success: true,
    message: `🏧 ${user.name} ถอนเงิน ${amount.toLocaleString()} THB ไปยัง ${destination} สำเร็จ`,
    balance: 12500.75 - amount,
  });
});

// ✅ ระบบโอนเงินระหว่างผู้ใช้ (P2P)
router.post("/transfer", (req, res) => {
  const { from, to, amount } = req.body;

  if (!from || !to || !amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "ข้อมูลไม่ครบ (from, to, amount)",
    });
  }

  res.json({
    success: true,
    message: `🔄 โอนเงิน ${amount.toLocaleString()} THB จาก ${from.name} ไปยัง ${to.name} สำเร็จ`,
    transactionId: `TX-${Date.now()}`,
  });
});

// ✅ ตรวจสอบยอดคงเหลือ HENG Coin
router.get("/coin/info", (req, res) => {
  res.json({
    coinName: "HENG Coin",
    symbol: "HNG",
    priceTHB: 5.25,
    change24h: "+3.2%",
    marketCap: "฿520,000,000",
  });
});

// ✅ แลกเหรียญ HENG Coin ↔ THB
router.post("/coin/exchange", (req, res) => {
  const { user, type, amount } = req.body;

  if (!user || !type || !amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "ข้อมูลไม่ครบ (user, type, amount)",
    });
  }

  let result;
  if (type === "buy") {
    result = `${user.name} ซื้อ HENG Coin มูลค่า ${amount} THB สำเร็จ`;
  } else if (type === "sell") {
    result = `${user.name} ขาย HENG Coin มูลค่า ${amount} THB สำเร็จ`;
  } else {
    return res.status(400).json({
      success: false,
      message: "ประเภทธุรกรรมไม่ถูกต้อง (ต้องเป็น buy หรือ sell)",
    });
  }

  res.json({
    success: true,
    message: `🪙 ${result}`,
    transactionId: `COIN-${Date.now()}`,
  });
});

export default router;