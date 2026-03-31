import React, { useState, useEffect } from 'react'; // ✅ เพิ่ม useEffect
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ เพิ่ม useLocation

// --- 🌐 นำเข้า Firebase ---
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Home({ activeTab, setActiveTab, isLoggedIn, setIsLoggedIn, runInstall }) {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ ดึงข้อมูลตำแหน่งหน้าปัจจุบัน
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ ส่วนที่เพิ่ม: ดักจับว่ามาจากหน้า Register หรือไม่ ถ้าใช่ให้เปิด Modal ทันที
  useEffect(() => {
    if (location.state?.openLogin) {
      setShowAuthModal(true);
      // ล้าง state เพื่อไม่ให้เปิดซ้ำเมื่อ refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const services = [
    { id: 'hotel', n: 'จองโรงแรม', i: '🏨' }, 
    { id: 'flight', n: 'จองเที่ยวบิน', i: '✈️' }, 
    { id: 'activity', n: 'กิจกรรม', i: '🎫' }, 
    { id: 'taxi', n: 'เรียกรถ', i: '🚕', isVehicle: true }, 
    { id: 'food', n: 'สั่งอาหาร', i: '🍔' }, 
    { id: 'car', n: 'รถเช่า', i: '🚗', isVehicle: true },
    { id: 'shop', n: 'ช้อปปิ้ง', i: '🛍️' }, 
    { id: 'course', n: 'คอร์สเรียน', i: '🏫' }, 
    { id: 'health', n: 'สุขภาพ', i: '🏥' }, 
    { id: 'insurance', n: 'ประกัน', i: '🛡️' }, 
    { id: 'game', n: 'เกม', i: '🎮' }, 
    { id: 'app', n: 'แอป', i: '📱', isInstall: true }
  ];

  const handleLogin = async () => {
    if (!email || !password) return alert("กรุณากรอกอีเมลและรหัสผ่าน");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      setShowAuthModal(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert("ไม่พบอีเมลนี้ในระบบ");
      } else if (error.code === 'auth/wrong-password') {
        alert("รหัสผ่านไม่ถูกต้อง");
      } else {
        alert("ล็อกอินไม่สำเร็จ: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (item) => {
    if (item.isInstall) {
      runInstall();
      return;
    }
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      console.log(`กำลังไปที่: ${item.n}`);
    }
  };

  return (
    <div style={styles.fullScreen}>
      <div style={styles.fixedTopSection}>
        <div style={styles.topBlueZone}>
          <div style={styles.headerGroup}>
            {!isLoggedIn && (
              <div style={styles.leftSideWrapper} onClick={runInstall}>
                <div style={styles.goldFrameOuter}>
                    <div style={styles.installBtnYellow}>ติดตั้งแอป</div>
                </div>
              </div>
            )}
            <div style={styles.centerSearchWrapper} onClick={() => handleAction({n: 'ค้นหา'})}>
              <div style={styles.searchBar}>
                  <span style={styles.searchText}> ค้นหาบริการ...</span>
              </div>
            </div>
            <div style={styles.rightSideWrapper}>
              {!isLoggedIn ? (
                <div style={styles.authButtonGroup}>
                  <button style={styles.newRegisterBtn} onClick={() => navigate('/register')}>สมัครสมาชิก</button>
                  <button style={styles.newLoginBtn} onClick={() => setShowAuthModal(true)}>เข้าสู่ระบบ</button>
                </div>
              ) : (
                <div style={styles.profileCircle} onClick={() => navigate('/profile')}>
                  <span style={styles.profileInitial}>heng</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={styles.horizontalServiceWrapper}>
          <div style={styles.serviceScrollContainer}>
            {services.map((s, i) => (
              <div key={i} style={styles.serviceItemMini} onClick={() => handleAction(s)}>
                <div style={styles.serviceIconBackgroundMini}>
                  <span style={{
                    ...styles.serviceIconSmall,
                    transform: s.isVehicle ? 'translateY(-4px)' : 'translateY(-2px)'
                  }}>
                    {s.i}
                  </span>
                </div>
                <span style={styles.serviceLabelSmall}>{s.n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={styles.mainScrollArea}>
        <div style={styles.feedContent}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} style={styles.placeholderCard}>
              <div style={styles.cardImage}>▶️ วิดีโอฟีดตัวอย่าง {item}</div>
              <div style={styles.cardText}>เนื้อหาฟีด HENG HENG จะแสดงตรงนี้และวิ่งรอดแถบบริการขึ้นไป</div>
            </div>
          ))}
          <div style={{ height: '20px' }}></div>
        </div>
      </div>
      {showAuthModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>ยินดีต้อนรับสู่ HENG HENG</h2>
              <button onClick={() => setShowAuthModal(false)} style={styles.closeBtn}>×</button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>อีเมล</label>
                <input type="email" style={styles.input} placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>รหัสผ่าน</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPassword ? "text" : "password"} style={{ ...styles.input, width: '100%', paddingRight: '45px' }} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>{showPassword ? '👁️' : '🙈'}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', marginTop: '-10px' }}>
                <span onClick={() => { setShowAuthModal(false); navigate('/forgot-password'); }} style={styles.linkTextSmall}>ลืมรหัสผ่านใช่ไหม?</span>
              </div>
              <button onClick={handleLogin} style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }} disabled={loading}>{loading ? "กำลังโหลด..." : "เข้าสู่ระบบ"}</button>
              <div style={styles.modalFooter}>ยังไม่มีบัญชี? <span style={styles.linkText} onClick={() => { setShowAuthModal(false); navigate('/register'); }}>สมัครสมาชิกที่นี่</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ✅ Styles เหมือนเดิมทุกประการ ไม่มีการขยับหรือเปลี่ยนสี
const styles = {
  fullScreen: { background: '#F5F5F5', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'Kanit, sans-serif' },
  fixedTopSection: { position: 'sticky', top: 0, zIndex: 100, flex: 'none' },
  topBlueZone: { background: '#00338D', padding: '15px 20px' }, 
  headerGroup: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' },
  leftSideWrapper: { flex: '0 0 auto', cursor: 'pointer' },
  centerSearchWrapper: { flex: '1', display: 'flex', justifyContent: 'center', cursor: 'pointer' },
  searchBar: { background: 'white', borderRadius: '25px', padding: '10px 20px', width: '100%', border: '1.5px solid #D4AF37', display: 'flex', alignItems: 'center' },
  searchText: { color: '#00338D', fontSize: '15px', fontWeight: 'bold' },
  goldFrameOuter: { border: '1.5px solid #D4AF37', borderRadius: '12px', padding: '2px' },
  installBtnYellow: { background: '#FFD700', color: '#00338D', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: '900', fontSize: '14px' },
  authButtonGroup: { display: 'flex', gap: '8px', alignItems: 'center' },
  newRegisterBtn: { background: 'linear-gradient(180deg, #00CFFF 0%, #007BFF 100%)', color: 'white', border: '1px solid #00CFFF', padding: '10px 14px', borderRadius: '10px', fontWeight: '900', fontSize: '13px', cursor: 'pointer' },
  newLoginBtn: { background: '#FFFFFF', color: '#00338D', border: '2px solid #D4AF37', padding: '9px 14px', borderRadius: '10px', fontWeight: '900', fontSize: '13px', cursor: 'pointer' },
  profileCircle: { width: '42px', height: '42px', background: '#FFD700', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' },
  profileInitial: { color: '#00338D', fontWeight: '900', fontSize: '14px' },
  horizontalServiceWrapper: { background: '#FFFFFF', padding: '15px 0', borderBottom: '1px solid #E0E0E0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  serviceScrollContainer: { display: 'flex', overflowX: 'auto', padding: '0 15px', gap: '15px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' },
  serviceItemMini: { display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '65px', cursor: 'pointer' },
  serviceIconBackgroundMini: { background: '#FFD700', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', border: '1px solid #D4AF37' },
  serviceIconSmall: { fontSize: '28px' },
  serviceLabelSmall: { fontSize: '11px', color: '#00338D', fontWeight: 'bold' },
  mainScrollArea: { flex: 1, overflowY: 'auto', paddingBottom: '80px' },
  feedContent: { padding: '15px' },
  placeholderCard: { background: 'white', borderRadius: '15px', marginBottom: '15px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  cardImage: { height: '200px', background: '#333', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' },
  cardText: { padding: '12px', color: '#333', fontSize: '14px' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' },
  modalContent: { background: 'white', width: '100%', maxWidth: '400px', borderRadius: '20px', padding: '25px' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  modalTitle: { fontSize: '20px', fontWeight: 'bold', color: '#00338D' },
  closeBtn: { fontSize: '28px', color: '#999', border: 'none', background: 'none', cursor: 'pointer' },
  modalBody: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '14px', fontWeight: 'bold', color: '#555' },
  input: { padding: '12px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none', fontSize: '16px', boxSizing: 'border-box' },
  submitBtn: { background: '#00338D', color: 'white', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' },
  modalFooter: { textAlign: 'center', fontSize: '14px', color: '#777', marginTop: '10px' },
  linkText: { color: '#007BFF', fontWeight: 'bold', cursor: 'pointer' },
  linkTextSmall: { color: '#007BFF', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' },
  eyeBtn: { position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '20px', userSelect: 'none' }
};

