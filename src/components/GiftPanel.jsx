import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from "firebase/firestore";
import { sendGift } from '../services/coinService'; // นำเข้าฟังก์ชันส่งของขวัญที่เราทำไว้

export default function GiftPanel() {
  const [balance, setBalance] = useState(0);
  const [selectedGift, setSelectedGift] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ 1. ระบบ Real-time Balance (ใช้ onSnapshot)
  // เมื่อระบบอัตโนมัติเติมเหรียญ เลขจะเปลี่ยนปั๊บ โดยไม่ต้องรีเฟรชหน้า
  useEffect(() => {
    if (!auth.currentUser) return;

    const userRef = doc(db, "users", auth.currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setBalance(docSnap.data().gold_points || 0);
      }
    });

    return () => unsubscribe(); // ล้างการเชื่อมต่อเมื่อปิดหน้าจอ
  }, []);

  // ตัวอย่างรายการของขวัญมหาเฮง
  const gifts = [
    { id: 'g1', name: 'หัวใจ', price: 1, icon: '❤️' },
    { id: 'g2', name: 'กุหลาบ', price: 1, icon: '🌹' },
    { id: 'g3', name: 'มงกุฎ', price: 99, icon: '👑' },
    { id: 'g4', name: 'รถสปอร์ต', price: 2999, icon: '🏎️' },
  ];

  const handleSend = async () => {
    if (!selectedGift || loading) return;

    if (balance < selectedGift.price) {
      alert("เหรียญไม่พอ กรุณาเติมเงินก่อนครับ");
      return;
    }

    setLoading(true);
    const result = await sendGift(auth.currentUser.uid, selectedGift);
    setLoading(false);

    if (result.success) {
      console.log("ส่งของขวัญสำเร็จ!");
      setSelectedGift(null);
    } else {
      alert(result.error);
    }
  };

  return (
    <div style={styles.panel}>
      {/* ส่วนบน: รายการของขวัญ (Grid 4 คอลัมน์แบบ ตต.) */}
      <div style={styles.giftGrid}>
        {gifts.map((gift) => (
          <div 
            key={gift.id} 
            onClick={() => setSelectedGift(gift)}
            style={{
              ...styles.giftItem,
              border: selectedGift?.id === gift.id ? '2px solid #FE2C55' : '2px solid transparent'
            }}
          >
            <div style={styles.icon}>{gift.icon}</div>
            <div style={styles.giftName}>{gift.name}</div>
            <div style={styles.giftPrice}>🟡 {gift.price}</div>
          </div>
        ))}
      </div>

      {/* ✅ ส่วนล่าง: แถบยอดเงินและปุ่มเติมเงิน (TikTok Style) */}
      <div style={styles.footer}>
        <div style={styles.coinArea}>
          <span style={styles.coinIcon}>🟡</span>
          <span style={styles.balanceText}>{balance.toLocaleString()}</span>
          {/* ปุ่มเติมเงินเด้งไปหน้า Topup */}
          <span 
            style={styles.topupLink} 
            onClick={() => navigate('/topup')}
          >
            เติมเงิน &gt;
          </span>
        </div>

        <button 
          style={{
            ...styles.sendBtn, 
            opacity: selectedGift ? 1 : 0.5,
            background: selectedGift ? '#FE2C55' : '#444'
          }}
          onClick={handleSend}
          disabled={!selectedGift || loading}
        >
          {loading ? '...' : 'ส่ง'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  panel: { 
    background: 'rgba(22, 22, 22, 0.98)', 
    color: '#fff', 
    position: 'fixed', 
    bottom: 0, 
    width: '100%', 
    maxWidth: '500px', // คุมขนาดให้เหมือนมือถือ
    borderRadius: '16px 16px 0 0',
    fontFamily: 'Kanit, sans-serif',
    paddingBottom: 'env(safe-area-inset-bottom)' // รองรับ iPhone รอยบาก
  },
  giftGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(4, 1fr)', 
    gap: '10px', 
    padding: '20px',
    maxHeight: '320px',
    overflowY: 'auto'
  },
  giftItem: { 
    textAlign: 'center', 
    padding: '10px 5px', 
    borderRadius: '12px', 
    cursor: 'pointer',
    transition: '0.2s'
  },
  icon: { fontSize: '32px', marginBottom: '5px' },
  giftName: { fontSize: '11px', color: '#ccc' },
  giftPrice: { fontSize: '12px', color: '#FFD700', marginTop: '2px' },
  
  footer: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '12px 20px', 
    background: '#121212',
    borderTop: '1px solid #333'
  },
  coinArea: { display: 'flex', alignItems: 'center' },
  coinIcon: { fontSize: '16px', marginRight: '5px' },
  balanceText: { fontSize: '16px', fontWeight: '600' },
  topupLink: { 
    fontSize: '13px', 
    color: '#888', 
    marginLeft: '12px', 
    cursor: 'pointer' 
  },
  sendBtn: { 
    color: '#fff', 
    border: 'none', 
    padding: '8px 28px', 
    borderRadius: '20px', 
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer'
  }
};
