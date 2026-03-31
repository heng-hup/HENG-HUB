import React, { useState, useContext } from 'react';
// สมมติว่าพี่สร้าง AuthContext ไว้จัดการเรื่อง Login/สลับบัญชี
// import { AuthContext } from '../context/AuthContext'; 

export default function AccountSwitcher() {
  // const { currentUser, allAccounts, switchAccount, addAccount } = useContext(AuthContext);
  
  // ข้อมูลสมมติเพื่อทดสอบ UI (เวลาใช้จริงให้ใช้จาก Context ด้านบน)
  const [showSheet, setShowSheet] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: '1', name: 'Nat ผู้บริหารสายเฮง...', handle: '@hengmarket', avatar: '📸' });
  const [allAccounts] = useState([
    { id: '1', name: 'Nat ผู้บริหารสายเฮง...', handle: '@hengmarket', avatar: '📸' },
    { id: '2', name: 'Nat HENG SHOP', handle: '@hengshop_official', avatar: '🛍️' },
    { id: '3', name: 'Nat Travel Review', handle: '@nat_traveler', avatar: '✈️' },
  ]);

  const handleSwitch = (acc) => {
    setCurrentUser(acc);
    setShowSheet(false);
    // switchAccount(acc.id); // เรียกฟังก์ชันสลับจริง
  };

  return (
    <div style={styles.wrapper}>
      {/* --- Header ส่วนบนที่กดแล้วเด้งเมนู --- */}
      <div style={styles.headerTitle} onClick={() => setShowSheet(true)}>
        <span style={styles.nameText}>{currentUser.name}</span>
        <span style={styles.arrowIcon}>▼</span>
      </div>

      {/* --- Bottom Sheet Panel --- */}
      {showSheet && (
        <div style={styles.overlay} onClick={() => setShowSheet(false)}>
          <div style={styles.bottomSheet} onClick={e => e.stopPropagation()}>
            {/* เส้นขีดเล็กๆ ด้านบนเพื่อให้ดูเหมือนแอปมาตรฐาน */}
            <div style={styles.dragHandle}></div>
            
            <div style={styles.sheetHeader}>
              <span style={styles.closeBtn} onClick={() => setShowSheet(false)}>✕</span>
              <span style={styles.headerText}>สลับบัญชี</span>
            </div>

            <div style={styles.accountList}>
              {allAccounts.map((acc) => (
                <div 
                  key={acc.id} 
                  style={styles.accountItem} 
                  onClick={() => handleSwitch(acc)}
                >
                  <div style={styles.avatarBox}>{acc.avatar}</div>
                  <div style={styles.infoBox}>
                    <div style={styles.accName}>{acc.name}</div>
                    <div style={styles.accHandle}>{acc.handle}</div>
                  </div>
                  {/* เครื่องหมายถูกเมื่อเป็นบัญชีที่ใช้งานอยู่ */}
                  {currentUser.id === acc.id && (
                    <div style={styles.checkMark}>✓</div>
                  )}
                </div>
              ))}

              {/* ปุ่มเพิ่มบัญชี (จำกัด 8 บัญชี) */}
              {allAccounts.length < 8 && (
                <div style={styles.addBtn} onClick={() => alert('ไปหน้า Login ด้วยอีเมลใหม่')}>
                  <div style={styles.addCircle}>+</div>
                  <span style={styles.addText}>เพิ่มบัญชีสมาชิก</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: { display: 'inline-block' },
  headerTitle: { 
    display: 'flex', 
    alignItems: 'center', 
    cursor: 'pointer',
    padding: '5px 10px'
  },
  nameText: { fontWeight: '700', fontSize: '16px', color: '#111' },
  arrowIcon: { fontSize: '10px', marginLeft: '5px', color: '#666' },

  // Overlay & Bottom Sheet
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    background: 'rgba(0,0,0,0.3)', zIndex: 9999,
    display: 'flex', alignItems: 'flex-end'
  },
  bottomSheet: {
    width: '100%', background: '#FFF',
    borderTopLeftRadius: '20px', borderTopRightRadius: '20px',
    paddingBottom: '40px', animation: 'slideUp 0.3s ease-out'
  },
  dragHandle: {
    width: '40px', height: '4px', background: '#EEE',
    borderRadius: '2px', margin: '10px auto'
  },
  sheetHeader: {
    padding: '10px 20px', borderBottom: '1px solid #F1F1F1',
    display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
  },
  closeBtn: { position: 'absolute', left: '20px', color: '#888', cursor: 'pointer' },
  headerText: { fontWeight: '700', fontSize: '16px' },

  // Account List
  accountList: { maxHeight: '60vh', overflowY: 'auto' },
  accountItem: {
    display: 'flex', alignItems: 'center', padding: '15px 20px',
    cursor: 'pointer', transition: 'background 0.2s'
  },
  avatarBox: { 
    width: '48px', height: '48px', borderRadius: '50%', 
    background: '#F1F5F9', display: 'flex', alignItems: 'center', 
    justifyContent: 'center', fontSize: '20px', marginRight: '15px' 
  },
  infoBox: { flex: 1 },
  accName: { fontWeight: '600', fontSize: '14px', color: '#111' },
  accHandle: { fontSize: '12px', color: '#888', marginTop: '2px' },
  checkMark: { color: '#00338D', fontWeight: 'bold', fontSize: '18px' },

  // Add Account Button
  addBtn: {
    display: 'flex', alignItems: 'center', padding: '15px 20px',
    borderTop: '1px solid #F8FAFC', cursor: 'pointer'
  },
  addCircle: {
    width: '48px', height: '48px', borderRadius: '50%',
    border: '1px dashed #CBD5E0', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '24px', color: '#A0AEC0', marginRight: '15px'
  },
  addText: { fontSize: '14px', fontWeight: '600', color: '#4A5568' }
};
