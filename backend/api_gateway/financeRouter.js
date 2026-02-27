// backend/api_gateway/financeRouter.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// 💰 Stripe Payment Intent
router.post("/stripe", async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const result = await axios.post(
      "https://api.stripe.com/v1/payment_intents",
      new URLSearchParams({
        amount: amount * 100,
        currency: currency || "thb",
        automatic_payment_methods: { enabled: true },
      }),
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 💵 PayPal Access Token
router.get("/paypal/token", async (req, res) => {
  try {
    const token = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.json(token.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 💎 TrueMoney Profile (Demo)
router.get("/truemoney", async (req, res) => {
  try {
    const wallet = await axios.get(
      "https://api.truemoney.com/wallet/v1/profile",
      { headers: { Authorization: `Bearer ${process.env.TRUEMONEY_KEY}` } }
    );
    res.json(wallet.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;