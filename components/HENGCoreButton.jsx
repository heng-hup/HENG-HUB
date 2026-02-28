// heng/frontend/components/HENGCoreButton.jsx
import { useState } from "react";
import { FaBolt, FaComments, FaPhoneAlt, FaVideo, FaFileAlt } from "react-icons/fa";

export default function HENGCoreButton({ onAction }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex flex-col items-center">
      {open && (
        <div className="absolute -top-28 flex flex-col items-center gap-2 bg-black/50 p-2 rounded">
          <button onClick={()=>{ setOpen(false); onAction("chat"); }} className="text-yellow-300 flex items-center gap-2 px-3 py-2 rounded"> <FaComments/> Chat</button>
          <button onClick={()=>{ setOpen(false); onAction("call"); }} className="text-yellow-300 flex items-center gap-2 px-3 py-2 rounded"> <FaPhoneAlt/> Call</button>
          <button onClick={()=>{ setOpen(false); onAction("live"); }} className="text-yellow-300 flex items-center gap-2 px-3 py-2 rounded"> <FaVideo/> Live</button>
          <button onClick={()=>{ setOpen(false); onAction("notes"); }} className="text-yellow-300 flex items-center gap-2 px-3 py-2 rounded"> <FaFileAlt/> Notes</button>
        </div>
      )}
      <button onClick={()=>setOpen(!open)} className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg flex items-center justify-center">
        <FaBolt size={22} className="text-black"/>
      </button>
    </div>
  );
}