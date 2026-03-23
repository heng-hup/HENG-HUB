import React from 'react';

export default function Register({ setPage }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>สมัครสมาชิกใหม่</h2>
      <div style={styles.form}>
        <input placeholder="ชื่อผู้ใช้" style={styles.input} />
        <input placeholder="อีเมล" style={styles.input} />
        <input placeholder="รหัสผ่าน" type="password" style={styles.input} />
        <button style={styles.submitBtn} onClick={() => setPage('profile')}>สมัครสมาชิก</button>
      </div>
      <p style={styles.back} onClick={() => setPage('home')}>← กลับหน้าหลัก</p>
    </div>
  );
}

const styles = {
  container: { padding: '40px 20px', textAlign: 'center' },
  title: { color: '#ffd700', marginBottom: '30px' },
  form: { background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' },
  input: { width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#fff', boxSizing: 'border-box' },
  submitBtn: { width: '100%', padding: '14px', background: '#ffd700', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
  back: { marginTop: '20px', color: '#94a3b8', cursor: 'pointer' }
};
