// heng-core/controllers/walletController.js
export const getWallet = async (req, res) => {
  const userId = req.params.userId;
  try {
    // mock data สำหรับทดสอบก่อนเชื่อมฐานข้อมูลจริง
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