// heng/backend/api_gateway/Education API/educationRouter.js
import express from "express";

const router = express.Router();

/**
 * 🎓 HENG Education API
 * รวมทุกบริการด้านการเรียนรู้:
 *  - คอร์สเรียนออนไลน์
 *  - ระบบ AI สอนอัตโนมัติ
 *  - Workshop / Certification
 *  - การเชื่อมโยงกับ AI Suggest & AI Core
 */

// ✅ ทดสอบการเชื่อมต่อ
router.get("/status", (req, res) => {
  res.json({
    system: "HENG Education API",
    status: "🟢 Active",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ✅ รายชื่อคอร์สแนะนำ (AI Recommend)
router.get("/courses", (req, res) => {
  const courses = [
    {
      id: 1,
      title: "💡 เรียนรู้การใช้ HENG AI เพื่อสร้างรายได้",
      category: "AI & Business",
      level: "Beginner",
      duration: "2 ชั่วโมง",
      price: "ฟรี",
    },
    {
      id: 2,
      title: "🧠 พัฒนาแอป HENG Super App ด้วย Node.js + React",
      category: "Programming",
      level: "Intermediate",
      duration: "6 ชั่วโมง",
      price: "1,200 THB",
    },
    {
      id: 3,
      title: "🌏 เข้าใจระบบเศรษฐกิจดิจิทัล HENG GLOBAL SYSTEM",
      category: "Finance & Tech",
      level: "All Level",
      duration: "3 ชั่วโมง",
      price: "ฟรี",
    },
  ];
  res.json({ success: true, total: courses.length, data: courses });
});

// ✅ ข้อมูลคอร์สแต่ละตัว
router.get("/course/:id", (req, res) => {
  const { id } = req.params;
  const mockCourse = {
    id,
    title: `คอร์สตัวอย่าง #${id}`,
    description: "เนื้อหานี้จะสอนให้คุณเข้าใจระบบ HENG GLOBAL ทั้งหมด",
    lessons: [
      "บทที่ 1: แนะนำระบบ HENG",
      "บทที่ 2: การเชื่อม API",
      "บทที่ 3: ใช้งาน AI เพื่อเพิ่มประสิทธิภาพ",
    ],
    duration: "2 ชั่วโมง",
    certificate: true,
  };
  res.json({ success: true, course: mockCourse });
});

// ✅ สมัครเรียน (จำลอง)
router.post("/enroll", (req, res) => {
  const { user, courseId } = req.body;

  if (!user || !courseId) {
    return res.status(400).json({
      success: false,
      message: "กรุณาระบุ user และ courseId",
    });
  }

  res.json({
    success: true,
    message: `🎉 ${user.name} สมัครเรียนคอร์ส #${courseId} สำเร็จแล้ว!`,
    nextStep: "AI จะส่งบทเรียนให้คุณภายใน 5 นาที",
  });
});

export default router;