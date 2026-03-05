import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ นำเข้า 3 หน้า
import Landing from "../pages/index.jsx";
import Wallet from "../pages/wallet.jsx";
import Market from "../pages/market.jsx"; // ✅ เพิ่มบรรทัดนี้

import "../styles/Landing.module.css";

// ✅ สร้าง root render และเส้นทางทั้งหมด
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/market" element={<Market />} /> {/* ✅ เพิ่ม route นี้ */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);