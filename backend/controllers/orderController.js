import { recordTransaction } from "../modules/ledgerEngine.js";

export async function confirmOrder(req, res) {
  try {
    const { buyerId, sellerId, total } = req.body;
    const tx = recordTransaction(sellerId, "market", total);
    res.json({ success: true, data: tx });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}