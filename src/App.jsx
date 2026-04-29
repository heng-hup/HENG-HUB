import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// --- [Context & Components] ---
import { CartProvider } from './context/CartContext.jsx';
import CartPage from './pages/CartPage.jsx';
import Home from './pages/home'; 
import ProfileContent from './pages/Profile'; 
import Register from './pages/Register'; 
import ForgotPassword from './pages/ForgotPassword';
import Shop from './pages/Shop'; 
import ProfileGrid from './components/Profile/ProfileGrid';
import LivePage from './pages/LivePage';

// ⚡️ กล้องระบบปุ่มกลาง
import CameraOverlay from './components/CenterButtonSystem/CameraOverlay';

// 💬 หน้าแชทตัวท็อป (เปลี่ยนชื่อจาก แชท.jsx มาเป็น ChatPage)
import ChatPage from './chat'; 

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 📍 State กล้อง (ปุ่มกลาง)
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // 📍 State ที่อยู่
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressList, setShowAddressList] = useState(false);

  // 🔗 ฟังก์ชันนำทาง
  const goToPage = (path) => navigate(path);

  // ✅ ฟังก์ชันเช็คสีปุ่ม Active (#00338D คือสีน้ำเงินเข้มของพี่)
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
              />
            } />

            {/* 🛒 ร้านค้า & ตระกร้า */}
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

            {/* 💬 หน้าแชทหลัก (ดึงข้อมูลย่อยจาก chat.jsx มาแสดงที่นี่) */}
            <Route path="/chat" element={<ChatPage />} />

            {/* 👤 โปรไฟล์ & ลงทะเบียน */}
            <Route path="/profile" element={<ProfileContent />} />
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* ⚙️ บริการอื่นๆ & Live */}
            <Route path="/all-buttons" element={<ProfileGrid />} />
            <Route path="/live-feed" element={<LivePage />} />
          </Routes>
        </div>

        {/* --- 📱 เมนู Bottom Nav (ฉบับสมบูรณ์) --- */}
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

          {/* 3. ปุ่มกลาง ⚡️ (เปิดกล้องทันที) */}
          <div style={styles.navItem} onClick={() => setIsCameraOpen(true)}>
            <div style={styles.hengButtonContainer}>
              <div style={styles.hengInnerGradient}>
                <span style={styles.centerIcon}>⚡️</span>
              </div>
            </div>
          </div>

          {/* 4. แชท/โทร (ลิงก์เข้าสู่ระบบแชท 20 ปุ่มของพี่นัท) */}
          <div style={styles.navItem} onClick={() => goToPage('/chat')}>
            <span style={{...styles.navIcon, color: getActiveColor('/chat')}}>📞</span>
            <span style={{...styles.navLabel, color: getActiveColor('/chat')}}>แชท/โทร</span>
          </div>

          {/* 5. โปรไฟล์ */}
          <div style={styles.navItem} onClick={() => goToPage('/profile')}>
            <span style={{...styles.navIcon, color: getActiveColor('/profile')}}>👤</span>
            <span style={{...styles.navLabel, color: getActiveColor('/profile')}}>โปรไฟล์</span>
          </div>
        </div>

        {/* 🎥 Overlay กล้องตัวจบ (กดปุ๊บเด้งปั๊บ ทับทุกหน้า) */}
        {isCameraOpen && (
          <CameraOverlay 
            onClose={() => setIsCameraOpen(false)} 
            onNavigateToPost={(data) => {
               console.log("พร้อมโพสต์:", data);
               setIsCameraOpen(false);
               navigate('/'); 
            }} 
          />
        )}

      </div>
    </CartProvider>
  );
}

// --- [Styles ปรับแต่งให้รองรับทั้งคอมและมือถือ] ---
const styles = {
  fullScreen: { 
    background: '#FFFFFF', 
    width: '100vw',        // ใช้ความกว้างเต็มหน้าจออุปกรณ์
    maxWidth: '100%',      // ป้องกันการล้น
    height: '100vh', 
    display: 'flex', 
    flexDirection: 'column', 
    overflow: 'hidden', 
    fontFamily: 'Kanit, sans-serif',
    margin: '0 auto',      // จัดกลางหน้าจอเสมอ
    boxSizing: 'border-box'
  },
  contentArea: { 
    flex: 1, 
    overflowY: 'auto', 
    paddingBottom: '70px',  // เว้นที่ให้ Bottom Nav ไม่บังเนื้อหา
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  bottomNav: { 
    position: 'fixed', 
    bottom: 0, 
    left: '50%',           // เทคนิคจัดกลางสำหรับจอคอม
    transform: 'translateX(-50%)',
    width: '100%', 
    maxWidth: '100%',      // ให้กว้างตามจอจริง
    height: '65px', 
    background: 'white', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-around', 
    borderTop: '1.2px solid #F2D06B', 
    zIndex: 1000,
    paddingBottom: 'env(safe-area-inset-bottom)' // รองรับ iPhone รุ่นใหม่
  },
  navItem: { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1, 
    cursor: 'pointer',
    height: '100%'
  },
  navIcon: { fontSize: '24px' }, 
  navLabel: { fontSize: '10px', fontWeight: '600' },
  hengButtonContainer: { 
    background: 'white', 
    padding: '2px', 
    borderRadius: '10px', 
    width: '50px', 
    height: '38px', 
    border: '1px solid #D4AF37', 
    cursor: 'pointer', 
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)' 
  },
  hengInnerGradient: { 
    width: '100%', 
    height: '100%', 
    background: '#00338D', // สีกรมล้วน
    borderRadius: '8px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  centerIcon: { 
    fontSize: '22px',
    color: '#F2D06B' // สายฟ้าสีเหลืองทอง
  }, 
};
