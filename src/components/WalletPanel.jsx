import React, { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const WalletPanel = () => {
  const [userData, setUserData] = useState({ 
    พอยท์: 0, 
    ภาษีสะสม: 0, 
    สถานะ: "กำลังโหลด..." 
  });
  
  const [history] = useState([
    { type: "ระบบใหม่", amount: 0, date: "Firebase Active" },
  ]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // ดึงข้อมูล Real-time จากลิ้นชัก "users"
      const unsub = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      });
      return () => unsub(); 
    }
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-yellow-300 h-full rounded-2xl border-2 border-yellow-600/30 shadow-2xl">
      {/* หัวข้อชื่อมงคล */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-yellow-500/20 pb-2">
        🧧 กระเป๋าตังค์เฮงเฮง
      </h2>
      
      {/* ส่วนแสดงพอยท์หลัก */}
      <div className="bg-gradient-to-br from-gray-800 to-black p-5 rounded-xl border border-yellow-500/40 mb-4 shadow-inner">
        <div className="text-xs uppercase tracking-tighter opacity-70 mb-1 text-white">ยอดพอยท์คงเหลือ</div>
        <div className="text-5xl font-black text-green-400 drop-shadow-md">
          {userData.พอยท์?.toLocaleString() || 0} <span className="text-xl">PT</span>
        </div>
      </div>

      {/* ส่วนแสดงภาษีและสถานะ */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gray-800/50 p-3 rounded-lg border border-red-500/30">
          <div className="text-[10px] text-white/60 mb-1">ภาษีสะสม (7%)</div>
          <div className="text-xl font-bold text-red-500">
            {userData.ภาษีสะสม?.toLocaleString() || 0} <span className="text-xs">฿</span>
          </div>
        </div>
        <div className="bg-gray-800/50 p-3 rounded-lg border border-blue-500/30">
          <div className="text-[10px] text-white/60 mb-1">สถานะสมาชิก</div>
          <div className="text-sm font-bold text-blue-400 truncate">
            {userData.สถานะ}
          </div>
        </div>
      </div>

      {/* ประวัติรายการ */}
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">บันทึกรายการล่าสุด</p>
        {history.map((h, i) => (
          <div key={i} className="flex justify-between border-b border-yellow-500/10 pb-2 items-center">
            <div className="flex flex-col">
              <span className="text-sm text-white font-medium">{h.type}</span>
              <span className="text-[9px] opacity-50">{h.date}</span>
            </div>
            <span className="text-green-400 font-mono text-sm">
              +{h.amount} PT
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 p-2 bg-yellow-500/5 rounded-md border border-yellow-500/10 text-[9px] text-center text-yellow-500/40 italic">
        "เฮง เฮง 88 ระบบพอยท์อัตโนมัติ 24 ชม."
      </div>
    </div>
  );
};

export default WalletPanel;
