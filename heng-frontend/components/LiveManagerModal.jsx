import React, { useState } from "react";

const LiveManagerModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [live, setLive] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center text-yellow-300 p-6">
      {!live ? (
        <>
          <h2 className="text-2xl font-bold mb-4">🎬 เริ่ม Live ขายของ</h2>
          <input
            type="text"
            value={title}
            placeholder="ชื่อไลฟ์..."
            onChange={(e) => setTitle(e.target.value)}
            className="w-80 p-2 mb-4 rounded-lg bg-gray-800 text-white"
          />
          <button
            onClick={() => setLive(true)}
            className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500"
          >
            เริ่ม Live
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl mb-4 font-bold">🔴 Live: {title}</h2>
          <p className="mb-4">กำลังถ่ายทอดสดสู่ลูกค้าทั่วโลก...</p>
          <button
            onClick={onClose}
            className="bg-red-600 px-5 py-2 rounded-full hover:bg-red-700"
          >
            จบ Live
          </button>
        </>
      )}
    </div>
  );
};

export default LiveManagerModal;