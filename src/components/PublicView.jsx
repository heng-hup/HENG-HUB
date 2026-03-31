import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";

export default function PublicProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", userId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setUser(snap.data());
      }
    };
    fetchUser();
  }, [userId]);

  if (!user) return <span>กำลังโหลด...</span>;

  return (
    <div style={styles.miniCard}>
      <div style={styles.avatar}>{user.displayName?.charAt(0) || "H"}</div>
      <div style={styles.info}>
        <div style={styles.name}>{user.displayName || "สมาชิกมหาเฮง"}</div>
        <div style={styles.rank}>🏆 {user.points || 0} PT</div>
      </div>
    </div>
  );
}

const styles = {
  miniCard: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#fff', borderRadius: '12px', border: '1px solid #ddd' },
  avatar: { width: '40px', height: '40px', background: '#00338D', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  name: { fontWeight: 'bold', color: '#00338D', fontSize: '14px' },
  rank: { fontSize: '12px', color: '#D4AF37' }
};
