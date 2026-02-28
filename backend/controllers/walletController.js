// backend/controllers/walletController.js
export const getWallet = async (req, res) => {
  const userId = req.params.userId;
  try {
    const walletData = {
      username: userId,
      balanceTHB: 12500,
      balanceHENG: 48000,
    };
    res.json(walletData);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const depositWallet = async (req, res) => {
  const { userId, amount } = req.body;
  console.log(`เติมเงิน ${amount} บาท ให้ผู้ใช้ ${userId}`);
  res.json({ success: true, newBalance: 12500 + Number(amount) });
};

export const withdrawWallet = async (req, res) => {
  const { userId, amount } = req.body;
  console.log(`ถอนเงิน ${amount} บาท จากผู้ใช้ ${userId}`);
  res.json({ success: true, newBalance: 12500 - Number(amount) });
};