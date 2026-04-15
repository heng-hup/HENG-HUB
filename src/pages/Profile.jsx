import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; 
import { signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function Profile({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [showSmartMenu, setShowSmartMenu] = useState(false);
  const [menuPage, setMenuPage] = useState('main'); // 'main', 'wallet', 'learn', 'terms'
  const [loading, setLoading] = useState(true);
  
  const [user, setUser] = useState({
    name: 'Nat | HENG CEO',
    handle: '@nat_official',
    avatar: '👤',
    trustScore: 98,
    balance: 22736, 
    level: 45
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handleLogout = async () => {
    if (window.confirm("ยืนยันการออกจากระบบ?")) {
      await signOut(auth);
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  const handleWithdraw = () => {
    alert(`ระบบบันทึกคำขอถอนเงิน ฿${user.balance} เรียบร้อยแล้ว (รออนุมัติใน 24 ชม.)`);
  };

  if (loading) return <div style={styles.loader}>🛡️ HENG SECURITY CHECKING...</div>;

  return (
    <div style={styles.container}>
      
      {/* ☰ SMART MENU (ศูนย์รวมทุกอย่าง) */}
      {showSmartMenu && (
        <div style={styles.drawerOverlay} onClick={() => { setShowSmartMenu(false); setMenuPage('main'); }}>
          <div style={styles.drawerContent} onClick={e => e.stopPropagation()}>
            <div style={styles.drawerHandle}></div>
            
            {/* หน้าเมนูหลัก */}
            {menuPage === 'main' && (
              <div style={styles.menuGrid}>
                <h3 style={{textAlign:'center', marginBottom:'20px'}}>เมนูจัดการ HENG</h3>
                <div style={styles.menuItem} onClick={() => setMenuPage('wallet')}>💰 รายได้และกระเป๋าเงิน <span>฿</span></div>
                <div style={styles.menuItem} onClick={() => setMenuPage('learn')}>📚 ศูนย์เรียนรู้ Creator <span>›</span></div>
                <div style={styles.menuItem} onClick={() => setMenuPage('terms')}>🛡️ เงื่อนไขการใช้บริการ <span>›</span></div>
                <div style={styles.menuItem}>⚙️ ตั้งค่าความเป็นส่วนตัว <span>›</span></div>
                <div style={{...styles.menuItem, color: '#FF3B30'}} onClick={handleLogout}>🚪 ออกจากระบบ</div>
              </div>
            )}

            {/* หน้ากระเป๋าเงิน (Wallet) */}
            {menuPage === 'wallet' && (
              <div>
                <div onClick={() => setMenuPage('main')} style={styles.backBtn}>‹ ย้อนกลับ</div>
                <div style={styles.balanceCard}>
                  <p>ยอดรายได้รวม (สินค้า/ของขวัญ/สติ๊กเกอร์)</p>
                  <h1>฿{user.balance.toLocaleString()}</h1>
                  <button style={styles.withdrawBtn} onClick={handleWithdraw}>ถอนเงินสดเข้าบัญชี</button>
                </div>
                <div style={{marginTop:'20px', fontSize:'12px', color:'#888'}}>
                  * รายได้รวมจาก: ตะกร้าสินค้า, ของขวัญ Live, และค่าลิขสิทธิ์สติ๊กเกอร์
                </div>
              </div>
            )}

            {/* หน้าความรู้ (Knowledge) */}
            {menuPage === 'learn' && (
              <div>
                <div onClick={() => setMenuPage('main')} style={styles.backBtn}>‹ ย้อนกลับ</div>
                <h4>💡 ศูนย์เรียนรู้ HENG</h4>
                <div style={styles.listRow}>🚀 วิธีสร้าง Viral ให้คอนเทนต์</div>
                <div style={styles.listRow}>🪙 เทคนิคการขาย HENG Coin</div>
                <div style={styles.listRow}>🛡️ วิธีรักษาความปลอดภัยบัญชี</div>
              </div>
            )}

            {/* หน้าเงื่อนไข (Terms) */}
            {menuPage === 'terms' && (
              <div style={{maxHeight:'60vh', overflowY:'auto'}}>
                <div onClick={() => setMenuPage('main')} style={styles.backBtn}>‹ ย้อนกลับ</div>
                <h4>🛡️ เงื่อนไขการให้บริการ</h4>
                <p style={styles.termsText}>
                  1. <b>ความปลอดภัย:</b> รองรับ 2FA และระบบ AI ตรวจสอบพฤติกรรมเสี่ยงตลอด 24 ชม.<br/><br/>
                  2. <b>รายได้:</b> ระบบใส่ลายน้ำอัตโนมัติเพื่อป้องกันการขโมยคลิป และตรวจสอบยอดขายก่อนถอนเงินจริง<br/><br/>
                  3. <b>กฎชุมชน:</b> ห้ามสแปมหรือใช้คำหยาบ มิฉะนั้น Trust Score จะลดลงและอาจโดนระงับบัญชี
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- หน้าโปรไฟล์หลัก --- */}
      <div style={styles.navBar}>
        <div style={styles.navSide}>LV.{user.level}</div>
        <div style={styles.navTitle}>{user.name} <span style={styles.blueCheck}>✓</span></div>
        <div style={styles.navSide} onClick={() => setShowSmartMenu(true)}>
          <div style={styles.burgerIcon}>☰</div>
        </div>
      </div>

      <div style={styles.headerBody}>
        <div style={styles.avatarWrapper}>
          <div style={styles.mainAvatar}>{user.avatar}</div>
          <div style={styles.trustBadge}>🛡️ Trust {user.trustScore}%</div>
        </div>
        <h3 style={{marginTop: '15px'}}>{user.name}</h3>
        <p style={styles.handleText}>{user.handle}</p>
        
        <div style={styles.statsRow}>
          <div style={styles.statBox}><strong>1.2M</strong><span>Followers</span></div>
          <div style={styles.statBox}><strong>45M</strong><span>Likes</span></div>
          <div style={styles.statBox}><strong>98%</strong><span>Viral</span></div>
        </div>

        <div style={styles.actionRow}>
          <button style={styles.btnMain}>แก้ไขโปรไฟล์</button>
          <button style={styles.btnMain}>แชร์โปรไฟล์</button>
        </div>
      </div>

      <div style={styles.tabBar}>
        <div style={styles.tabActive}>🎬 คอนเทนต์</div>
        <div style={styles.tabInActive}>🛍️ ตะกร้า</div>
        <div style={styles.tabInActive}>🔒 ส่วนตัว</div>
      </div>

      <div style={styles.videoGrid}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} style={styles.videoCard}>▶ 1.2M</div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  container: { background: '#FFF', minHeight: '100vh', fontFamily: 'sans-serif' },
  loader: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#007AFF' },
  
  // NavBar
  navBar: { display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #EEE', alignItems: 'center', sticky:'top', background:'#FFF' },
  navTitle: { fontWeight: 'bold', fontSize: '16px' },
  navSide: { width: '60px', color: '#888', cursor: 'pointer', textAlign: 'center' },
  burgerIcon: { fontSize: '24px', color: '#000' },
  blueCheck: { background: '#0095F6', color: '#FFF', borderRadius: '50%', padding: '1px 4px', fontSize: '10px' },

  // Profile Header
  headerBody: { textAlign: 'center', padding: '20px 0' },
  avatarWrapper: { position: 'relative', width: '90px', height: '90px', margin: '0 auto' },
  mainAvatar: { width: '100%', height: '100%', borderRadius: '50%', background: '#F8F8F8', border: '1px solid #EEE', fontSize: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  trustBadge: { position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', background: '#00C853', color: '#FFF', fontSize: '10px', padding: '2px 8px', borderRadius: '10px', whiteSpace: 'nowrap' },
  handleText: { color: '#888', fontSize: '14px', marginBottom: '15px' },
  statsRow: { display: 'flex', justifyContent: 'center', gap: '30px', margin: '15px 0' },
  statBox: { display: 'flex', flexDirection: 'column', fontSize: '13px', color: '#888' },
  actionRow: { display: 'flex', justifyContent: 'center', gap: '10px' },
  btnMain: { background: '#F1F1F2', border: 'none', padding: '10px 25px', borderRadius: '4px', fontWeight: 'bold' },

  // Tabs & Grid
  tabBar: { display: 'flex', borderTop: '1px solid #EEE', marginTop: '20px' },
  tabActive: { flex: 1, textAlign: 'center', padding: '15px', borderBottom: '2px solid #000', fontWeight: 'bold' },
  tabInActive: { flex: 1, textAlign: 'center', padding: '15px', color: '#AAA' },
  videoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px' },
  videoCard: { aspectRatio: '3/4', background: '#F5F5F5', display: 'flex', alignItems: 'flex-end', padding: '8px', fontSize: '10px', color: '#888' },

  // Drawer (Smart Menu)
  drawerOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'flex-end' },
  drawerContent: { background: '#FFF', width: '100%', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', padding: '20px', minHeight: '40%' },
  drawerHandle: { width: '40px', height: '4px', background: '#DDD', borderRadius: '10px', margin: '0 auto 20px' },
  menuGrid: { display: 'flex', flexDirection: 'column' },
  menuItem: { display:'flex', justifyContent:'space-between', padding: '18px 5px', borderBottom: '1px solid #F8F8F8', cursor: 'pointer', fontWeight:'500' },
  backBtn: { color: '#007AFF', marginBottom: '20px', cursor: 'pointer', fontWeight: 'bold' },
  
  // Wallet Style
  balanceCard: { background: '#161823', color: '#FFF', padding: '25px', borderRadius: '15px', textAlign: 'center' },
  withdrawBtn: { background: '#FE2C55', color: '#FFF', border: 'none', padding: '12px 30px', borderRadius: '25px', fontWeight: 'bold', marginTop: '15px' },
  
  // Learn & Terms
  listRow: { padding: '15px', background: '#F9F9F9', borderRadius: '8px', marginBottom: '8px' },
  termsText: { fontSize: '14px', lineHeight: '1.6', color: '#444' }
};

