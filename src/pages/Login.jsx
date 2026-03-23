import React from 'react';

export default function Login({ setPage }) {
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
