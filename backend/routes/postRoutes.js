// backend/routes/postRoutes.js
import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// ✅ สร้างโพสต์ใหม่
router.post("/create", async (req, res) => {
  try {
    const { author, content } = req.body;

    // จำลองผลจาก AI (จริงๆ ภายหลังจะเชื่อมกับ AI Core)
    const ai_tags = ["heng", "global", "ai"];
    const ai_score = Math.floor(Math.random() * 100);

    const { data, error } = await supabase
      .from("posts")
      .insert([{ author, content, ai_tags, ai_score }])
      .select();

    if (error) throw error;
    res.status(200).json({ success: true, post: data[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ ดึงโพสต์ทั้งหมด
router.get("/all", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.status(200).json({ success: true, posts: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;