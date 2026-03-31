import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import PublicProfile from '../components/PublicView'; // ✅ เรียกใช้จากโฟลเดอร์ components

export default function Leaderboard() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      const q = query(collection(db, "users"), orderBy("points", "desc"), limit(10));
      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setTopUsers(users);
    };
    fetchTopUsers();
  }, []);

  return (
    <div style={{ background: '#F2F2F2', minHeight: '100vh', padding: '20px' }}>
      <h2 style={{ color: '#00338D', textAlign: 'center' }}>🏆 ทำเนียบเฮงเฮง</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        {topUsers.map((user) => (
          <PublicProfile key={user.id} userId={user.id} />
        ))}
      </div>
    </div>
  );
}
