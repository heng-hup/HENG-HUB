import React, { useState } from 'react';
import { db, auth } from '../../firebase'; // เช็ก path ให้ตรงกับโปรเจกต์พี่นะครับ
import { doc, updateDoc, increment } from 'firebase/firestore';
import axios from 'axios';

export default function TopUpModal({ onClose, balance }) {
  const [step, setStep] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [loading, setLoading] = useState(false);

  // แพ็กเกจเรท ⚡️ ละ 2 บาท ตามสไตล์ HENG HENG
  const packages = [
    { coins: 500, price: 1000 },
    { coins: 1000, price: 2000, tag: "ยอดฮิต" },
    { coins: 5000, price: 10000, tag: "คุ้มสุด" },
    { coins: 10000, price: 20000, tag: "VIP" },
    { coins: 50000, price: 100000, tag: "ULTIMATE" }
  ];

  const handleUploadSlip = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedPkg) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('files', file);
    formData.append('log', true);

    try {
      // 1. ส่งสลิปไปเช็กที่ SlipOK API
      const res = await axios.post('https://api.slipok.com/api/line/apikey/YOUR_API_KEY', formData, {
        headers: { 'x-lib-apikey': 'YOUR_API_KEY' }
      });

      const data = res.data.data;

      // 2. ตรวจสอบยอดเงินให้ตรงกับแพ็กเกจที่เลือก
      if (data.amount === selectedPkg.price) {
        
        // 3. อัปเดตเหรียญเข้า Firestore ทันที (ไม่ต้องรอแอดมิน)
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          balance: increment(selectedPkg.coins)
        });

        setStep(2); // ไปหน้าสำเร็จ
      } else {
        alert(`ยอดเงินไม่ตรง! ในสลิปคือ ฿${data.amount} แต่พี่เลือกแพ็กเกจ ฿${selectedPkg.price}`);
      }
    } catch (error) {
      alert("สลิปไม่ถูกต้อง หรือเซิร์ฟเวอร์เช็กสลิปมีปัญหาครับพี่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.title}>
            {step === 0 ? "เติมเหรียญ HENG" : step === 1 ? "สแกนจ่าย" : "เติมสำเร็จ!"}
          </span>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <div style={styles.balanceRow}>
          ยอดคงเหลือ: <span style={{ color: '#FFD700', fontWeight: 'bold' }}>⚡️ {balance.toLocaleString()}</span>
        </div>

        {/* STEP 0: เลือกราคา */}
        {step === 0 && (
          <div style={styles.grid}>
            {packages.map((pkg, i) => (
              <div key={i} style={styles.card} onClick={() => { setSelectedPkg(pkg); setStep(1); }}>
                {pkg.tag && <div style={styles.tag}>{pkg.tag}</div>}
                <div style={{fontSize: '20px', fontWeight: 'bold'}}>⚡️ {pkg.coins.toLocaleString()}</div>
                <div style={{color: '#00B900', fontWeight: 'bold'}}>฿{pkg.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 1: จ่ายเงิน + เช็กสลิปอัตโนมัติ */}
        {step === 1 && selectedPkg && (
          <div style={{textAlign: 'center'}}>
            <div style={styles.qrContainer}>
              <p style={{fontWeight: 'bold'}}>สแกนจ่าย ฿{selectedPkg.price.toLocaleString()}</p>
              <img 
                src={`https://promptpay.io/0XXXXXXXXX/${selectedPkg.price}.png`} 
                style={styles.qrImage} 
                alt="QR PromptPay"
              />
              <p style={{fontSize: '12px', color: '#666'}}>บจก. เฮง คอยน์ ดีจิตัล ยูทิลิตี้</p>
            </div>

            <div style={{marginTop: '20px'}}>
              <input type="file" accept="image/*" id="slip-in" style={{display: 'none'}} onChange={handleUploadSlip} disabled={loading} />
              <label htmlFor="slip-in" style={{...styles.mainBtn, background: loading ? '#ccc' : '#FE2C55'}}>
                {loading ? "กำลังตรวจสอบ..." : "📁 แนบสลิป รับเหรียญทันที"}
              </label>
            </div>
            <button style={styles.backBtn} onClick={() => setStep(0)}>เปลี่ยนใจ ย้อนกลับ</button>
          </div>
        )}

        {/* STEP 2: สำเร็จ (แก้ปัญหา ⚡️ not enough) */}
        {step === 2 && (
          <div style={{textAlign: 'center', padding: '30px 0'}}>
            <div style={{fontSize: '50px', marginBottom: '15px'}}>✅</div>
            <h2 style={{margin: '0 0 10px'}}>เฮงๆ ครับพี่นัท!</h2>
            <p>ระบบเติม ⚡️ {selectedPkg?.coins.toLocaleString()} ให้เรียบร้อยแล้ว</p>
            <button style={styles.mainBtn} onClick={onClose}>ไปส่งของขวัญต่อเลย</button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 50000, display: 'flex', alignItems: 'flex-end' },
  container: { width: '100%', background: '#fff', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', padding: '25px', color: '#000' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' },
  title: { fontSize: '18px', fontWeight: 'bold' },
  closeBtn: { background: 'none', border: 'none', fontSize: '24px' },
  balanceRow: { marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' },
  card: { position: 'relative', background: '#f8f9fa', borderRadius: '15px', padding: '20px', textAlign: 'center', border: '1px solid #eee' },
  tag: { position: 'absolute', top: '-10px', right: '5px', background: '#FE2C55', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '10px' },
  qrContainer: { background: '#fff', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' },
  qrImage: { width: '200px', height: '200px', margin: '10px 0' },
  mainBtn: { display: 'block', width: '100%', padding: '16px', borderRadius: '30px', color: '#fff', fontWeight: 'bold', border: 'none', fontSize: '16px', cursor: 'pointer', textAlign: 'center' },
  backBtn: { marginTop: '15px', background: 'none', border: 'none', color: '#888' }
};
