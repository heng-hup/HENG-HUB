import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

export default function NotificationIcon() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!auth.currentUser) return;

    // 🛰️ คอยดูว่ามีแจ้งเตือนใหม่ที่ยังไม่ได้อ่านไหม
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", auth.currentUser.uid),
      where("isRead", "==", false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnreadCount(snapshot.size);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.container}>
      <span style={{ fontSize: '24px' }}>🔔</span>
      {unreadCount > 0 && (
        <div style={styles.badge}>{unreadCount}</div>
      )}
    </div>
  );
}

const styles = {
  container: { position: 'relative', cursor: 'pointer', padding: '5px' },
  badge: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    background: '#ff4d4d',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    border: '2px solid #fff'
  }
};
