import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ import หน้าเว็บทั้งหมด
import Landing from "./pages/index.jsx";
import Wallet from "./pages/wallet.jsx";
import Market from "./pages/market.jsx";
import GlobalHub from "./pages/globalhub.jsx";
import ChatCall from "./pages/chatcall.jsx";
import PostFeed from "./pages/PostFeed.jsx";

// ✅ import style
import "./styles/Landing.module.css";

// ✅ render ระบบทั้งหมด
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* หน้าแรก */}
        <Route path="/" element={<Landing />} />

        {/* กระเป๋าเงิน */}
        <Route path="/wallet" element={<Wallet />} />

        {/* ตลาด */}
        <Route path="/market" element={<Market />} />

        {/* Social Hub */}
        <Route path="/hub" element={<GlobalHub />} />

        {/* Chat / Call */}
        <Route path="/chat" element={<ChatCall />} />

        {/* Feed */}
        <Route path="/feed" element={<PostFeed />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);