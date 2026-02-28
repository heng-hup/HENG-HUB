import React from "react";
import BottomNav from "../components/BottomNav";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-gray-950 to-black text-white relative">
      {/* 🔱 โลโก้และชื่อ HENG HENG */}
      <header className="text-center mt-[-90px] mb-2">
        <h1 className="text-5xl font-extrabold text-yellow-400 flex items-center justify-center gap-3 drop-shadow-[0_0_15px_#facc15] tracking-wide">
          ⚡ HENG HENG
        </h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mt-2 rounded-full shadow-[0_0_10px_#facc15]" />
      </header>

      {/* 💬 โพสต์ Feed */}
      <main className="flex flex-col items-center gap-5 px-4 mt-10 mb-20">
        {[
          { name: "Alice", text: "ขอบคุณ HENG ที่เปลี่ยนชีวิตฉัน ❤️" },
          { name: "Bob", text: "ซื้อของใน HENG MARKET แล้วได้ cashback!" },
          { name: "Chen", text: "เจอเพื่อนใหม่ใน HENG CHAT 💬" },
        ].map((item, index) => (
          <div
            key={index}
            className="w-full max-w-md bg-gray-900/80 border border-yellow-400/30 rounded-xl px-5 py-3 shadow-[0_0_10px_#facc15]/20 hover:scale-[1.02] transition-transform duration-300"
          >
            <p className="font-bold text-yellow-300">{item.name}</p>
            <p className="text-gray-200 mt-1">{item.text}</p>
          </div>
        ))}
      </main>

      {/* 📱 แถบเมนูล่าง */}
      <BottomNav />
    </div>
  );
}