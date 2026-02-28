import express from "express";
import { getWallet, depositWallet, withdrawWallet } from "../controllers/walletController.js";
const router = express.Router();

router.get("/:userId", getWallet);
router.post("/deposit", depositWallet);
router.post("/withdraw", withdrawWallet);

export default router;