import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'  
import './index.css'

// --- ⚡️ ระบบ HENG HENG PWA Service Worker ---
const registerHengHengPWA = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('⚡️ HENG HENG PWA: ระบบพร้อมใช้งาน', registration.scope);
        })
        .catch(error => {
          console.error('❌ HENG HENG PWA: การลงทะเบียนล้มเหลว', error);
        });
    });
  }
};

registerHengHengPWA();

// --- 🌐 การจัดการ Routing ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ✅ จุดสำคัญ: ใช้ path="*" เพื่อให้ App.jsx รับผิดชอบทุก URL 
          วิธีนี้จะช่วยแก้ปัญหาหน้าขาวเวลาคุณนัตกด Refresh ที่หน้าอื่น 
        */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
