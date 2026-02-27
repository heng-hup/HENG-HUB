import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const feed = [
    { name: "Alice", message: "ขอบคุณ HENG ที่เปลี่ยนชีวิตฉัน ❤️" },
    { name: "Bob", message: "ซื้อของใน HENG MARKET แล้วได้ cashback!" },
    { name: "Chen", message: "เจอเพื่อนใหม่ใน HENG CHAT 💬" },
  ];
  res.json(feed);
});

export default router;