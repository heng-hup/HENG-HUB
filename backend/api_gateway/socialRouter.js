import express from "express";

const router = express.Router();

/**
 * 🧾 HENG Tax & Government API
 * ระบบภาษีอัจฉริยะ รองรับทั่วโลก — เชื่อมกับรัฐบาล สรรพากร และ HENG Wallet
 */

// ✅ ตรวจสอบสถานะระบบ
router.get("/status", (req, res) => {
  res.json({
    system: "HENG Tax & Government API",
    status: "🟢 Active",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ✅ คำนวณภาษีรายบุคคล / ธุรกิจ
router.post("/calculate", (req, res) => {
  const { user, income, country } = req.body;

  if (!user || !income || !country) {
    return res.status(400).json({
      success: false,
      message: "กรุณาระบุ user, income และ country",
    });
  }

  // อัตราภาษีตัวอย่าง
  const taxRates = {
    TH: 0.10, // ไทย
    US: 0.15,
    JP: 0.12,
    CN: 0.13,
    EU: 0.14,
  };

  const rate = taxRates[country] || 0.10;
  const tax = income * rate;

  res.json({
    success: true,
    user: user.name,
    country,
    income,
    taxRate: `${(rate * 100).toFixed(2)}%`,
    taxAmount: tax.toFixed(2),
    message: `💼 ภาษีของ ${user.name} ในประเทศ ${country} คือ ${tax.toFixed(2)} (${(rate * 100).toFixed(1)}%)`,
  });
});

// ✅ ส่งรายงานภาษี (เชื่อมสรรพากร)
router.post("/submit", (req, res) => {
  const { user, taxAmount, year } = req.body;

  if (!user || !taxAmount || !year) {
    return res.status(400).json({
      success: false,
      message: "กรุณาระบุ user, taxAmount และ year",
    });
  }

  res.json({
    success: true,
    message: `📑 ${user.name} ส่งรายงานภาษีปี ${year} สำเร็จ!`,
    amount: `${taxAmount.toLocaleString()} THB`,
    government: "กรมสรรพากร HENG World",
    status: "Received",
  });
});

// ✅ ระบบคืนภาษี
router.post("/refund", (req, res) => {
  const { user, amount } = req.body;

  if (!user || !amount) {
    return res.status(400).json({
      success: false,
      message: "กรุณาระบุ user และ amount",
    });
  }

  res.json({
    success: true,
    message: `💸 ระบบได้คืนภาษีให้ ${user.name} จำนวน ${amount.toLocaleString()} THB แล้ว`,
    reward: "ได้รับพลังบุญ +5 และ cashback 2%",
  });
});

// ✅ ตรวจสอบนโยบายรัฐบาล / ข่าวภาษีโลก
router.get("/policy", (req, res) => {
  const policy = [
    {
      country: "TH",
      title: "ยกเว้นภาษีสำหรับผู้ใช้ HENG Wallet",
      description: "ผู้ที่ใช้กระเป๋า HENG ในธุรกรรมจะได้รับเครดิตภาษี 5%",
    },
    {
      country: "US",
      title: "ลดภาษีธุรกิจดิจิทัล 3%",
      description: "สำหรับแพลตฟอร์มที่เชื่อมต่อ API กับ HENG SYSTEM",
    },
    {
      country: "JP",
      title: "โปรแกรมสนับสนุน AI Tax",
      description: "รัฐบาลญี่ปุ่นร่วมมือ HENG เปิดระบบภาษีอัตโนมัติ",
    },
  ];

  res.json({
    success: true,
    total: policy.length,
    data: policy,
  });
});

export default router;