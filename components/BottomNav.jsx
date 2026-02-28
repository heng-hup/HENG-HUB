 import React, { useState } from "react";
import { FaHome, FaStore, FaPlusCircle, FaPhoneAlt, FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-gray-900/95 to-gray-800/90 backdrop-blur-md border-t border-yellow-400/20 flex justify-around items-center py-4 z-40 relative">
      {/* ปุ่มฝั่งซ้าย */}
      {[
        { key: "feed", icon: <FaHome size={22} />, label: "Feed", link: "/" },
        { key: "market", icon: <FaStore size={22} />, label: "Market", link: "/market" },
      ].map((tab) => (
        <Link
          key={tab.key}
          to={tab.link}
          onClick={() => setActiveTab(tab.key)}
          className={`relative flex flex-col items-center transition-all duration-300 ${
            activeTab === tab.key
              ? "text-yellow-400 scale-110 drop-shadow-[0_0_10px_#facc15]"
              : "text-gray-400 hover:text-yellow-300"
          }`}
        >
          {tab.icon}
          <span className="text-xs mt-1">{tab.label}</span>
        </Link>
      ))}

      {/* ปุ่มกลาง */}
      <Link
        to="/chat"
        onClick={() => setActiveTab("post")}
        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-black rounded-full p-4 shadow-[0_0_20px_#facc15] transition-all duration-300 hover:scale-110 z-50 border-4 border-gray-900"
      >
        <FaPlusCircle size={32} />
      </Link>

      {/* ปุ่มฝั่งขวา */}
      {[
        { key: "chatcall", icon: <FaPhoneAlt size={22} />, label: "Chat & Call", link: "/chat" },
        { key: "wallet", icon: <FaWallet size={22} />, label: "Wallet", link: "/wallet" },
      ].map((tab) => (
        <Link
          key={tab.key}
          to={tab.link}
          onClick={() => setActiveTab(tab.key)}
          className={`relative flex flex-col items-center transition-all duration-300 ${
            activeTab === tab.key
              ? "text-yellow-400 scale-110 drop-shadow-[0_0_10px_#facc15]"
              : "text-gray-400 hover:text-yellow-300"
          }`}
        >
          {tab.icon}
          <span className="text-xs mt-1">{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
}