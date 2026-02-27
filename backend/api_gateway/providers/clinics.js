// heng/backend/api_gateway/providers/clinics.js
import axios from "axios";
import NodeCache from "node-cache";
import express from "express";

const router = express.Router();
const cache = new NodeCache({ stdTTL: 3600 }); // cache 1 ชั่วโมง

async function fetchClinics(query = "clinic", country = "Thailand") {
  const key = `clinic-${country}-${query}`;
  const hit = cache.get(key);
  if (hit) return hit;

  try {
    const url = `https://healthsites.io/api/v3/facilities/?q=${encodeURIComponent(
      query
    )}&country=${encodeURIComponent(country)}`;
    const res = await axios.get(url, { timeout: 7000 });
    const data =
      res.data.results?.map((f) => ({
        id: f.id,
        name: f.name,
        address: f.address || f.city || "ไม่ระบุ",
        country: f.country || "Unknown",
        lat: f.latitude,
        lon: f.longitude,
        source: "healthsites.io",
      })) || [];
    cache.set(key, data);
    return data;
  } catch (e) {
    console.error("❌ ไม่สามารถเชื่อมต่อ API จริง:", e.message);
    return [];
  }
}

router.get("/", async (req, res) => {
  const { q = "clinic", country = "Thailand" } = req.query;
  const clinics = await fetchClinics(q, country);
  res.json({
    success: true,
    source: "Live API",
    count: clinics.length,
    data: clinics.slice(0, 50),
  });
});

export default router;