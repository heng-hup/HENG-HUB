// 🌍 HENG GLOBAL API GATEWAY (SET 2: API 26–50)
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
   🔹 API 26–50 (Extended)
   ========================= */

router.get("/payments/paypal", (req, res) => res.json({ note: "PayPal integration placeholder" }));

router.get("/payments/truemoney", (req, res) => res.json({ note: "TrueMoney wallet connector" }));

router.post("/notify/line", async (req, res) => {
  try {
    const { token, message } = req.body;
    const r = await axios.post(
      "https://notify-api.line.me/api/notify",
      `message=${encodeURIComponent(message)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

router.get("/social/facebook", (req, res) => res.json({ note: "Facebook Graph API placeholder" }));

router.get("/social/tiktok", (req, res) => res.json({ note: "TikTok API placeholder" }));

router.get("/social/youtube/search", async (req, res) => {
  try {
    const { q = "heng" } = req.query;
    const r = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: { q, key: process.env.GOOGLE_API_KEY, part: "snippet", maxResults: 5 },
    });
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

router.get("/social/twitter", (req, res) => res.json({ note: "Twitter API placeholder" }));

router.post("/analytics/event", (req, res) => {
  const event = req.body;
  res.json({ ok: true, event });
});

router.get("/analytics/report", (req, res) => res.json({ note: "Analytics report placeholder" }));

router.get("/education/khan/search", async (req, res) => {
  try {
    const r = await axios.get("https://www.khanacademy.org/api/internal/graphql/get_graphql_content");
    res.json({ note: "Khan Academy public API limited", raw: r.data });
  } catch (err) { handleError(res, err); }
});

router.get("/health/googlefit", (req, res) => res.json({ note: "Google Fit requires OAuth" }));

router.post("/wallet/create", (req, res) => res.json({ note: "Create wallet placeholder" }));

router.post("/wallet/transfer", (req, res) => res.json({ note: "Transfer placeholder" }));

router.post("/gift/send", (req, res) => res.json({ note: "Send gift placeholder" }));

router.post("/safe/image", (req, res) => res.json({ note: "Google Vision placeholder" }));

router.post("/ai/embeddings", (req, res) =>
  res.json({ note: "OpenAI embeddings placeholder" })
);

router.post("/translate/bulk", async (req, res) => {
  try {
    const { texts = [], target = "en" } = req.body;
    const promises = texts.map((t) =>
      axios.get("https://translation.googleapis.com/language/translate/v2", {
        params: { q: t, target, key: process.env.GOOGLE_API_KEY },
      })
    );
    const results = await Promise.allSettled(promises);
    res.json(results.map((r) => (r.status === "fulfilled" ? r.value.data : r.reason.message)));
  } catch (err) { handleError(res, err); }
});

router.get("/treasury/forex", async (req, res) => {
  try {
    const r = await axios.get("https://api.exchangerate.host/latest");
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

router.get("/education/coursera", (req, res) => res.json({ note: "Coursera partner API" }));

router.get("/game/steam/appdetails", async (req, res) => {
  try {
    const { appid } = req.query;
    const r = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

router.get("/live/youtube", (req, res) => res.json({ note: "YouTube Live requires OAuth" }));

router.get("/world/languages", async (req, res) => {
  try {
    const r = await axios.get("https://translation.googleapis.com/language/translate/v2/languages", {
      params: { key: process.env.GOOGLE_API_KEY },
    });
    res.json(r.data);
  } catch (err) { handleError(res, err); }
});

router.get("/tax/revenue/status", (req, res) => res.json({ note: "Thai Revenue API placeholder" }));

router.get("/providers/list", (req, res) =>
  res.json({
    providers: ["google", "openai", "coingecko", "openweather", "newsdata", "huggingface"],
  })
);

export default router;