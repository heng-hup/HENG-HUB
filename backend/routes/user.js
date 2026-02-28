import express from "express";
import { supabase } from "../utils/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, name } = req.body;
  const { data, error } = await supabase
    .from("users")
    .insert({ email, name })
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });

  const token = jwt.sign({ user_id: data.id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.json({ user: data, token });
});

router.post("/login", async (req, res) => {
  const { email } = req.body;
  const { data } = await supabase.from("users").select("*").eq("email", email).single();
  if (!data) return res.status(404).json({ error: "User not found" });

  const token = jwt.sign({ user_id: data.id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.json({ user: data, token });
});

export default router;