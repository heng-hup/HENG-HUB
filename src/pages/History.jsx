import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

export default function History() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const q = query(
        collection(db, "transactions"),
        where("userId", "==", auth.currentUser.uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setLogs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchLogs();
  }, []);

  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100vh' }}>
      <h3 style={{ textAlign: 'center' }}>ประวัติธุรกรรม</h3>
      {logs.map(log => (
        <div key={log.id} style={styles.logItem}>
          <div>
            <div style={{ fontWeight: 'bold' }}>{log.type === 'topup' ? 'เติมเหรียญ' : 'ส่งของขวัญ'}</div>
            <div style={{ fontSize: '11px', color: '#999' }}>{log.createdAt?.toDate().toLocaleString()}</div>
          </div>
          <div style={{ color: log.type === 'topup' ? '#28a745' : '#FE2C55', fontWeight: 'bold' }}>
            {log.type === 'topup' ? `+${log.points}` : `-${log.points}`} PT
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  logItem: { display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #eee' }
};
