// heng-core/routes/walletRoutes.js
import express from "express";
import { getWallet } from "../controllers/walletController.js";
const router = express.Router();

router.get("/:userId", getWallet);

export default router;