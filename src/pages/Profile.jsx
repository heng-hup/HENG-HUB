import React, { useState } from 'react';

/**
 * @component HengHengSuperApp
 * @author Nat_CEO_HENG
 * เน้น: สีสันสดใส (ไม่เอาสีดำ), Full Screen, ระบบถอนเงิน, ระบบจัดการรายได้
 * รวมปุ่มจากทุกภาพที่ส่งมา (โปรไฟล์, ตั้งค่า, ยอดเงิน)
 */
export default function HengHengSuperApp() {
  const [view, setView] = useState('profile'); // profile, tools, settings, wallet, withdraw
  const [balance, setBalance] = useState(47700.50);

  // --- [ ฟังก์ชันหลัก ] ---
  const goTo = (page) => setView(page);
  const handleWithdraw = () => {
    alert("💸 กำลังส่งคำขอถอนเงินไปยังบัญชีธนาคารที่ผูกไว้...");
    setView('profile');
  };

  // --- [ 1. หน้าโปรไฟล์หลัก (HENG HENG) ] ---
  const ProfileView = () => (
    <div style={styles.fullPage}>
      <div style={styles.headerHeng}>
        <div style={styles.headerLeft}>👤+ <span style={styles.pBadge}>P</span></div>
        <div style={styles.headerTitle}>HENG HENG <span>▼</span></div>
        <div style={styles.headerRight}>
          <span onClick={() => goTo('wallet')} style={styles.walletIcon}>💰 ฿{balance.toLocaleString()}</span>
          <span onClick={() => goTo('tools')} style={styles.iconBtn}>☰</span>
        </div>
      </div>

      <div style={styles.scrollContent}>
        <div style={styles.profileSection}>
          <div style={styles.avatarLarge}>📸<div style={styles.plusBlue}>+</div></div>
          <p style={styles.handleText}>@hengheng_official</p>
          <div style={styles.statsHeng}>
            <div style={styles.statItem}><strong>9,009</strong><span>กำลังติดตาม</span></div>
            <div style={styles.statItem}><strong>6,391</strong><span>ผู้ติดตาม</span></div>
            <div style={styles.statItem}><strong>47.7K</strong><span>ถูกใจ</span></div>
          </div>
          <div style={styles.bioHeng}>
            <p style={{fontWeight:'bold', color:'#fe2c55'}}>HENG HENG Digital Utility</p>
            <p>ระบบจัดการเหรียญ | ท่องเที่ยว | Full Service</p>
          </div>
          <div style={styles.actionRow}>
            <button style={styles.btnEdit} onClick={() => alert('แก้ไขข้อมูล')}>แก้ไขโปรไฟล์</button>
            <button style={styles.btnTool} onClick={() => goTo('tools')}>เครื่องมือผู้สร้าง</button>
          </div>
        </div>

        {/* Tab สินค้า/โชว์เคส */}
        <div style={styles.tabHeng}>
          <div style={styles.tabActiveHeng}>🛍️ โชว์เคสสินค้า</div>
        </div>
        <div style={styles.showcaseArea}>
          <ProductItem name="HENG Coin Package A" price="1,000" img="🪙" />
          <ProductItem name="ทริปญี่ปุ่น Exclusive" price="45,000" img="🌸" />
        </div>
      </div>
    </div>
  );

  // --- [ 2. หน้าเครื่องมือผู้สร้าง (รวมทุกปุ่มจากภาพ 1000102707) ] ---
  const ToolsView = () => (
    <div style={styles.fullPage}>
      <div style={styles.headerHeng}>
        <span onClick={() => goTo('profile')} style={styles.iconBtn}>❮</span>
        <strong>เครื่องมือผู้สร้าง</strong>
        <span onClick={() => goTo('settings')} style={styles.iconBtn}>⚙️</span>
      </div>
      <div style={styles.scrollContent}>
        <ToolItem icon="📊" title="การวิเคราะห์" />
        <ToolItem icon="🛒" title="heng heng สำหรับผู้สร้าง" highlight />
        <ToolItem icon="📱" title="ศูนย์รวม LIVE" highlight />
        <ToolItem icon="🪙" title="รางวัลผู้สร้าง" />
        <ToolItem icon="⭐" title="ศูนย์สมาชิก" />
        <ToolItem icon="🎵" title="ชุดเครื่องมือสำหรับศิลปิน" />
        <ToolItem icon="📢" title="ศูนย์โปรโมต" />
        <ToolItem icon="✂️" title="ตัดต่อ (CapCut)" />
        <ToolItem icon="❓" title="คำถามและคำตอบ" />
      </div>
    </div>
  );

  // --- [ 3. หน้าการตั้งค่า & ปุ่มออกจากระบบ (ตามภาพ 1000102715) ] ---
  const SettingsView = () => (
    <div style={styles.fullPage}>
      <div style={styles.headerHeng}>
        <span onClick={() => goTo('tools')} style={styles.iconBtn}>❮</span>
        <strong>การตั้งค่าและส่วนตัว</strong>
        <span></span>
      </div>
      <div style={styles.scrollContent}>
        <div style={styles.labelHeng}>บัญชี</div>
        <SettingRow icon="👤" title="บัญชี" />
        <SettingRow icon="🔒" title="ความเป็นส่วนตัว" />
        <div onClick={() => goTo('wallet')}>
            <SettingRow icon="💰" title="ยอดเงิน (Balance)" color="#fe2c55" />
        </div>
        <div style={styles.labelHeng}>เนื้อหาและการแสดงผล</div>
        <SettingRow icon="🔔" title="การแจ้งเตือน" />
        <SettingRow icon="🌐" title="ภาษา" />
        
        {/* ปุ่มออกจากระบบตามที่พี่สั่ง */}
        <div style={styles.logoutSection}>
           <button style={styles.btnLogout} onClick={() => alert('ออกจากระบบ HENG HENG แล้ว')}>ออกจากระบบ</button>
           <p style={{fontSize:'10px', color:'#AAA', marginTop:'10px'}}>HENG HENG Version 3.0.1</p>
        </div>
      </div>
    </div>
  );

  // --- [ 4. หน้ากระเป๋าเงิน & ถอนเงิน (ยอดเงินจากการทำงาน) ] ---
  const WalletView = () => (
    <div style={styles.fullPage}>
      <div style={styles.headerHeng}>
        <span onClick={() => goTo('profile')} style={styles.iconBtn}>❮</span>
        <strong>ยอดเงินของฉัน</strong>
        <span></span>
      </div>
      <div style={styles.walletCard}>
        <p style={{fontSize:'14px'}}>ยอดเงินที่ถอนได้ทั้งหมด</p>
        <h1 style={{fontSize:'36px', margin:'10px 0'}}>฿{balance.toLocaleString()}</h1>
        <button style={styles.btnWithdraw} onClick={() => goTo('withdraw')}>ถอนเงิน</button>
      </div>
      <div style={styles.scrollContent}>
        <div style={styles.labelHeng}>ประวัติรายได้</div>
        <HistoryItem title="ยอดขายสินค้า" date="29 มี.ค. 2026" amount="+500" />
        <HistoryItem title="รางวัลผู้สร้าง" date="28 มี.ค. 2026" amount="+1,200" />
      </div>
    </div>
  );

  const WithdrawView = () => (
    <div style={styles.fullPage}>
      <div style={styles.headerHeng}>
        <span onClick={() => goTo('wallet')} style={styles.iconBtn}>❮</span>
        <strong>ถอนเงิน</strong>
        <span></span>
      </div>
      <div style={{padding:'20px'}}>
        <div style={styles.inputBox}>
          <label>ระบุจำนวนเงินที่ต้องการถอน</label>
          <input type="number" placeholder="0.00" style={styles.inputHeng} />
        </div>
        <div style={styles.bankSelect}>
          <span>ธนาคารกสิกรไทย (บัญชีหลัก)</span>
          <span>เปลี่ยน ❯</span>
        </div>
        <button style={styles.btnConfirmWithdraw} onClick={handleWithdraw}>ยืนยันการถอนเงิน</button>
      </div>
    </div>
  );

  // --- [ Render ] ---
  return (
    <div style={styles.appContainer}>
      {view === 'profile' && <ProfileView />}
      {view === 'tools' && <ToolsView />}
      {view === 'settings' && <SettingsView />}
      {view === 'wallet' && <WalletView />}
      {view === 'withdraw' && <WithdrawView />}
    </div>
  );
}

