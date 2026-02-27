import React from "react";

const CallPanel = ({ onStartCall, onStartVideo }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">📞 HENG CALL</h2>
      <p className="text-gray-300 mb-6">โทรฟรีผ่านระบบ HENG CHAT & CALL</p>
      <div className="flex justify-center gap-6">
        <button
          onClick={onStartCall}
          className="bg-yellow-400 text-black px-6 py-2 rounded-full shadow-md hover:bg-yellow-500"
        >
          โทรด้วยเสียง
        </button>
        <button
          onClick={onStartVideo}
          className="bg-yellow-600 text-black px-6 py-2 rounded-full shadow-md hover:bg-yellow-700"
        >
          วิดีโอคอล
        </button>
      </div>
    </div>
  );
};

export default CallPanel;