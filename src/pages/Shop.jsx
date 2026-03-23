import React from 'react';

export default function Shop({ setPage }) {
  const products = [1, 2, 3, 4];

  return (
    <div style={styles.container}>
      {/* ส่วนแสดงรายได้ */}
      <div style={styles.incomeCard}>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>รายได้วันนี้</p>
          <h2 style={{ margin: 0, color: '#ffd700' }}>฿ 1,250.00</h2>
        </div>
        <button style={styles.withdrawBtn}>ถอนเงิน</button>
      </div>

      <h3 style={{ color: '#ffd700', fontSize: '16px', marginBottom: '15px' }}>สินค้าแนะนำ (Affiliate)</h3>

      {/* รายการสินค้า */}
      <div style={styles.productGrid}>
        {products.map((item) => (
          <div key={item} style={styles.prodCard}>
            <div style={styles.prodIcon}>📦</div>
            <div style={{ fontSize: '13px', margin: '5px 0' }}>สินค้าพรีเมียม {item}</div>
            <div style={{ color: '#4ade80', fontSize: '12px', marginBottom: '10px' }}>คอมฯ ฿45</div>
            <button style={styles.pinBtn}>📌 ปักตะกร้า</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  incomeCard: {
    background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
    padding: '20px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
  },
  withdrawBtn: { background: '#ffd700', border: 'none', padding: '8px 15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
  productGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  prodCard: { background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,215,0,0.1)' },
  prodIcon: { fontSize: '40px' },
  pinBtn: { width: '100%', background: '#fff', border: 'none', padding: '5px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }
};
