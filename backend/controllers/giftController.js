import { recordTransaction } from "../modules/ledgerEngine.js";

export async function sendGift(req, res) {
  try {
    const { senderId, receiverId, giftValue } = req.body;
    const tx = recordTransaction(receiverId, "gift", giftValue);
    res.json({ success: true, data: tx });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}