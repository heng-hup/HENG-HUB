import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Receipt() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData } = location.state || {}; // รับข้อมูลมาจากหน้าชำระเงิน

  if (!orderData) return <div style={{padding: '50px', textAlign: 'center'}}>ไม่พบข้อมูลรายการ</div>;

  return (
    <div style={styles.container}>
      <div style={styles.receiptCard}>
        <div style={styles.statusBadge}>✅ เติมพอยท์สำเร็จ</div>
        <h2 style={styles.pointTotal}>🟡 {orderData.points} PT</h2>
        <p style={styles.orderId}>เลขที่รายการ: {orderData.orderId}</p>

        <hr style={styles.divider} />

        <div style={styles.detailRow}>
          <span>จำนวนเงิน (ก่อน VAT)</span>
          <span>฿{Number(orderData.basePrice).toFixed(2)}</span>
        </div>
        <div style={styles.detailRow}>
          <span>ภาษีมูลค่าเพิ่ม (7%)</span>
          <span>฿{Number(orderData.vat7).toFixed(2)}</span>
        </div>
        <div style={{ ...styles.detailRow, fontWeight: 'bold', fontSize: '18px', marginTop: '10px' }}>
          <span>ยอดชำระรวมทั้งสิ้น</span>
          <span style={{ color: '#00338D' }}>฿{Number(orderData.totalPaid).toFixed(2)}</span>
        </div>

        <hr style={styles.divider} />

        <div style={styles.footerInfo}>
          <p>ผู้ให้บริการ: บริษัท มหาเฮง ดิจิทัล ยูทิลิตี้ จำกัด</p>
          <p>วันที่: {new Date().toLocaleString('th-TH')}</p>
        </div>

        <button style={styles.doneBtn} onClick={() => navigate('/profile')}>
          กลับหน้าโปรไฟล์
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { background: '#F2F2F2', minHeight: '100vh', padding: '20px', display: 'flex', alignItems: 'center' },
  receiptCard: { background: '#fff', width: '100%', maxWidth: '400px', margin: '0 auto', padding: '30px', borderRadius: '25px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center' },
  statusBadge: { color: '#28a745', fontWeight: 'bold', marginBottom: '10px' },
  pointTotal: { fontSize: '40px', margin: '10px 0', color: '#D4AF37' },
  orderId: { fontSize: '12px', color: '#999', marginBottom: '20px' },
  divider: { border: 'none', borderTop: '1px dashed #eee', margin: '20px 0' },
  detailRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#444' },
  footerInfo: { fontSize: '10px', color: '#ccc', textAlign: 'left', marginBottom: '25px' },
  doneBtn: { width: '100%', padding: '15px', borderRadius: '30px', border: 'none', background: '#00338D', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }
};
