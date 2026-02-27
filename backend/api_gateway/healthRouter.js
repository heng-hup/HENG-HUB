import express from "express";
const router = express.Router();

// 🏥 รายชื่อคลินิก
router.get("/clinics", (req, res) => {
  res.json([
    { id: 1, name: "HENG Clinic กรุงเทพฯ", rating: 4.9 },
    { id: 2, name: "HENG Dental เชียงใหม่", rating: 4.7 },
  ]);
});

// 🩺 นัดหมายแพทย์
router.post("/appointment", (req, res) => {
  const { name, date } = req.body;
  res.json({
    success: true,
    message: `จองคิวคุณหมอสำเร็จสำหรับ ${name} วันที่ ${date}`,
  });
});

export default router;