import React from "react";
import GlobalNewsCard from "./GlobalNewsCard";
import GlobalServiceCard from "./GlobalServiceCard";

const GlobalPanel = ({ tab, news, services }) => {
  if (tab === "news") {
    return (
      <div className="p-4 space-y-3">
        {news.map((n, i) => (
          <GlobalNewsCard key={i} {...n} />
        ))}
      </div>
    );
  }

  if (tab === "services") {
    return (
      <div className="p-4 grid grid-cols-2 gap-4">
        {services.map((s, i) => (
          <GlobalServiceCard key={i} {...s} />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 text-center">
      <p className="text-gray-300">🛰️ HENG System: Connected</p>
      <p className="text-sm text-green-400 mt-2">
        ทุกระบบออนไลน์ 100% ทั่วโลก
      </p>
    </div>
  );
};

export default GlobalPanel;