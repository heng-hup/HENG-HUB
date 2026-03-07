import { useState, useEffect } from "react";
import axios from "axios";

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    const res = await axios.get("https://api.hengheng88.app/api/wallet/balance");
    setBalance(res.data.balance);
  };

  const deposit = async () => {
    await axios.post("https://api.hengheng88.app/api/wallet/deposit", { amount: Number(amount) });
    fetchBalance();
    setAmount("");
  };

  const withdraw = async () => {
    await axios.post("https://api.hengheng88.app/api/wallet/withdraw", { amount: Number(amount) });
    fetchBalance();
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">💰 HENG Wallet</h1>

      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md text-center shadow-lg">
        <p className="text-gray-300 mb-2">ยอดเงินปัจจุบัน:</p>
        <h2 className="text-4xl font-bold text-yellow-400 mb-6">{balance} THB</h2>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="จำนวนเงิน"
          className="w-full p-2 mb-4 rounded bg-gray-800 text-center"
        />

        <div className="flex gap-3">
          <button onClick={deposit} className="flex-1 bg-green-500 py-2 rounded-lg">
            เติมเงิน
          </button>
          <button onClick={withdraw} className="flex-1 bg-red-500 py-2 rounded-lg">
            ถอนเงิน
          </button>
        </div>
      </div>
    </div>
  );
}
