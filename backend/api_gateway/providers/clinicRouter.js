// heng/backend/api_gateway/providers/clinicRouter.js
import express from "express";
import axios from "axios";
const router = express.Router();
import mockClinicRouter from "./clinic.js";

// ฟังก์ชันตรวจสอบการเชื่อมต่ออินเทอร์เน็ต
async function hasInternet() {
  try {
    await axios.get("https://healthsites.io/", { timeout: 3000 });
    return true;
  } catch {
    return false;
  }
}

router.get("/", async (req, res) => {
  const online = await hasInternet();

  if (!online) {
    console.warn("⚠️ ไม่มีเน็ต → ใช้ Mock Clinic Data");
    return mockClinicRouter.handle(req, res);
  }

  try {
    const { q = "clinic", country = "Thailand" } = req.query;
    const url = `https://healthsites.io/api/v3/facilities/?q=${encodeURIComponent(
      q
    )}&country=${encodeURIComponent(country)}`;
    const resp = await axios.get(url, { timeout: 7000 });

    res.json({
      success: true,
      mode: "online",
      count: resp.data.results.length,
      data: resp.data.results.slice(0, 50),
    });
  } catch (e) {
    console.error("❌ ดึงข้อมูลออนไลน์ล้มเหลว:", e.message);
    return mockClinicRouter.handle(req, res);
  }
});

export default router;