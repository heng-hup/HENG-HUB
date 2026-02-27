import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  const { text, target } = req.query;

  if (!text || !target) {
    return res.status(400).json({ error: "Missing text or target language" });
  }

  try {
    // ✅ ใช้ Google Translate API ก่อน
    const googleResponse = await axios.post(
      `https://translation.googleapis.com/language/translate/v2`,
      {},
      {
        params: {
          q: text,
          target: target,
          key: process.env.GOOGLE_API_KEY,
        },
      }
    );

    const translatedText =
      googleResponse.data.data.translations[0].translatedText;
    res.json({ translatedText, engine: "Google Translate" });

  } catch (err) {
    console.warn("⚠️ Google API failed, switching to LibreTranslate...");

    try {
      // ✅ สำรองด้วย LibreTranslate (ฟรี)
      const libreResponse = await axios.post(
        "https://libretranslate.de/translate",
        {
          q: text,
          source: "auto",
          target: target,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      res.json({ translatedText: libreResponse.data.translatedText, engine: "LibreTranslate" });
    } catch (error) {
      res.status(400).json({ error: "Request failed with status code 400" });
    }
  }
});

export default router;