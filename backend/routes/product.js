import express from "express";
import { supabase } from "../utils/db.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*").order("id");
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data });
});

router.get("/:id", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*").eq("id", req.params.id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json({ data });
});

export default router;