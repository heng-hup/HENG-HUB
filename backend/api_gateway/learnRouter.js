// backend/api_gateway/learnRouter.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// 🎓 Coursera
router.get("/coursera", async (req, res) => {
  try {
    const query = req.query.q || "AI";
    const data = await axios.get(
      `https://api.coursera.org/api/courses.v1?q=search&query=${query}`,
      { headers: { Authorization: `Bearer ${process.env.COURSERA_KEY}` } }
    );
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📘 Khan Academy
router.get("/khan", async (req, res) => {
  try {
    const data = await axios.get(
      "https://www.khanacademy.org/api/v1/topic/math"
    );
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;