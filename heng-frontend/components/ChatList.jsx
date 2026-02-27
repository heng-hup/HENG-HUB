import React from "react";

const ChatList = ({ chats = [], onSelect }) => {
  const sampleChats = chats.length
    ? chats
    : [
        { name: "นัต", last: "ไปกินข้าวไหม 🍜", time: "21:35" },
        { name: "ออม", last: "ทำงานเสร็จยัง 😘", time: "20:48" },
        { name: "hengcoin.com", last: "ขอบคุณที่ใช้ HENG 💛", time: "18:00" },
      ];

  return (
    <div className="w-full h-full overflow-y-auto bg-gradient-to-b from-gray-950 to-black text-yellow-300 rounded-2xl p-2">
      {sampleChats.map((c, i) => (
        <div
          key={i}
          onClick={() => onSelect(c)}
          className="flex justify-between items-center p-3 mb-2 bg-gray-800 rounded-xl cursor-pointer hover:bg-yellow-400 hover:text-black transition"
        >
          <div>
            <div className="font-bold">{c.name}</div>
            <div className="text-sm opacity-75">{c.last}</div>
          </div>
          <div className="text-xs">{c.time}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;