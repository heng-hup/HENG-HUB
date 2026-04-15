import React, { useEffect, useRef } from 'react';
import { useAgora } from '../../hooks/useAgora';
import LiveOverlay from './LiveOverlay';

const AudienceView = ({ channelName = "hengheng_live" }) => {
  // ใช้ Hook เดียวกันแต่เรียก joinAsAudience
  const { remoteUsers, isJoin, joinAsAudience, leave } = useAgora();
  const containerRef = useRef(null);

  useEffect(() => {
    // เมื่อเข้าหน้านี้ ให้เข้าร่วมในฐานะคนดูอัตโนมัติ
    joinAsAudience(channelName);

    return () => {
      leave(); // ออกจากห้องเมื่อปิดหน้าจอ
    };
  }, [channelName]);

  useEffect(() => {
    // เมื่อมี Remote User (Host) เข้ามา ให้เล่นวิดีโอใน Container
    const hostUser = remoteUsers[0]; // สมมติว่า 1 ห้องมี 1 Host
    if (hostUser && hostUser.videoTrack && containerRef.current) {
      hostUser.videoTrack.play(containerRef.current);
    }
  }, [remoteUsers]);

  return (
    <div className="relative w-full h-screen bg-black">
      {/* 🎥 พื้นที่แสดงวิดีโอจากคนไลฟ์ */}
      <div 
        ref={containerRef} 
        className="w-full h-full flex items-center justify-center"
      >
        {remoteUsers.length === 0 && isJoin && (
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p>รอคนไลฟ์สักครู่นะครับ...</p>
          </div>
        )}
      </div>

      {/* 📱 UI ซ้อนทับ (ปุ่มเปย์ของขวัญ, แชท, ปุ่มปิด) */}
      <LiveOverlay isHost={false} onLeave={leave} />

      {/* แถบด้านล่างสำหรับพิมพ์แชท (แบบ TikTok) */}
      <div className="absolute bottom-4 left-4 right-16 pointer-events-auto">
        <input 
          type="text" 
          placeholder="ส่งข้อความ..." 
          className="w-full bg-black/40 border border-white/20 rounded-full py-2 px-4 text-white text-sm focus:outline-none focus:border-yellow-400"
        />
      </div>
    </div>
  );
};

export default AudienceView;
