import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopupFAQ() {
  const navigate = useNavigate();

  const faqList = [
    { title: 'เหรียญคืออะไรและฉันจะเติมเหรียญได้อย่างไร', path: '/faq/how-to' },
    { title: 'การซื้อและการใช้เหรียญไม่พร้อมให้บริการในขณะนี้', path: '/faq/unavailable' },
    { title: 'ไม่สามารถประมวลผลการชำระเงินของฉันได้', path: '/faq/error' },
    { title: 'ฉันไม่ได้รับเหรียญหลังชำระเงินไปแล้ว', path: '/faq/missing' },
  ];

  return (
    <div style={styles.container}>
      {/* Header แบบ TikTok */}
      <div style={styles.header}>
        <span onClick={() => navigate(-1)} style={styles.backBtn}>←</span>
        <span style={styles.headerTitle}>คำถามที่พบบ่อย</span>
        <span style={styles.historyBtn}>🕒</span>
      </div>

      <div style={styles.listCard}>
        {faqList.map((item, index) => (
          <div 
            key={index} 
            style={styles.listItem} 
            onClick={() => navigate(item.path)}
          >
            <span>{item.title}</span>
            <span style={styles.arrow}>❯</span>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>ต้องการความช่วยเหลือเพิ่มเติมไหม</p>
        <button style={styles.contactBtn} onClick={() => navigate('/contact-admin')}>
          ติดต่อฝ่ายบริการลูกค้า
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { background: '#F8F8F8', minHeight: '100vh', fontFamily: 'Kanit' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#fff', borderBottom: '1px solid #eee' },
  backBtn: { fontSize: '20px', cursor: 'pointer' },
  headerTitle: { fontWeight: 'bold', fontSize: '16px' },
  historyBtn: { fontSize: '18px' },
  listCard: { background: '#fff', marginTop: '10px' },
  listItem: { display: 'flex', justifyContent: 'space-between', padding: '18px 15px', borderBottom: '1px solid #f5f5f5', fontSize: '14px', color: '#333', cursor: 'pointer' },
  arrow: { color: '#ccc', fontSize: '12px' },
  footer: { padding: '30px 15px', textAlign: 'center' },
  footerText: { fontSize: '13px', color: '#888', marginBottom: '15px' },
  contactBtn: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', color: '#333', fontWeight: 'bold' }
};
