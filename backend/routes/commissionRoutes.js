import express from "express";
import { recordTransaction } from "../modules/ledgerEngine.js";
import { sendGift } from "../controllers/giftController.js";
import { confirmOrder } from "../controllers/orderController.js";
import { withdrawFunds } from "../controllers/withdrawController.js";

const router = express.Router();

// ทดสอบระบบธุรกรรม
router.get("/test", (req, res) => {
  try {
    const tx = recordTransaction("user123", "gift", 1000);
    res.json(tx);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ตัวอย่างธุรกรรมจริง
router.post("/gift", sendGift);
router.post("/order", confirmOrder);
router.post("/withdraw", withdrawFunds);

export default router;