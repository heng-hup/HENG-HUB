// 🌦️ HENG WEATHER API
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// พยากรณ์อากาศแบบเรียลไทม์
router.get("/", async (req, res) => {
  try {
    const city = req.query.city || "Bangkok";
    const key = process.env.OPENWEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    const response = await axios.get(url);

    res.json({
      city: response.data.name,
      temperature: response.data.main.temp + " °C",
      weather: response.data.weather[0].description,
      humidity: response.data.main.humidity + "%",
      wind: response.data.wind.speed + " m/s",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;