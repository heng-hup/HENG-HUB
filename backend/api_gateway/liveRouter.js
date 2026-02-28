// backend/api_gateway/liveRouter.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// 🎬 YouTube Live
router.get("/youtube", async (req, res) => {
  try {
    const q = req.query.q || "live music";
    const result = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          eventType: "live",
          type: "video",
          q,
          key: process.env.YOUTUBE_KEY,
        },
      }
    );
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📱 TikTok Trending (Demo)
router.get("/tiktok", async (req, res) => {
  try {
    const data = await axios.get(
      "https://www.tiktok.com/api/discover/item_list/",
      { params: { region: "TH" } }
    );
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🎮 Twitch Live Streams
router.get("/twitch", async (req, res) => {
  try {
    const response = await axios.get("https://api.twitch.tv/helix/streams", {
      headers: {
        "Client-ID": process.env.TWITCH_KEY,
        Authorization: `Bearer ${process.env.TWITCH_KEY}`,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;