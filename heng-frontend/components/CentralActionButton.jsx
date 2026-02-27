import { useState, useRef, useEffect } from "react";
import { FaPlusCircle, FaVideo, FaRegImage, FaBroadcastTower } from "react-icons/fa";

/**
 * CentralActionButton
 * - tap => open PostModal (short press)
 * - long-press (hold > 500ms) => open LiveManagerModal
 * - small ring/menu when opened
 *
 * props:
 *  onOpenPost()
 *  onOpenLive()
 */
export default function CentralActionButton({ onOpenPost, onOpenLive }) {
  const [pressed, setPressed] = useState(false);
  const [active, setActive] = useState(false); // menu visible
  const timerRef = useRef(null);

  // long press detection
  const startPress = () => {
    setPressed(true);
    timerRef.current = setTimeout(() => {
      setActive(true);
      setPressed(false);
      onOpenLive && onOpenLive();
    }, 600); // long press threshold
  };

  const cancelPress = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (pressed) {
      // short tap
      onOpenPost && onOpenPost();
    }
    setPressed(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="relative">
      {/* floating menu when active (small quick actions) */}
      {active && (
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 bg-black/60 backdrop-blur rounded-full p-2 shadow-lg border border-yellow-400/20">
          <button
            onClick={() => { setActive(false); onOpenPost && onOpenPost("camera"); }}
            className="flex flex-col items-center text-yellow-300 hover:text-yellow-100 p-2"
            aria-label="โพสต์รูป/กล้อง"
          >
            <FaVideo size={18} />
            <span className="text-[10px] mt-1">Video</span>
          </button>

          <button
            onClick={() => { setActive(false); onOpenPost && onOpenPost("gallery"); }}
            className="flex flex-col items-center text-yellow-300 hover:text-yellow-100 p-2"
            aria-label="อัปโหลดภาพ"
          >
            <FaRegImage size={18} />
            <span className="text-[10px] mt-1">Gallery</span>
          </button>

          <button
            onClick={() => { setActive(false); onOpenLive && onOpenLive(); }}
            className="flex flex-col items-center text-yellow-300 hover:text-yellow-100 p-2"
            aria-label="เริ่มไลฟ์"
          >
            <FaBroadcastTower size={18} />
            <span className="text-[10px] mt-1">Live</span>
          </button>

          <button
            onClick={() => setActive(false)}
            className="ml-1 text-gray-300 px-2"
            aria-label="ปิดเมนู"
          >
            ✕
          </button>
        </div>
      )}

      {/* central button */}
      <button
        onMouseDown={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={() => { if (pressed) cancelPress(); }}
        onTouchStart={startPress}
        onTouchEnd={cancelPress}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(250,200,30,0.25)] transition-transform ${
          active ? "scale-105 ring-4 ring-yellow-400/30" : "hover:scale-105"
        }`}
        aria-label="Action center: tap to post, hold to live"
        >
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-full h-full rounded-full flex items-center justify-center">
          <FaPlusCircle size={26} className="text-black" />
        </div>
      </button>
    </div>
  );
}