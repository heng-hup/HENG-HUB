import React, { useState } from "react";
import { FaHome, FaStore, FaPlusCircle, FaPhoneAlt, FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-gray-900/95 to-gray-800/90 backdrop-blur-md border-t border-yellow-400/20 flex justify-around items-center py-3 z-50">
      {/* 🏠 หน้าหลัก */}
      <Link
        to="/"
        onClick={() => setActiveTab("feed")}
        className={`flex flex-col items-center ${
          activeTab === "feed" ? "text-yellow-400" : "text-gray-400"
        }`}
      >
        <FaHome size={22} />
        <span className="text-xs mt-1">หน้าหลัก</span>
      </Link>

      {/* 🛍 ร้านค้า */}
      <Link
        to="/market"
        onClick={() => setActiveTab("market")}
        className={`flex flex-col items-center ${
          activeTab === "market" ? "text-yellow-400" : "text-gray-400"
        }`}
      >
        <FaStore size={22} />
        <span className="text-xs mt-1">ร้านค้า</span>
      </Link>

      {/* ➕ ปุ่มกลาง */}
      <div className="relative -top-5">
        <button
          onClick={() => setActiveTab("plus")}
          className="bg-yellow-400 text-black p-4 rounded-full shadow-[0_0_15px_#facc15] border-4 border-black hover:scale-110 transition"
        >
          <FaPlusCircle size={30} />
        </button>
      </div>

      {/* 💬 แชท & โทร */}
      <Link
        to="/chat"
        onClick={() => setActiveTab("chat")}
        className={`flex flex-col items-center ${
          activeTab === "chat" ? "text-yellow-400" : "text-gray-400"
        }`}
      >
        <FaPhoneAlt size={22} />
        <span className="text-xs mt-1">แชท & โทร</span>
      </Link>

      {/* 💰 กระเป๋า */}
      <Link
        to="/wallet"
        onClick={() => setActiveTab("wallet")}
        className={`flex flex-col items-center ${
          activeTab === "wallet" ? "text-yellow-400" : "text-gray-400"
        }`}
      >
        <FaWallet size={22} />
        <span className="text-xs mt-1">กระเป๋า</span>
      </Link>
    </nav>
  );
}