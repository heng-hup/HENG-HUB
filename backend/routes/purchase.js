import express from "express";
import { supabase } from "../utils/db.js";
import { createStripePaymentIntent, createPayPalOrder, capturePayPalOrder } from "../utils/paymentClient.js";
import { addFeed } from "./feed.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { user_id, product_id, method = "stripe" } = req.body;
    const { data: product } = await supabase.from("products").select("*").eq("id", product_id).single();
    if (!product) return res.status(400).json({ error: "Product not found" });

    const { data: order } = await supabase
      .from("orders")
      .insert({
        user_id,
        product_id,
        amount: product.price,
        currency: product.currency || "THB",
        status: "pending",
      })
      .select()
      .single();

    if (method === "stripe") {
      const amountMinor = Math.round(Number(product.price) * 100);
      const intent = await createStripePaymentIntent({
        amountMinor,
        currency: (product.currency || "thb").toLowerCase(),
        metadata: { order_id: order.id },
      });
      return res.json({ provider: "stripe", clientSecret: intent.client_secret, order });
    }

    if (method === "paypal") {
      const { order: paypalOrder } = await createPayPalOrder({
        amount: product.price,
        currency: product.currency || "USD",
      });
      const approveLink = paypalOrder.links.find((l) => l.rel === "approve")?.href;
      return res.json({ provider: "paypal", approveLink, paypalOrder, order });
    }

    res.status(400).json({ error: "Unsupported method" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "create payment error" });
  }
});

router.post("/paypal/capture", async (req, res) => {
  try {
    const { orderId, hengOrderId } = req.body;
    const result = await capturePayPalOrder(orderId);
    await supabase.from("orders").update({ status: "paid" }).eq("id", hengOrderId);
    await addFeed({ user_id: null, message: `Order ${hengOrderId} paid via PayPal` });
    res.json({ ok: true, result });
  } catch (e) {
    res.status(500).json({ error: "paypal capture error" });
  }
});

export default router;