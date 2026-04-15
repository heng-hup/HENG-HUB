import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { CartProvider } from './context/CartContext.jsx';
import CartPage from './pages/CartPage.jsx';

import Home from './pages/home'; 
import ProfileContent from './pages/Profile'; 
import Register from './pages/Register'; 
import ForgotPassword from './pages/ForgotPassword';
import Shop from './pages/Shop'; 

// 📍 นำเข้าหน้า 1,000 ปุ่ม (ศูนย์จัดการบริการ)
import ProfileGrid from './components/Profile/ProfileGrid';

// ⚡️ นำเข้าหน้ากล้องระบบปุ่มกลางที่สร้างไว้
import CameraOverlay from './components/CenterButtonSystem/CameraOverlay';

// 🎬 นำเข้าส่วนระบบ Live ที่สร้างใหม่ (เพิ่มเข้าไป)
import HostView from './components/LiveStream/HostView';
import LivePage from './pages/LivePage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // 📍 ตัวเช็คตำแหน่งลิงก์ปัจจุบันเพื่อเปลี่ยนสีปุ่ม

  // 📍 State สำหรับเปิด/ปิดหน้ากล้อง (ปุ่มกลาง)
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // 📍 ส่วนพิกัดที่อยู่ (State กลาง)
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressList, setShowAddressList] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  // 🔗 ฟังก์ชันสำหรับ Link ไปหน้าต่างๆ และอัปเดตสถานะปุ่ม
  const goToPage = (path) => {
    navigate(path);
  };

  // ✅ ฟังก์ชันเช็คสีไอคอนและชื่อปุ่มตามลิงก์ที่อยู่จริง (สีน้ำเงิน #00338D เมื่อ Active)
  const getActiveColor = (path) => location.pathname === path ? '#00338D' : '#666';

  return (
    <CartProvider>
      <div style={styles.fullScreen}>
        
        <div style={styles.contentArea}>
          <Routes>
            {/* 🎥 หน้าหลัก */}
            <Route path="/" element={
              <Home 
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn} 
                runInstall={() => deferredPrompt?.prompt()} 
              />
            } />

            {/* 🛒 หน้า Shop */}
            <Route path="/shop" element={
              <Shop 
                isLoggedIn={isLoggedIn} 
                selectedAddress={selectedAddress}
                setShowAddressList={setShowAddressList}
              />
            } />
            
            <Route path="/cart" element={
              <CartPage 
                selectedAddress={selectedAddress}
                setShowAddressList={setShowAddressList}
              />
            } />

            {/* 👤 หน้า Profile */}
            <Route path="/profile" element={<ProfileContent />} />

            {/* ⚙️ หน้าจัดการบริการทั้งหมด (ลิงก์จากแชท/โทร) */}
            <Route path="/all-buttons" element={<ProfileGrid />} />

            {/* ⚡️ หน้าลิงก์สำหรับปุ่มกลาง: ปรับให้แสดง HostView สำหรับการไลฟ์ */}
            <Route path="/create" element={<HostView />} />
            
            {/* 📺 หน้าฟีดรวม Live */}
            <Route path="/live-feed" element={<LivePage />} />

            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>

        {/* --- ส่วนจัดการเมนูด้านล่าง: ทุกปุ่มคือลิงก์เข้าหน้ามันเลย --- */}
        <div style={styles.bottomNav}>
          
          {/* 1. หน้าหลัก */}
          <div style={styles.navItem} onClick={() => goToPage('/')}>
            <span style={{...styles.navIcon, color: getActiveColor('/')}}>🏠</span>
            <span style={{...styles.navLabel, color: getActiveColor('/')}}>หน้าหลัก</span>
          </div>
          
          {/* 2. ร้านค้า */}
          <div style={styles.navItem} onClick={() => goToPage('/shop')}>
            <span style={{...styles.navIcon, color: getActiveColor('/shop')}}>🛒</span>
            <span style={{...styles.navLabel, color: getActiveColor('/shop')}}>ร้านค้า</span>
          </div>

          {/* 3. ปุ่มกลาง: ⚡️ กดแล้ว Link ไปหน้า /create (เข้าหน้าไลฟ์) */}
          <div style={styles.navItem} onClick={() => { goToPage('/create'); }}>
            <div style={styles.hengButtonContainer}>
              <div style={styles.hengInnerGradient}>
                <span style={styles.centerIcon}>⚡️</span>
              </div>
            </div>
          </div>

          {/* 4. แชท/โทร (Link ไปหน้าบริการทั้งหมด) */}
          <div style={styles.navItem} onClick={() => goToPage('/all-buttons')}>
            <span style={{...styles.navIcon, color: getActiveColor('/all-buttons')}}>📞</span>
            <span style={{...styles.navLabel, color: getActiveColor('/all-buttons')}}>แชท/โทร</span>
          </div>

          {/* 5. โปรไฟล์ */}
          <div style={styles.navItem} onClick={() => goToPage('/profile')}>
            <span style={{...styles.navIcon, color: getActiveColor('/profile')}}>👤</span>
            <span style={{...styles.navLabel, color: getActiveColor('/profile')}}>โปรไฟล์</span>
          </div>
        </div>

        {/* 🎥 แสดงหน้ากล้อง Overlay เมื่อเปิดใช้งาน (คงไว้ตามเดิม) */}
        {isCameraOpen && (
          <CameraOverlay onClose={() => setIsCameraOpen(false)} />
        )}

      </div>
    </CartProvider>
  );
}

const styles = {
  fullScreen: { background: '#FFFFFF', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'Kanit, sans-serif' },
  contentArea: { flex: 1, overflowY: 'auto', paddingBottom: '65px' },
  bottomNav: { position: 'fixed', bottom: 0, width: '100%', height: '60px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1.2px solid #F2D06B', zIndex: 1000, paddingBottom: '2px' },
  navItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, cursor: 'pointer', height: '100%' },
  navIcon: { fontSize: '24px', marginBottom: '1px' }, 
  navLabel: { fontSize: '10px', fontWeight: '600', letterSpacing: '0.2px' },
  hengButtonContainer: { background: 'white', padding: '2px', borderRadius: '10px', width: '50px', height: '38px', border: '1px solid #D4AF37', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0px' },
  hengInnerGradient: { width: '100%', height: '100%', background: 'linear-gradient(135deg, #00338D 50%, #F2D06B 50%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  centerIcon: { fontSize: '22px' }, 
};
