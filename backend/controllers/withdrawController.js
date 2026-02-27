import { recordTransaction } from "../modules/ledgerEngine.js";

export async function withdrawFunds(req, res) {
  try {
    const { userId, amount } = req.body;
    const tx = recordTransaction(userId, "withdraw", amount);
    res.json({ success: true, data: tx });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}