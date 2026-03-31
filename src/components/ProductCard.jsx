import React from 'react';
import { auth, db } from "../../services/firebase"; // ปรับ path ตามโครงสร้างพี่นัท
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { styles } from '../../styles/shopStyles';

export default function ProductCard({ p, onBuyNow, onShare, onTogglePin, isPinned }) {

  // --- 1. Logic เพิ่มลงตะกร้า Firebase (จากเครื่องเดิม) ---
  const handleAddToCart = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงตะกร้าครับพี่นัท");
        return;
      }

      // บันทึกลง Firestore คอลเลกชัน cart
      await addDoc(collection(db, "cart"), {
        user_id: user.uid,
        product_id: p.id,
        name: p.name,
        price: p.price,
        img: p.img || p.image, // รองรับทั้ง emoji และ image url
        qty: 1,
        created_at: serverTimestamp()
      });

      alert(`เพิ่ม ${p.name} ลงตะกร้าแล้วครับ!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("เกิดข้อผิดพลาด: " + error.message);
    }
  };

  return (
    <div style={styles.card}>
      {/* ส่วนรูปภาพและ Badge ต่างๆ */}
      <div style={styles.imgArea}>
        {p.img ? (
          <span style={styles.prodEmoji}>{p.img}</span>
        ) : (
          <img src={p.image} alt={p.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
        )}
        
        <div style={styles.commBadge}>คอม ฿{p.comm}</div>
        <div style={styles.soldBadgeTop}>ขายแล้ว {p.sold}</div>
        
        {/* ปุ่มแชร์เล็กๆ มุมขวาบนรูป */}
        <div style={styles.shareIconBtn} onClick={() => onShare(p)}>🔗</div>
      </div>

      {/* ส่วนข้อมูลสินค้า */}
      <div style={styles.infoArea}>
        <div style={styles.prodName}>{p.name}</div>
        
        <div style={styles.priceRow}>
          <span style={styles.currency}>฿</span>
          <span style={styles.priceAmount}>{p.price.toLocaleString()}</span>
        </div>

        {/* ปุ่มกดหลัก */}
        <div style={styles.btnRow}>
          <button style={styles.addCartBtn} onClick={handleAddToCart}>+ รถเข็น</button>
          <button style={styles.buyNowBtn} onClick={() => onBuyNow(p)}>ซื้อเลย</button>
        </div>

        {/* ปุ่มปักตะกร้า Affiliate (ใช้ togglePin จาก Hook ที่รวมไว้) */}
        <button 
          style={{
            ...styles.affiliateBtn, 
            background: isPinned ? '#475569' : '#059669' // ถ้าปักแล้วให้เปลี่ยนเป็นสีเทา
          }} 
          onClick={() => onTogglePin(p)}
        >
          {isPinned ? '📍 ถอนจากหน้าช่อง' : '📌 ปักตะกร้าสร้างรายได้'}
        </button>
      </div>
    </div>
  );
}

