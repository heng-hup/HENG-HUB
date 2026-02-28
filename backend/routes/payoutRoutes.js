import express from "express";
import { processDailyPayouts } from "../modules/payoutEngine.js";

const router = express.Router();

// ตัวอย่าง mock ข้อมูล
router.get("/daily", (req, res) => {
  const mockUsers = [
    { id: "creator001", balance: 500 },
    { id: "seller002", balance: 800 },
  ];

  const result = processDailyPayouts(mockUsers);
  res.json({ success: true, result });
});

export default router;