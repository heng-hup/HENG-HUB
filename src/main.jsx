import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'

// นำเข้าไฟล์จริงจากเครื่องคุณ
import Home from './pages/Home'
import Shop from './pages/Shop'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import ChatView from './chat' 

function MainAppShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isCamOn, setIsCamOn] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  // ตรวจสอบว่าอยู่หน้าแชทไหม เพื่อสั่งซ่อนเมนู 5 ปุ่ม
  const isChatPage = location.pathname === '/chat';

  return (
    <div style={styles.appShell}>
       {/* ส่วนแสดงเนื้อหาจากไฟล์จริงใน pages/ */}
       <div style={isChatPage ? styles.contentFull : styles.contentArea}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={
              <ChatView 
                isCamOn={isCamOn} 
                setIsCamOn={setIsCamOn} 
                showAddMenu={showAddMenu} 
                setShowAddMenu={setShowAddMenu} 
              />
            } />
            <Route path="*" element={<Home />} />
          </Routes>
       </div>
       
       {/* แถบเมนู 5 ปุ่ม (หายไปเมื่อเข้าหน้าแชท) */}
       {!isChatPage && (
         <nav style={styles.navBar}>
            <div style={styles.navTab} onClick={() => navigate('/')}>🏠<p style={styles.navLabel}>หน้าหลัก</p></div>
            <div style={styles.navTab} onClick={() => navigate('/shop')}>🛒<p style={styles.navLabel}>ร้านค้า</p></div>
            <div style={styles.centerSpace} onClick={() => alert('AI Mode')}><div style={styles.plusCircle}>+</div></div>
            <div style={styles.navTab} onClick={() => navigate('/chat')}>📞<p style={styles.navLabel}>แชท/โทร</p></div>
            <div style={styles.navTab} onClick={() => navigate('/profile')}>👤<p style={styles.navLabel}>โปรไฟล์</p></div>
          </nav>
       )}
    </div>
  );
}

const styles = {
  appShell: { background: '#0a1535', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', color: '#fff', overflow: 'hidden', position: 'fixed', top: 0, left: 0 },
  contentArea: { flex: 1, paddingBottom: '75px', overflowY: 'auto' },
  contentFull: { flex: 1, overflowY: 'auto' }, 
  navBar: { position: 'fixed', bottom: 0, width: '100%', height: '70px', background: '#fff', display: 'flex', alignItems: 'center', borderTop: '1px solid #ddd', zIndex: 100 },
  navTab: { flex: 1, textAlign: 'center', cursor: 'pointer', color: '#888' },
  navLabel: { fontSize: '10px', margin: 0 },
  centerSpace: { flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' },
  plusCircle: { position: 'absolute', top: '-30px', width: '50px', height: '50px', background: 'gold', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#000', fontWeight: 'bold', border: '4px solid #fff' }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MainAppShell />
  </BrowserRouter>
);