// --- [ Sub Components ] ---
const ProductItem = ({ name, price, img }) => (
  <div style={styles.pCard}>
    <div style={styles.pImg}>{img}</div>
    <div style={{flex:1}}>
      <p style={{fontSize:'14px'}}>{name}</p>
      <p style={{color:'#fe2c55', fontWeight:'bold'}}>฿{price}</p>
      <button style={styles.btnBuy}>สั่งซื้อ</button>
    </div>
  </div>
);

const ToolItem = ({ icon, title, highlight }) => (
  <div style={styles.toolRow}>
    <div style={{display:'flex', gap:'12px'}}><span>{icon}</span> <span style={{fontWeight: highlight?'bold':'normal'}}>{title}</span></div>
    <span>❯</span>
  </div>
);

const SettingRow = ({ icon, title, color }) => (
  <div style={styles.settingRow}>
    <div style={{display:'flex', gap:'12px'}}><span style={{color}}>{icon}</span> <span style={{color}}>{title}</span></div>
    <span>❯</span>
  </div>
);

const HistoryItem = ({ title, date, amount }) => (
  <div style={styles.historyRow}>
    <div><p>{title}</p><small style={{color:'#999'}}>{date}</small></div>
    <div style={{color:'#28a745', fontWeight:'bold'}}>{amount}</div>
  </div>
);

