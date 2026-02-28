import React from "react";

const GlobalServiceCard = ({ name, region, status }) => {
  return (
    <div className="bg-gray-900 border border-yellow-400 p-3 rounded-lg text-yellow-300">
      <div className="font-bold">{name}</div>
      <div className="text-sm text-gray-400">🌍 ภูมิภาค: {region}</div>
      <div
        className={`mt-1 text-sm ${
          status === "online" ? "text-green-400" : "text-red-400"
        }`}
      >
        ● {status === "online" ? "ออนไลน์" : "ออฟไลน์"}
      </div>
    </div>
  );
};

export default GlobalServiceCard;