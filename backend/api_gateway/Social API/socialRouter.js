// heng/backend/api_gateway/Social API/socialRouter.js
import express from "express";

const router = express.Router();

/**
 * 💬 HENG Social API
 * รวมระบบแชต ไลฟ์ ฟีด โพสต์ คอมเมนต์ และการโทรในเครือ HENG
 */

// ✅ ทดสอบระบบ
router.get("/status", (req, res) => {
  res.json({
    system: "HENG Social API",
    status: "🟢 Active",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ✅ ฟีด (Feed โพสต์)
router.get("/feed", (req, res) => {
  const feed = [
    { id: 1, user: "Alice", message: "ขอบคุณ HENG ที่เปลี่ยนชีวิตฉัน ❤️", likes: 120 },
    { id: 2, user: "Bob", message: "ซื้อของใน HENG MARKET แล้วได้ cashback!", likes: 88 },
    { id: 3, user: "Chen", message: "เจอเพื่อนใหม่ใน HENG CHAT 💬", likes: 54 },
  ];
  res.json({ success: true, total: feed.length, data: feed });
});

// ✅ โพสต์ใหม่
router.post("/post", (req, res) => {
  const { user, message } = req.body;
  if (!user || !message) {
    return res.status(400).json({
      success: false,
      message: "กรุณาระบุ user และข้อความโพสต์",
    });
  }

  res.json({
    success: true,
    message: `📝 ${user.name} โพสต์ข้อความเรียบร้อยแล้ว!`,
    content: message,
  });
});

// ✅ แชต (จำลอง)
router.post("/chat/send", (req, res) => {
  const { from, to, text } = req.body;
  if (!from || !to || !text) {
    return res.status(400).json({
      success: false,
      message: "ข้อมูลไม่ครบ กรุณาระบุ from, to, text",
    });
  }

  res.json({
    success: true,
    chat: {
      from,
      to,
      text,
      time: new Date().toLocaleTimeString(),
    },
  });
});

// ✅ การโทร (จำลอง)
router.post("/call/start", (req, res) => {
  const { caller, receiver } = req.body;
  if (!caller || !receiver) {
    return res.status(400).json({
      success: false,
      message: "กรุณาระบุ caller และ receiver",
    });
  }

  res.json({
    success: true,
    message: `📞 ${caller.name} โทรหา ${receiver.name} แล้ว...`,
    callStatus: "Connecting...",
  });
});

// ✅ ไลฟ์ (จำลอง)
router.get("/live/status", (req, res) => {
  res.json({
    live: true,
    viewers: Math.floor(Math.random() * 1000),
    trending: true,
    message: "🔥 LIVE HENG กำลังเป็นที่นิยม!",
  });
});

export default router;