// --- [ Stylesheet (เน้นสดใส สไตล์ HENG HENG) ] ---
const styles = {
  appContainer: { width: '100vw', height: '100vh', background: '#FFF', fontFamily: 'sans-serif', overflow: 'hidden' },
  fullPage: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF' },
  headerHeng: { display: 'flex', justifyContent: 'space-between', padding: '15px', alignItems: 'center', borderBottom: '1px solid #F9F9F9' },
  headerTitle: { fontWeight: 'bold', fontSize: '15px' },
  iconBtn: { fontSize: '20px', cursor: 'pointer' },
  pBadge: { background: '#FFD700', borderRadius: '50%', padding: '2px 5px', fontSize: '10px' },
  walletIcon: { background: '#FFF0F3', color: '#fe2c55', padding: '5px 10px', borderRadius: '15px', fontSize: '13px', fontWeight: 'bold' },

  scrollContent: { flex: 1, overflowY: 'auto' },
  profileSection: { textAlign: 'center', padding: '25px 0' },
  avatarLarge: { width: '90px', height: '90px', borderRadius: '50%', background: '#F5F5F5', margin: '0 auto', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', border: '2px solid #EEE' },
  plusBlue: { position: 'absolute', bottom: 0, right: 0, background: '#00C2FF', color: '#FFF', width: '25px', height: '25px', borderRadius: '50%', border: '2px solid #FFF', fontSize: '15px' },
  handleText: { fontWeight: 'bold', margin: '15px 0' },
  statsHeng: { display: 'flex', justifyContent: 'center', gap: '25px', color: '#666', fontSize: '13px' },
  statItem: { display: 'flex', flexDirection: 'column' },
  bioHeng: { padding: '15px 40px', fontSize: '14px' },
  actionRow: { display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' },
  btnEdit: { background: '#F1F1F1', border: 'none', padding: '10px 25px', borderRadius: '5px', fontWeight: 'bold' },
  btnTool: { background: '#fe2c55', color: '#FFF', border: 'none', padding: '10px 25px', borderRadius: '5px', fontWeight: 'bold' },

  tabHeng: { display: 'flex', borderBottom: '1px solid #EEE', marginTop: '20px' },
  tabActiveHeng: { flex: 1, textAlign: 'center', padding: '15px', borderBottom: '2px solid #fe2c55', color: '#fe2c55', fontWeight: 'bold' },
  showcaseArea: { padding: '15px' },
  pCard: { display: 'flex', padding: '15px', background: '#FFF', borderRadius: '10px', gap: '15px', marginBottom: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  pImg: { width: '70px', height: '70px', background: '#F9F9F9', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px' },
  btnBuy: { background: '#fe2c55', color: '#FFF', border: 'none', borderRadius: '4px', padding: '4px 12px', fontSize: '12px', marginTop: '5px' },

  toolRow: { display: 'flex', justifyContent: 'space-between', padding: '18px', borderBottom: '1px solid #F9F9F9' },
  labelHeng: { background: '#F9F9F9', padding: '10px 18px', fontSize: '12px', color: '#999', fontWeight: 'bold' },
  settingRow: { display: 'flex', justifyContent: 'space-between', padding: '18px', borderBottom: '1px solid #F9F9F9' },

  logoutSection: { padding: '40px 20px', textAlign: 'center' },
  btnLogout: { width: '100%', background: '#F1F1F1', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 'bold', color: '#555' },

  walletCard: { background: 'linear-gradient(135deg, #fe2c55, #ff6b81)', color: '#FFF', margin: '20px', padding: '30px', borderRadius: '20px', textAlign: 'center' },
  btnWithdraw: { background: 'rgba(255,255,255,0.2)', border: '1px solid #FFF', color: '#FFF', padding: '8px 30px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' },
  historyRow: { display: 'flex', justifyContent: 'space-between', padding: '15px 20px', borderBottom: '1px solid #F9F9F9' },
  
  inputBox: { marginBottom: '20px' },
  inputHeng: { width: '100%', border: 'none', borderBottom: '2px solid #fe2c55', fontSize: '30px', padding: '10px 0', outline: 'none' },
  bankSelect: { padding: '15px', background: '#F9F9F9', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' },
  btnConfirmWithdraw: { width: '100%', background: '#fe2c55', color: '#FFF', border: 'none', padding: '18px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', marginTop: '30px' }
};


