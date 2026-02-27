// 🌍 HENG GLOBAL API GATEWAY (SET 1: API 1–25)
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

function handleError(res, err) {
  const message = err?.response?.data || err?.message || "Unknown error";
  const status = err?.response?.status || 500;
  res.status(status).json({ error: message });
}

/* =========================
   🔹 API 1–25 (Core)
   ========================= */

// 1. Google Translate
router.get("/translate", async (req, res) => {
  try {
    const { text, target = "en" } = req.query;
    const r = await axios.get("https://translation.googleapis.com/language/translate/v2", {
      params: { q: text, target, key: process.env.GOOGLE_API_KEY },
    });
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 2. WHO Open Data
router.get("/health/who", async (req, res) => {
  try {
    const r = await axios.get("https://ghoapi.azureedge.net/api/Indicator");
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 3. Zomato
router.get("/food/zomato", async (req, res) => {
  try {
    const city = req.query.city || "Bangkok";
    const r = await axios.get(`https://developers.zomato.com/api/v2.1/search?q=${encodeURIComponent(city)}`, {
      headers: { "user-key": process.env.ZOMATO_KEY || "" },
    });
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 4. Shopee
router.get("/market/shopee", async (req, res) => {
  try {
    const r = await axios.get("https://shopee.vn/api/v4/recommend/recommend?bundle=top_products");
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 5. Flash Express
router.get("/logistics/flash", async (req, res) => {
  try {
    const { tracking } = req.query;
    const r = await axios.get(`https://api.flashexpress.com/v1/track?tracking_number=${tracking}`);
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 6. Skyscanner
router.get("/travel/flights", async (req, res) => {
  try {
    const r = await axios.get("https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create", {
      headers: { "api-key": process.env.SKYSCANNER_KEY || "" },
    });
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 7. Google Maps
router.get("/maps/search", async (req, res) => {
  try {
    const { query } = req.query;
    const r = await axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json", {
      params: { query, key: process.env.GOOGLE_API_KEY },
    });
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 8. OpenAI Chat
router.post("/ai/text", async (req, res) => {
  try {
    const { prompt } = req.body;
    const r = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 9. Forex Exchange
router.get("/finance/exchange", async (req, res) => {
  try {
    const r = await axios.get("https://open.er-api.com/v6/latest/USD");
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 10. CoinGecko
router.get("/finance/crypto", async (req, res) => {
  try {
    const r = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 11. News
router.get("/news", async (req, res) => {
  try {
    const r = await axios.get("https://newsdata.io/api/1/news", {
      params: { apikey: process.env.NEWSDATA_KEY || "", country: "th" },
    });
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 12. OpenWeather
router.get("/weather", async (req, res) => {
  try {
    const { city = "Bangkok" } = req.query;
    const r = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: { q: city, appid: process.env.OPENWEATHER_KEY },
    });
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 13. HuggingFace
router.post("/ai/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    const r = await axios.post(
      "https://api-inference.huggingface.co/models/distilbert-base-uncased",
      { inputs: text },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 14. Currency Converter
router.get("/finance/convert", async (req, res) => {
  try {
    const { from = "USD", to = "THB" } = req.query;
    const r = await axios.get("https://api.exchangerate.host/convert", { params: { from, to } });
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 15. Random User
router.get("/demo/user", async (req, res) => {
  try {
    const r = await axios.get("https://randomuser.me/api/");
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

// 16–25 เพิ่มเติม
router.get("/market/shopee/product", async (req, res) => {
  try {
    const { itemid } = req.query;
    const r = await axios.get(`https://shopee.co.th/api/v4/item/get?itemid=${itemid}`);
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

router.get("/market/lazada/search", (req, res) => {
  res.json({ note: "Lazada requires auth (placeholder)" });
});

router.get("/market/amazon/search", (req, res) => {
  res.json({ note: "Amazon Product Advertising API required" });
});

router.get("/food/grab", (req, res) => res.json({ note: "GrabFood API requires key" }));

router.get("/food/foodpanda", (req, res) => res.json({ note: "Foodpanda API placeholder" }));

router.get("/travel/booking", (req, res) => res.json({ note: "Booking.com API via RapidAPI" }));

router.post("/travel/skyscanner/create", (req, res) =>
  res.json({ note: "Skyscanner full flow placeholder" })
);

router.get("/maps/directions", async (req, res) => {
  try {
    const { origin, destination } = req.query;
    const r = await axios.get("https://maps.googleapis.com/maps/api/directions/json", {
      params: { origin, destination, key: process.env.GOOGLE_API_KEY },
    });
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

router.get("/logistics/kerry", (req, res) => res.json({ note: "Kerry API requires partner access" }));

router.get("/payments/stripe", (req, res) => res.json({ note: "Stripe SDK placeholder" }));

export default router;