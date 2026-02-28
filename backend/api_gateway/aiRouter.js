// backend/api_gateway/aiRouter.js
import express from "express";
import { supabase } from "../supabaseClient.js";
import { analyzeTextAI } from "../ai/aiPostCore.js";

const router = express.Router();

/** 🟢 GET /api/post/feed
 * ดึงโพสต์ทั้งหมดจาก Supabase
 */
router.get("/post/feed", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("❌ Feed Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/** 🟢 POST /api/post/create
 * เพิ่มโพสต์ใหม่ + วิเคราะห์ด้วย AI
 */
router.post("/post/create", async (req, res) => {
  try {
    const { author, content } = req.body;
    if (!content) return res.status(400).json({ error: "Missing content" });

    const aiInsight = await analyzeTextAI(content);

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          author,
          content,
          ai_tags: aiInsight.tags,
          ai_score: aiInsight.score,
        },
      ])
      .select();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    console.error("❌ Create Post Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/** 🟢 GET /api/wallet/:user
 * ดึงยอดเงินจากกระเป๋า
 */
router.get("/wallet/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const { data, error } = await supabase
      .from("wallets")
      .select("*")
      .eq("user", user)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** 🟢 POST /api/wallet/reward
 * เพิ่มเหรียญให้ผู้ใช้
 */
router.post("/wallet/reward", async (req, res) => {
  try {
    const { user, amount } = req.body;
    const { data, error } = await supabase.rpc("add_balance", {
      user_id: user,
      amount,
    });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;