// heng/backend/api_gateway/providers/clinic.js
import express from "express";
const router = express.Router();

const mockClinics = [
  {
    id: 1,
    name: "HENG Global Health Center",
    country: "Thailand",
    address: "Bangkok, Thailand",
    services: ["ตรวจสุขภาพ", "ทันตกรรม", "ตรวจโควิด"],
    rating: 4.9,
  },
  {
    id: 2,
    name: "HENG Tokyo Medical Hub",
    country: "Japan",
    address: "Shinjuku, Tokyo",
    services: ["ศัลยกรรม", "เลเซอร์ผิวหนัง", "รักษามะเร็ง"],
    rating: 4.8,
  },
  {
    id: 3,
    name: "HENG California Wellness",
    country: "USA",
    address: "Los Angeles, USA",
    services: ["ตรวจหัวใจ", "กายภาพบำบัด", "สมองและประสาท"],
    rating: 4.7,
  },
];

router.get("/", (req, res) => {
  res.json({
    success: true,
    source: "Mock Data",
    data: mockClinics,
  });
});

router.get("/:id", (req, res) => {
  const clinic = mockClinics.find((c) => c.id === parseInt(req.params.id));
  if (!clinic)
    return res.status(404).json({ success: false, error: "ไม่พบข้อมูลคลินิก" });
  res.json({ success: true, data: clinic });
});

export default router;