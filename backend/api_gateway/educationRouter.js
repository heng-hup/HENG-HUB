import express from "express";
const router = express.Router();

// 📚 รายวิชาแนะนำ
router.get("/courses", (req, res) => {
  res.json([
    { id: 1, title: "พื้นฐานการเงินกับ HENG", level: "Beginner" },
    { id: 2, title: "ใช้ AI เพิ่มยอดขาย", level: "Advanced" },
  ]);
});

// ✏️ ลงเรียน
router.post("/enroll", (req, res) => {
  const { courseId, user } = req.body;
  res.json({
    success: true,
    message: `${user} ลงเรียนคอร์ส ${courseId} สำเร็จ 🎓`,
  });
});

export default router;