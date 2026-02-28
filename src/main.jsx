import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ นำเข้าหน้าทั้งหมด
import Landing from "./pages/index.jsx";   // หน้าแรก (Feed)
import Market from "./pages/market.jsx";   // หน้าตลาด
import Wallet from "./pages/wallet.jsx";   // หน้ากระเป๋าเงิน
import ChatCall from "./pages/chatcall.jsx"; // หน้าแชต & โทร

// ✅ นำเข้า CSS หลัก
import "./styles/globals.css";

// ✅ Render หลัก (ไม่มี StrictMode ป้องกัน useEffect ซ้ำ)
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/market" element={<Market />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/chat" element={<ChatCall />} />
    </Routes>
  </BrowserRouter>
);