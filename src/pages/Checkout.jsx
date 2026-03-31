import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { recordTopup } from '../services/paymentService'; // ฟังก์ชันบันทึกที่เราสร้างไว้

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // รับข้อมูลแพ็กเกจที่ลูกค้าเลือกมาจากหน้า Topup
  const { amount, points } = location.state || { amount: 0, points: 0 };

  // ข้อมูลสมมติสำหรับคำนวณราคา (กรณีใช้ข้อมูลจากหน้า Topup ฉบับล่าสุด)
  const selectedPkg = {
    points: points,
    basePrice: amount / 1.07, // คำนวณราคาก่อน VAT เพื่อส่งไปบันทึกภาษี
    total: amount
  };

  // ✅ ฟังก์ชันจัดการเมื่อชำระเงินสำเร็จ (เรียกใช้โดย Webhook หรือปุ่มยืนยัน)
  const handlePaymentSuccess = async () => {
    if (!auth.currentUser) {
      alert("กรุณาเข้าสู่ระบบก่อนทำรายการ");
      return;
    }

    const result = await recordTopup(auth.currentUser.uid, selectedPkg);
    
    if (result.success) {
      // 🎉 พาไปหน้าใบเสร็จ พร้อมส่งข้อมูลที่เราเพิ่งบันทึกไปโชว์
      navigate('/receipt', { state: { orderData: result.data } });
    } else {
      alert("บันทึกข้อมูลล้มเหลว กรุณาติดต่อแอดมินบริษัทมหาเฮง");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span onClick={() => navigate(-1)} style={styles.backBtn}>←</span>
          <h3 style={styles.title}>ชำระเงินปลอดภัย</h3>
        </div>

        <div style={styles.orderSummary}>
          <p style={styles.label}>รายการสั่งซื้อ:</p>
          <div style={styles.row}>
            <span>เหรียญทอง HENG Gold ({points} PT)</span>
            <span style={styles.price}>฿{amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
          </div>
          <p style={styles.taxNote}>* รวมภาษีมูลค่าเพิ่ม 7% แล้ว</p>
        </div>

        <div style={styles.paymentMethods}>
          <p style={styles.label}>เลือกช่องทางชำระเงิน:</p>
          <div style={styles.methodItem}>
            <span>🏦 Thai QR / PromptPay</span>
            <input type="radio" name="pay" defaultChecked />
          </div>
          <div style={styles.methodItem}>
            <span>🟧 TrueMoney Wallet</span>
            <input type="radio" name="pay" />
          </div>
        </div>

        {/* ส่วนจำลองปุ่มชำระเงิน 
            ในสถานการณ์จริง ตรงนี้จะเป็นการเชื่อมต่อ API ของ GB Prime Pay หรือ Omise */}
        <div style={styles.actionArea}>
          <button style={styles.payBtn} onClick={handlePaymentSuccess}>
            ชำระเงินสุทธิ ฿{amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
          </button>
          <p style={styles.secureText}>🔒 Secure SSL Encryption</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { background: "#F2F2F2", minHeight: "100vh", display: 'flex', justifyContent: 'center', padding: '20px', fontFamily: 'Kanit, sans-serif' },
  card: { background: "#fff", width: "100%", maxWidth: '500px', borderRadius: '25px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', height: 'fit-content' },
  header: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' },
  backBtn: { fontSize: '20px', cursor: 'pointer', color: '#666' },
  title: { margin: 0, fontSize: '18px', color: '#00338D' },
  orderSummary: { background: '#F8F9FA', padding: '20px', borderRadius: '15px', marginBottom: '25px' },
  label: { fontSize: '13px', color: '#888', marginBottom: '10px' },
  row: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px' },
  price: { color: '#FF3B5C' },
  taxNote: { fontSize: '10px', color: '#bbb', marginTop: '5px' },
  paymentMethods: { marginBottom: '30px' },
  methodItem: { display: 'flex', justifyContent: 'space-between', padding: '15px', border: '1px solid #eee', borderRadius: '12px', marginBottom: '10px', fontSize: '14px' },
  actionArea: { textAlign: 'center' },
  payBtn: { width: '100%', background: '#00338D', color: '#fff', border: 'none', padding: '18px', borderRadius: '35px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginBottom: '10px' },
  secureText: { fontSize: '10px', color: '#ccc' }
};
