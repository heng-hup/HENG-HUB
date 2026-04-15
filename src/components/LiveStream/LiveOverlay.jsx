import React from 'react';

const LiveOverlay = ({ isHost, onLeave }) => {
  return (
    <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between" style={{ zIndex: 10 }}>
      {/* ส่วนบน: ข้อมูลโปรไฟล์และคนดู */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="flex items-center bg-black/40 rounded-full p-1 pr-3 border border-white/20">
          <div className="w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black border-2 border-white">H</div>
          <div className="ml-2 text-white">
            <p className="text-xs font-bold leading-none">HENG HENG LIVE</p>
            <p className="text-[10px] opacity-80">👁️ 1.2k</p>
          </div>
        </div>
        <button 
          onClick={onLeave} 
          className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-full text-white text-xl border border-white/20"
        >✕</button>
      </div>

      {/* ส่วนล่าง: คอมเมนต์และปุ่มฟังก์ชัน */}
      <div className="flex justify-between items-end pointer-events-auto">
        <div className="w-2/3 max-h-48 overflow-hidden flex flex-col justify-end space-y-2 pb-4">
          <div className="bg-black/30 p-2 rounded-lg text-xs text-white">
            <span className="text-yellow-400 font-bold">System:</span> ยินดีต้อนรับสู่ HENG HENG Live!
          </div>
          <div className="bg-black/30 p-2 rounded-lg text-xs text-white">
            <span className="text-blue-300 font-bold">User88:</span> สนใจประกันรถยนต์ 🚗
          </div>
        </div>

        <div className="flex flex-col space-y-4 mb-4">
          <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">❤️</button>
          <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">💬</button>
          <button className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center text-3xl shadow-lg animate-bounce">🎁</button>
        </div>
      </div>
    </div>
  );
};

export default LiveOverlay;
