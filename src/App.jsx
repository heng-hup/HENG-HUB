import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { CartProvider } from './context/CartContext.jsx';
import CartPage from './pages/CartPage.jsx';

import Home from './pages/home'; 
import ProfileContent from './pages/Profile'; 
import Register from './pages/Register'; 
import ForgotPassword from './pages/ForgotPassword';
import Shop from './pages/Shop'; 

// 📍 นำเข้าหน้า 1,000 ปุ่ม (ศูนย์จัดการบริการ)
import ProfileGrid from './components/Profile/ProfileGrid';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const navigate = useNavigate();

  // 📍 ส่วนพิกัดที่อยู่ (State กลาง)
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressList, setShowAddressList] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleCreateContent = () => {
    alert("เปิดกล้อง: ไลฟ์สด / ถ่ายภาพ / ถ่ายคลิป");
    // อนาคต: พี่สามารถเขียน navigate('/create') เพื่อไปหน้าถ่ายคลิปปักตะกร้าได้ครับ
  };

  const goToPage = (page, path) => {
    setActiveTab(page);
    navigate(path);
  };

  return (
    <CartProvider>
      <div style={styles.fullScreen}>
        
        <div style={styles.contentArea}>
          <Routes>
            {/* 🎥 หน้าหลัก: ฟีด Content & ค้นหาบริการ */}
            <Route path="/" element={
              <Home 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn} 
                runInstall={() => deferredPrompt?.prompt()} 
              />
            } />

            {/* 🛒 หน้า Shop: สำหรับสั่งซื้อสินค้าที่ปักตะกร้า */}
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

            {/* 👤 หน้า Profile: ศูนย์บัญชาการ (ถอนเงิน/จัดการข้อมูล) */}
            <Route path="/profile" element={<ProfileContent />} />

            {/* ⚙️ หน้าจัดการบริการทั้งหมด (1,000 ปุ่ม): ซ่อนไว้เปิดจากหน้า Profile */}
            <Route path="/all-buttons" element={<ProfileGrid />} />

            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>

        {/* --- ส่วนจัดการเมนูด้านล่าง (ห้ามเปลี่ยนตำแหน่ง) --- */}
        <div style={styles.bottomNav}>
          {/* 1. หน้าหลัก */}
          <div style={styles.navItem} onClick={() => goToPage('home', '/')}>
            <span style={{...styles.navIcon, color: activeTab === 'home' ? '#00338D' : '#666'}}>🏠</span>
            <span style={{...styles.navLabel, color: activeTab === 'home' ? '#00338D' : '#666'}}>หน้าหลัก</span>
          </div>
          
          {/* 2. ร้านค้า */}
          <div style={styles.navItem} onClick={() => goToPage('shop', '/shop')}>
            <span style={{...styles.navIcon, color: activeTab === 'shop' ? '#00338D' : '#666'}}>🛒</span>
            <span style={{...styles.navLabel, color: activeTab === 'shop' ? '#00338D' : '#666'}}>ร้านค้า</span>
          </div>

          {/* 3. ปุ่มกลาง: ⚡️ ไลฟ์สด/ถ่ายคลิป */}
          <div style={styles.navItem} onClick={handleCreateContent}>
            <div style={styles.hengButtonContainer}>
              <div style={styles.hengInnerGradient}>
                <span style={styles.centerIcon}>⚡️</span>
              </div>
            </div>
          </div>

          {/* 4. แชท/โทร (ตำแหน่งเดิมเป๊ะ) */}
          <div style={styles.navItem} onClick={() => goToPage('chat', '/')}>
            <span style={{...styles.navIcon, color: activeTab === 'chat' ? '#00338D' : '#666'}}>📞</span>
            <span style={{...styles.navLabel, color: activeTab === 'chat' ? '#00338D' : '#666'}}>แชท/โทร</span>
          </div>

          {/* 5. โปรไฟล์ */}
          <div style={styles.navItem} onClick={() => goToPage('profile', '/profile')}>
            <span style={{...styles.navIcon, color: activeTab === 'profile' ? '#00338D' : '#666'}}>👤</span>
            <span style={{...styles.navLabel, color: activeTab === 'profile' ? '#00338D' : '#666'}}>โปรไฟล์</span>
          </div>
        </div>
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
