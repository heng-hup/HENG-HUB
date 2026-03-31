import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";

export default function ReportIssue() {
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ 1. ระบบดึงประวัติการเติมเงินล่าสุดอัตโนมัติ 
  // เพื่อให้ลูกค้าเลือกรายการที่มีปัญหาได้ทันที 
  useEffect(() => {
    const fetchRecentOrders = async () => {
      if (!auth.currentUser) return;
      const q = query(
        collection(db, "transactions"),
        where("userId", "==", auth.currentUser.uid),
        where("type", "==", "topup"),
        orderBy("createdAt", "desc"),
        limit(5)
      );
      const snap = await getDocs(q);
      setRecentOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchRecentOrders();
  }, []);

  const handleSubmit = async () => {
    if (!description && !selectedOrder) {
      alert("กรุณาเลือกรายการที่มีปัญหาหรือระบุรายละเอียด");
      return;
    }

    setIsSubmitting(true);
    try {
      // ✅ 2. ส่งข้อมูลแจ้งปัญหาเข้าสู่ระบบ Support อัตโนมัติ
      await addDoc(collection(db, "support_tickets"), {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        orderId: selectedOrder?.orderId || 'N/A',
        amount: selectedOrder?.total_paid || 0,
        issueType: 'Topup_Problem',
        description: description,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      alert("ระบบส่งเรื่องให้แอดมินเรียบร้อย");
      navigate(-1); // ส่งเสร็จกลับไปหน้าก่อนหน้า
    } catch (error) {
      console.error("Error submitting issue:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span onClick={() => navigate(-1)} style={styles.backBtn}>←</span>
        <h3 style={styles.headerTitle}>รายงานปัญหา</h3>
      </div>

      <div style={styles.content}>
        <label style={styles.label}>เลือกรายการที่มีปัญหา (ถ้ามี)</label>
        <div style={styles.orderList}>
          {recentOrders.length > 0 ? recentOrders.map((order) => (
            <div 
              key={order.id} 
              onClick={() => setSelectedOrder(order)}
              style={{
                ...styles.orderItem,
                border: selectedOrder?.id === order.id ? '1px solid #FE2C55' : '1px solid #eee',
                background: selectedOrder?.id === order.id ? '#FFF5F6' : '#fff'
              }}
            >
              <div>
                <div style={{ fontWeight: '600' }}>🟡 {order.points_received} เหรียญ</div>
                <div style={{ fontSize: '11px', color: '#888' }}>{order.createdAt?.toDate().toLocaleString()}</div>
              </div>
              <div style={{ fontWeight: 'bold' }}>฿{order.total_paid}</div>
            </div>
          )) : <p style={{fontSize: '12px', color: '#999'}}>ไม่พบประวัติการเติมเงินล่าสุด</p>}
        </div>

        <label style={styles.label}>รายละเอียดปัญหา</label>
        <textarea 
          placeholder="ระบุปัญหาที่พบ เช่น เติมเงินแล้วเหรียญไม่เข้า..."
          style={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div style={styles.infoBox}>
          * ทีมงานจะใช้เวลาตรวจสอบภายใน 24 ชม. ข้อมูลการชำระเงินของคุณจะถูกตรวจสอบโดยระบบอัตโนมัติ
        </div>

        <button 
          onClick={handleSubmit} 
          style={{...styles.submitBtn, opacity: isSubmitting ? 0.7 : 1}}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'กำลังส่ง...' : 'ส่งรายงาน'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { background: '#F8F8F8', minHeight: '100vh', fontFamily: 'Kanit' },
  header: { display: 'flex', alignItems: 'center', padding: '15px', background: '#fff', borderBottom: '1px solid #eee' },
  backBtn: { fontSize: '24px', marginRight: '15px', cursor: 'pointer' },
  headerTitle: { margin: 0, fontSize: '18px' },
  content: { padding: '20px' },
  label: { display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', color: '#333' },
  orderList: { marginBottom: '20px' },
  orderItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer' },
  textarea: { width: '100%', height: '120px', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '20px', fontFamily: 'inherit' },
  infoBox: { fontSize: '12px', color: '#999', marginBottom: '30px', lineHeight: '1.5' },
  submitBtn: { width: '100%', padding: '15px', background: '#FE2C55', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }
};
