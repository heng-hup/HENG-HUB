import React, { useState, useEffect } from "react";
import axios from "axios";
import GlobalPanel from "../components/GlobalPanel";
import Navbar from "../components/Navbar";
import HENGAIButton from "../components/HENGAIButton";

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
        console.error("🌍 Error fetching GlobalHub:", err);
      }
    };
    fetchGlobalData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-yellow-300">
      <header className="p-4 text-center text-2xl font-bold border-b border-yellow-500">
        🌍 HENG GLOBAL HUB
      </header>

      <div className="p-4 flex justify-around border-b border-yellow-500/40 text-sm">
        <button
          onClick={() => setTab("news")}
          className={`${tab === "news" ? "text-yellow-400 font-bold" : "text-gray-400"}`}
        >
          ข่าวโลก
        </button>
        <button
          onClick={() => setTab("services")}
          className={`${tab === "services" ? "text-yellow-400 font-bold" : "text-gray-400"}`}
        >
          ระบบทั่วโลก
        </button>
        <button
          onClick={() => setTab("status")}
          className={`${tab === "status" ? "text-yellow-400 font-bold" : "text-gray-400"}`}
        >
          สถานะระบบ
        </button>
      </div>

      <GlobalPanel tab={tab} news={news} services={services} />
      <Navbar activeTab="globalhub" onChange={() => {}} />
      <HENGAIButton />
    </div>
  );
};

export default GlobalHub;