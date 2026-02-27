import Stripe from "stripe";
import axios from "axios";
import qs from "qs";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-11-15" });

// Stripe PaymentIntent
export async function createStripePaymentIntent({ amountMinor, currency = "thb", metadata = {} }) {
  const intent = await stripe.paymentIntents.create({
    amount: amountMinor,
    currency,
    metadata,
  });
  return intent;
}

// PayPal: สร้าง order
export async function createPayPalOrder({ amount, currency = "USD" }) {
  const tokenRes = await axios({
    method: "post",
    url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_SECRET,
    },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: qs.stringify({ grant_type: "client_credentials" }),
  });

  const accessToken = tokenRes.data.access_token;

  const orderRes = await axios.post(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders",
    {
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: currency, value: String(amount) } }],
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return { order: orderRes.data, accessToken };
}

// PayPal capture
export async function capturePayPalOrder(orderId) {
  const tokenRes = await axios({
    method: "post",
    url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_SECRET,
    },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: qs.stringify({ grant_type: "client_credentials" }),
  });

  const accessToken = tokenRes.data.access_token;

  const res = await axios.post(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return res.data;
}