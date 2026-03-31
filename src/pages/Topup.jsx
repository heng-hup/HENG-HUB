import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Topup() {
  const navigate = useNavigate();
  const packages = [
    { pt: 5, total: 10.70 },
    { pt: 100, total: 212.93 },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span onClick={() => navigate(-1)}>✕</span>
        <span>เติมเหรียญ</span>
        <span onClick={() => navigate('/topup-faq')}>❓</span>
      </div>
      <div style={styles.grid}>
        {packages.map((pkg, i) => (
          <div key={i} onClick={() => navigate('/checkout', { state: { pkg } })} style={styles.card}>
            <div>🟡 {pkg.pt}</div>
            <div>฿{pkg.total.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
