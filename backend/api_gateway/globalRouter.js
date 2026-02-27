// 🌍 HENG GLOBAL API GATEWAY (FULL VERSION)
// รวมทุกหมวดหลัก พร้อมเชื่อม Router ภายในระบบ

import express from "express";
import axios from "axios";
import dotenv from "dotenv";

// 🔹 Router Modules ทั้งหมด
import aiRouter from "./aiRouter.js";
import analyticsRouter from "./analyticsRouter.js";
import educationRouter from "./educationRouter.js";
import financeRouter from "./financeRouter.js";
import healthRouter from "./healthRouter.js";
import learnRouter from "./learnRouter.js";
import liveRouter from "./liveRouter.js";
import marketRouter from "./marketRouter.js";
import socialRouter from "./socialRouter.js";
import taxRouter from "./taxRouter.js";
import travelRouter from "./travelRouter.js";
import translateRouter from "./translateRouter.js";

dotenv.config();
const router = express.Router();

/* ================================================
   🌐 GLOBAL API (รวม API ฟรี 15 ตัว)
   ================================================ */

/* 🔸 1. Google Translate API */
router.get("/translate", async (req, res) => {
  try {
    const { text, target } = req.query;
    const response = await axios.get(
      `https://translation.googleapis.com/language/translate/v2`,
      {
        params: { q: text, target: target || "en", key: process.env.GOOGLE_API_KEY },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 🔸 2. WHO Open Data (Health) */
router.get("/health/who", async (req, res) => {
  try {
    const data = await axios.get("https://ghoapi.azureedge.net/api/Indicator");
    res.json(data.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 🔸 3. Shopee Market Products */
router.get("/market/shopee", async (req, res) => {
  try {
    const data = await axios.get("https://shopee.vn/api/v4/recommend/recommend?bundle=top_products");
    res.json(data.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 🔸 4. Flash Express Tracking */
router.get("/logistics/flash", async (req, res) => {
  try {
    const { tracking } = req.query;
    const result = await axios.get(`https://api.flashexpress.com/v1/track?tracking_number=${tracking}`);
    res.json(result.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 🔸 5. Skyscanner Flights */
router.get("/travel/flights", async (req, res) => {
  try {
    const data = await axios.get(
      "https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create",
      { headers: { "api-key": process.env.SKYSCANNER_KEY } }
    );
    res.json(data.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 🔸 6. Google Maps Place Search */
router.get("/maps/search", async (req, res) => {
  try {
    const { query } = req.query;
    const data = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      { params: { query, key: process.env.GOOGLE_API_KEY } }
    );
    res.json(data.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 🔸 7. OpenAI Chat (AI) */
router.post("/ai/text", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    res.json(result.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 🔸 8. Forex Exchange Rate */
router.get("/finance/exchange", async (req, res) => {
  try {
    const data = await axios.get("https://open.er-api.com/v6/latest/USD");
    res.json(data.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 🔸 9. Crypto Price (CoinGecko) */
router.get("/finance/crypto", async (req, res) => {
  try {
    const result = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    res.json(result.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 🔸 10. Global News */
router.get("/news", async (req, res) => {
  try {
    const news = await axios.get("https://newsdata.io/api/1/news?apikey=pub_37759dxxxxxx&country=th");
    res.json(news.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 🔸 11. OpenWeather */
router.get("/weather", async (req, res) => {
  try {
    const { city } = req.query;
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_KEY}`
    );
    res.json(weather.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 🔸 12. HuggingFace AI */
router.post("/ai/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    const result = await axios.post(
      "https://api-inference.huggingface.co/models/distilbert-base-uncased",
      { inputs: text },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );
    res.json(result.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 🔸 13. Currency Converter */
router.get("/finance/convert", async (req, res) => {
  try {
    const { from, to } = req.query;
    const data = await axios.get(`https://api.exchangerate.host/convert?from=${from}&to=${to}`);
    res.json(data.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 🔸 14. Random User (Demo) */
router.get("/demo/user", async (req, res) => {
  try {
    const data = await axios.get("https://randomuser.me/api/");
    res.json(data.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 🔸 15. WHO Country Data (เพิ่มตัวอย่างสุดท้าย) */
router.get("/health/country", async (req, res) => {
  try {
    const country = req.query.country || "TH";
    const data = await axios.get(`https://ghoapi.azureedge.net/api/COUNTRY/${country}`);
    res.json(data.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ================================================
   🌍 รวม Router ย่อยทั้งหมด
   ================================================ */
router.use("/ai", aiRouter);
router.use("/analytics", analyticsRouter);
router.use("/education", educationRouter);
router.use("/finance", financeRouter);
router.use("/health", healthRouter);
router.use("/learn", learnRouter);
router.use("/live", liveRouter);
router.use("/market", marketRouter);
router.use("/social", socialRouter);
router.use("/tax", taxRouter);
router.use("/travel", travelRouter);
router.use("/translate", translateRouter);

export default router;