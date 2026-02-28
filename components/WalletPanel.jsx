import React, { useState } from "react";

const WalletPanel = () => {
  const [balance, setBalance] = useState(3550);
  const [history, setHistory] = useState([
    { type: "เติมเงิน", amount: 500, date: "24 ก.พ. 2026" },
    { type: "ใช้ใน Market", amount: -120, date: "23 ก.พ. 2026" },
  ]);

  const topUp = () => {
    setBalance(balance + 100);
    setHistory([{ type: "เติมเงิน", amount: 100, date: new Date().toLocaleDateString() }, ...history]);
  };

  const withdraw = () => {
    if (balance >= 100) {
      setBalance(balance - 100);
      setHistory([{ type: "ถอนเงิน", amount: -100, date: new Date().toLocaleDateString() }, ...history]);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-yellow-300 h-full">
      <h2 className="text-2xl font-bold mb-3">💰 กระเป๋า HENG Wallet</h2>
      <div className="text-3xl font-bold mb-4">{balance.toLocaleString()} บาท</div>
      <div className="flex gap-2 mb-5">
        <button onClick={topUp} className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500">
          เติมเงิน +100
        </button>
        <button onClick={withdraw} className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">
          ถอนเงิน -100
        </button>
      </div>
      <div className="space-y-2">
        {history.map((h, i) => (
          <div key={i} className="flex justify-between border-b border-yellow-500/40 pb-1">
            <span>{h.type}</span>
            <span className={h.amount > 0 ? "text-green-400" : "text-red-400"}>
              {h.amount > 0 ? "+" : ""}
              {h.amount} บาท
            </span>
            <span className="text-xs opacity-70">{h.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletPanel;