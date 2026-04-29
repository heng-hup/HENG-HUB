import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc, increment, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDynamicGifts } from './GiftLogic';

export default function GiftModal({ onClose }) {
  const [gifts] = useState(getDynamicGifts());
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!auth.currentUser) return;
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userDoc.exists()) setBalance(userDoc.data().balance || 0);
    };
    fetchBalance();
  }, []);

  const sendGift = async (gift) => {
    if (balance < gift.price) return alert("เหรียญไม่พอ");
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { balance: increment(-gift.price) });
      await addDoc(collection(db, "live_gifts"), {
        senderName: auth.currentUser.displayName || "Nat",
        giftName: gift.name, giftIcon: gift.icon, price: gift.price, timestamp: serverTimestamp()
      });
      setBalance(prev => prev - gift.price);
    } catch (e) { console.error(e); }
  };

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.content} onClick={e => e.stopPropagation()}>
        <div style={s.header}>
          <span>⚡️ {balance}</span>
          <button onClick={() => window.open('/recharge')}>เติมเงิน {'>'}</button>
        </div>
        <div style={s.grid}>
          {gifts.map(g => (
            <div key={g.id} style={s.card} onClick={() => sendGift(g)}>
              <span style={{fontSize: '40px'}}>{g.icon}</span>
              <p style={{fontSize: '12px', margin: '5px 0'}}>{g.name}</p>
              <p style={{fontSize: '10px', color: '#888'}}>⚡️ {g.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const s = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'flex-end' },
  content: { width: '100%', background: '#111', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', padding: '20px', color: '#fff' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' },
  card: { textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px', cursor: 'pointer' }
};
