import React, { useState, useEffect } from "react";
import axios from "axios";

const GlobalHub = () => {
  const [tab, setTab] = useState("news");
  const [news, setNews] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const newsRes = await axios.get("/api/ai/global-news");
        const srvRes = await axios.get("/api/ai/global-services");

        setNews(newsRes.data || []);
        setServices(srvRes.data || []);
      } catch (err) {
        console.error("GlobalHub Error:", err);
      }
    };

    fetchGlobalData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-yellow-300">

      {/* Header */}
      <header className="p-4 text-center text-2xl font-bold border-b border-yellow-500">
        🌍 HENG GLOBAL HUB
      </header>

      {/* Tabs */}
      <div className="p-4 flex justify-around border-b border-yellow-500/40 text-sm">
        <button
          onClick={() => setTab("news")}
          className={tab === "news" ? "text-yellow-400 font-bold" : "text-gray-400"}
        >
          ข่าวโลก
        </button>

        <button
          onClick={() => setTab("services")}
          className={tab === "services" ? "text-yellow-400 font-bold" : "text-gray-400"}
        >
          ระบบทั่วโลก
        </button>

        <button
          onClick={() => setTab("status")}
          className={tab === "status" ? "text-yellow-400 font-bold" : "text-gray-400"}
        >
          สถานะระบบ
        </button>
      </div>

      {/* Content */}
      <div className="p-6">

        {tab === "news" && (
          <div>
            <h2 className="text-xl mb-4">🌍 ข่าวทั่วโลก</h2>

            {news.length === 0 ? (
              <p className="text-gray-400">ยังไม่มีข่าว</p>
            ) : (
              news.map((n, i) => (
                <div
                  key={i}
                  className="p-4 mb-3 bg-gray-800 rounded-xl"
                >
                  {n.title || JSON.stringify(n)}
                </div>
              ))
            )}
          </div>
        )}

        {tab === "services" && (
          <div>
            <h2 className="text-xl mb-4">🛰️ ระบบบริการทั่วโลก</h2>

            {services.length === 0 ? (
              <p className="text-gray-400">ยังไม่มีข้อมูลบริการ</p>
            ) : (
              services.map((s, i) => (
                <div
                  key={i}
                  className="p-4 mb-3 bg-gray-800 rounded-xl"
                >
                  {s.name || JSON.stringify(s)}
                </div>
              ))
            )}
          </div>
        )}

        {tab === "status" && (
          <div>
            <h2 className="text-xl mb-4">⚙️ สถานะระบบ</h2>
            <div className="p-4 bg-gray-800 rounded-xl">
              ระบบ HENG Global Online
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default GlobalHub;