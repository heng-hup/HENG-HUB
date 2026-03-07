import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Feed from "./pages/Feed.jsx";
import Video from "./pages/Video.jsx";
import Market from "./pages/Market.jsx";
import Wallet from "./pages/Wallet.jsx";
import Profile from "./pages/Profile.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/video" element={<Video />} />
        <Route path="/market" element={<Market />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);