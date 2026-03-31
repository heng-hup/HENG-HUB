import React from 'react';
import { auth } from '../firebase'; 

export default function Login({ setPage: originalSetPage }) {

  // --- [ ส่วนที่เพิ่ม: Logic สำหรับสลับบัญชีโดยไม่แก้ Code เดิม ] ---
  const setPage = (page) => {
    if (page === 'profile') {
      const user = auth.currentUser;
      
      // ถ้ามี User ล็อกอินอยู่ ให้จำเข้าลิสต์ 8 บัญชีทันที
      if (user) {
        const userData = {
          id: user.uid,
          name: 'Nat ผู้บริหารสายเฮง...',
          handle: `@${user.email.split('@')[0]}`,
          avatar: '📸'
        };

        const savedAccounts = JSON.parse(localStorage.getItem('heng_accounts')) || [];
        const isExist = savedAccounts.find(acc => acc.id === userData.id);
        
        if (!isExist && savedAccounts.length < 8) {
          localStorage.setItem('heng_accounts', JSON.stringify([...savedAccounts, userData]));
        }
        localStorage.setItem('current_heng_user', JSON.stringify(userData));
      }
      
      // สั่งไปหน้า profile ตามปกติเหมือนเดิมเป๊ะ
      originalSetPage('profile');
    } else {
      originalSetPage(page);
    }
  };
  // --- [ จบส่วนที่เพิ่ม ] ---

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>เข้าสู่ระบบ HENG-HENG</h2>
      <div style={styles.btnStack}>
        <button style={{ ...styles.socialBtn, background: '#fff', color: '#000' }}>เข้าด้วย Google</button>
        <button style={{ ...styles.socialBtn, background: '#06c755', color: '#fff' }}>เข้าด้วย LINE</button>
        <button style={{ ...styles.socialBtn, background: '#1877f2', color: '#fff' }}>เข้าด้วย Facebook</button>
        <button style={{ ...styles.socialBtn, background: '#ffd700', color: '#000' }} onClick={() => setPage('profile')}>เข้าด้วยอีเมล (Demo)</button>
      </div>
      <p style={styles.back} onClick={() => setPage('home')}>← กลับหน้าหลัก</p>
    </div>
  );
}

const styles = {
  container: { padding: '40px 20px', textAlign: 'center' },
  title: { color: '#ffd700', marginBottom: '30px' },
  btnStack: { display: 'flex', flexDirection: 'column', gap: '12px' },
  socialBtn: { padding: '14px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' },
  back: { marginTop: '20px', color: '#94a3b8', cursor: 'pointer' }
};
