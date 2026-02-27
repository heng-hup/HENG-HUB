// backend/api_gateway/marketRouter.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// 🛒 Lazada Product Search
router.get("/lazada", async (req, res) => {
  try {
    const result = await axios.get(
      "https://api.lazada.com.my/rest/products/get",
      {
        headers: { Authorization: `Bearer ${process.env.LAZADA_KEY}` },
      }
    );
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📦 Amazon Global Products
router.get("/amazon", async (req, res) => {
  try {
    const data = await axios.get("https://api.rainforestapi.com/request", {
      params: {
        api_key: process.env.AMAZON_KEY,
        type: "search",
        amazon_domain: "amazon.com",
        search_term: req.query.q || "electronics",
      },
    });
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;