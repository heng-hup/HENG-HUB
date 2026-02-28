import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Wallet() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ โหลดครั้งเดียว ไม่วนซ้ำ
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []); // <- ว่างเปล่า = ทำงานครั้งเดียวตอนเปิดหน้า

  // ✅ ถ้ายังโหลดอยู่ให้โชว์ splash หนึ่งครั้ง
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center text-yellow-400">
        <img
          src="/heng-logo.png"
          alt="HENG Logo"
          className="w-16 h-16 mb-4 animate-pulse"
        />
        <p className="text-lg font-semibold">
          ⚡ กำลังโหลดระบบ HENG-HUB Wallet...
        </p>
      </div>
    );
  }

  // ✅ หลังโหลดเสร็จแล้ว แสดงเนื้อหาจริง
  return (
    <div className="text-center text-yellow-300 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold glow mb-6">💰 HENG WALLET</h1>
      <p className="text-gray-300">ยอดเงินในบัญชี: 0 THB</p>
      <div className="flex space-x-4 mt-6">
        <button className="btn-heng">เติมเงิน</button>
        <button className="btn-dark">ถอนเงิน</button>
      </div>
      <Link to="/" className="btn-dark mt-8">
        กลับหน้าแรก
      </Link>
    </div>
  );
}