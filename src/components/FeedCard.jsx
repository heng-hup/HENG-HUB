import React from "react";

const FeedCard = ({ name, content, emoji }) => {
  return (
    <div className="bg-gray-800 border border-yellow-500 rounded-xl p-4 mb-3 text-yellow-300 shadow-md hover:scale-[1.01] transition">
      <div className="font-bold text-lg mb-1">{name}</div>
      <div className="text-sm text-gray-200">{content}</div>
      <div className="mt-2 text-right text-xl">{emoji}</div>
    </div>
  );
};

export default FeedCard;