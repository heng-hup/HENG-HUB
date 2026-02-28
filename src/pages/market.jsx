import React from "react";
import { Link } from "react-router-dom";

export default function Market() {
  return (
    <div className="text-center text-yellow-300 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold glow mb-6">🛍️ HENG MARKET</h1>
      <p className="text-gray-300">ตลาดกลางของ HENG พร้อม cashback และ point</p>
      <Link to="/" className="btn-dark mt-6">กลับหน้าแรก</Link>
    </div>
  );
}