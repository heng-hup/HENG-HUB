// 🌍 HENG GLOBAL API SERVER (v1.0.7 Hybrid Mode)
// - ทำงานได้ทั้ง LOCAL และ ONLINE (auto detect)
// - ใช้จริงกับ https://api.hengheng88.app
// - ใช้ในเครื่องได้ที่ http://127.0.0.1:5000

import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { Server } from "socket.io";
import http from "http";
import NodeCache from "node-cache";

dotenv.config();
const app = express();
const server = http.createServer(app);

// ✅ ตรวจว่าเป็นโหมด local หรือ production
const isLocal = process.env.NODE_ENV !== "production";

// 🌐 อนุญาตโดเมนที่เข้าถึงได้
const allowedOrigins = isLocal
  ? [
      "http://localhost:5173",
      "http://127.0.0.1:5500",
      "http://localhost:5000",
      "file://",
    ]
  : [
      "https://www.hengheng88.app",
      "https://hengheng88.app",
      "https://api.hengheng88.app",
    ];

// ⚙️ Middleware
app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// 🔗 Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// ---------- Helpers ----------
function sendError(res, status = 500, message = "Internal error") {
  return res.status(status).json({ success: false, error: message });
}

async function findUserByUsername(username) {
  if (!username) return null;
  const { data, error } = await supabase
    .from("users")
    .select("id, username")
    .eq("username", username)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// ---------- Root & Health ----------
app.get("/", (req, res) => {
  res.json({
    status: "✅ HENG GLOBAL API LIVE",
    environment: process.env.NODE_ENV,
    base_url: process.env.BASE_URL,
    frontend: process.env.FRONTEND_URL,
    mode: isLocal ? "LOCAL" : "PRODUCTION",
  });
});
app.get("/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// ---------- Wallet Balance ----------
app.get("/api/wallet/balance/:username", async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) return sendError(res, 400, "username required");

    const cacheKey = `balance:${username}`;
    const cached = cache.get(cacheKey);
    if (cached !== undefined) return res.json({ success: true, balance: cached });

    const { data, error } = await supabase
      .from("vw_user_balance_summary")
      .select("wallet_balance")
      .eq("username", username)
      .maybeSingle();

    if (error) throw error;

    const balance = data?.wallet_balance ?? 0;
    cache.set(cacheKey, balance);
    return res.json({ success: true, balance });
  } catch (err) {
    console.error("Get balance error:", err.message);
    return sendError(res, 500, err.message);
  }
});

// ---------- Deposit ----------
app.post("/api/wallet/transaction", async (req, res) => {
  try {
    const { username, amount, type, meta } = req.body;
    if (!username || !amount) return sendError(res, 400, "username & amount required");

    const user = await findUserByUsername(username);
    if (!user) return sendError(res, 404, "user not found");

    const { data, error } = await supabase.rpc("fn_create_transaction_and_update_wallet", {
      p_user_id: user.id,
      p_type: type || "deposit",
      p_amount: Number(amount),
      p_meta: meta || {},
    });

    if (error) throw error;
    cache.del(`balance:${username}`);
    return res.json({ success: true, result: data });
  } catch (err) {
    console.error("Transaction error:", err.message);
    return sendError(res, 500, err.message);
  }
});

// ---------- Refund ----------
app.post("/api/orders/refund", async (req, res) => {
  try {
    const { user_id, amount, original_tx } = req.body;
    const { data, error } = await supabase.rpc("fn_refund_to_token", {
      p_user_id: user_id,
      p_amount: amount,
      p_original_tx: original_tx,
    });
    if (error) throw error;

    const { data: wallet } = await supabase
      .from("wallets")
      .select("balance")
      .eq("user_id", user_id)
      .maybeSingle();

    return res.json({
      success: true,
      refund: data,
      balance_after_refund: wallet?.balance || 0,
    });
  } catch (err) {
    console.error("Refund error:", err.message);
    return sendError(res, 500, err.message);
  }
});

// ---------- Test ----------
app.get("/test/all", async (req, res) => {
  const { data: users } = await supabase.from("users").select("id, username").limit(3);
  const { data: wallets } = await supabase.from("wallets").select("user_id, balance").limit(3);
  res.json({ success: true, users, wallets });
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("✅ HENG GLOBAL API ONLINE");
  console.log(`🌍 MODE: ${isLocal ? "LOCAL" : "PRODUCTION"}`);
  console.log(`🌍 API URL: ${process.env.BASE_URL}`);
  console.log(`🔗 Frontend: ${process.env.FRONTEND_URL}`);
});