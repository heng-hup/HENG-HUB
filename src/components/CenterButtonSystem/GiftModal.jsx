import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase'; 
import { doc, getDoc, updateDoc, increment, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDynamicGifts } from './GiftLogic';

export default function GiftModal({ onClose }) {
  const [gifts, setGifts] = useState(getDynamicGifts());
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!auth.currentUser) return;
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userDoc.exists()) {
        setBalance(userDoc.data().balance || 0);
      }
    };
    fetchBalance();
  }, []);

  const sendGift = async (gift) => {
    if (balance < gift.price) {
      alert("⚡️ not enough!"); // เปลี่ยนจาก Heng เป็น ⚡️
      return;
    }

    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        balance: increment(-gift.price)
      });

      await addDoc(collection(db, "live_gifts"), {
        senderName: auth.currentUser.displayName || "⚡️ User",
        giftName: gift.name,
        giftIcon: gift.icon,
        price: gift.price,
        timestamp: serverTimestamp()
      });

      setBalance(prev => prev - gift.price);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          {/* เปลี่ยนจาก Balance: {balance} HENG เป็น ⚡️ {balance} */}
          <span style={{ fontWeight: 'bold' }}>⚡️ {balance}</span> 
          <button onClick={onClose} style={styles.closeBtn}>X</button>
        </div>
        
        <div style={styles.giftGrid}>
          {gifts.map((gift) => (
            <div key={gift.id} style={styles.giftCard} onClick={() => sendGift(gift)}>
              <div style={{ fontSize: '40px', marginBottom: '5px' }}>{gift.icon}</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{gift.name}</div>
              {/* เปลี่ยนราคาด้านล่างเป็น ⚡️ {gift.price} */}
              <div style={{ fontSize: '10px', color: '#FFD700' }}>⚡️ {gift.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 20000, display: 'flex', alignItems: 'flex-end' },
  container: { width: '100%', background: '#1a1a1a', borderTopLeftRadius: '25px', borderTopRightRadius: '25px', padding: '20px 20px 40px 20px', color: '#fff' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  closeBtn: { background: 'none', border: 'none', fontSize: '18px', color: '#fff', cursor: 'pointer' },
  giftGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', maxHeight: '300px', overflowY: 'auto' },
  giftCard: { background: '#333', borderRadius: '15px', padding: '10px', textAlign: 'center', cursor: 'pointer' }
};
