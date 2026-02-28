import React from "react";

const GlobalNewsCard = ({ title, source, country }) => {
  return (
    <div className="bg-gray-900 border border-yellow-500 rounded-xl p-3">
      <div className="font-bold text-yellow-400">{title}</div>
      <div className="text-sm text-gray-400 mt-1">
        จาก: {source} 🌏 {country}
      </div>
    </div>
  );
};

export default GlobalNewsCard;