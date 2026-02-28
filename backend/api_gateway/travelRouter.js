// backend/api_gateway/travelRouter.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// ✈️ Booking.com (Demo)
router.get("/booking", async (req, res) => {
  try {
    const city = req.query.city || "Bangkok";
    const response = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/search",
      {
        params: { dest_type: "city", dest_id: "-3414440", locale: "en-gb" },
        headers: {
          "X-RapidAPI-Key": process.env.BOOKING_KEY,
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🌍 Google Place Detail
router.get("/place", async (req, res) => {
  try {
    const { place_id } = req.query;
    const data = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: { place_id, key: process.env.GOOGLE_PLACE_KEY },
      }
    );
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;