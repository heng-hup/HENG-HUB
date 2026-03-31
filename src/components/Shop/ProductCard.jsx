import React, { useState } from 'react';
import { styles } from '../../styles/shopStyles'; // ใช้ Styles กลางที่แยกไว้

export default function ProductCard({ p, onAddToCart, onBuyNow, onPin, isPinned, onShare }) {
  // 1. เลือกตัวเลือกแรก (Variant) เป็นค่าเริ่มต้น (ถ้ามี)
  const [selectedVariant, setSelectedVariant] = useState(p.variants ? p.variants[0] : null);

  // 2. ฟังก์ชันจัดการเมื่อกดปุ่ม "ปักตะกร้า / แชร์"
  const handlePinOrShare = () => {
    if (isPinned) {
      // ถ้าปักแล้ว ให้เรียกฟังก์ชันแชร์ (ส่ง variant ที่เลือกไปด้วย)
      onShare(p, selectedVariant);
    } else {
      // ถ้ายังไม่ปัก ให้ทำการปักลงช่อง
      onPin(p);
    }
  };

  // ดึงราคาและค่าคอมตาม Variant ที่เลือก (ถ้าไม่มีให้ใช้ค่าหลักของ p)
  const currentPrice = selectedVariant ? selectedVariant.price : p.price;
  const currentComm = selectedVariant ? selectedVariant.comm : p.comm;

  return (
    <div style={styles.card}>
      {/* --- ส่วนรูปภาพ --- */}
      <div style={styles.imgArea}>
        <span style={styles.prodEmoji}>{p.img}</span>
        <div style={styles.commBadge}>คอม ฿{currentComm}</div>
        <div style={styles.soldBadgeTop}>ขายแล้ว {p.sold}</div>
        <div style={styles.shareIconBtn} onClick={() => onShare(p, selectedVariant)}>🔗</div>
      </div>
      
      {/* --- ส่วนข้อมูลสินค้า --- */}
      <div style={styles.infoArea}>
        <div style={styles.prodName}>{p.name}</div>
        
        {/* --- เลือกขนาด/สี (Variants) ถ้ามี --- */}
        {p.variants && (
          <div style={localStyles.variantRow}>
            {p.variants.map(v => (
              <div 
                key={v.id} 
                onClick={() => setSelectedVariant(v)}
                style={{
                  ...localStyles.variantChip,
                  borderColor: selectedVariant?.id === v.id ? '#BE123C' : '#E2E8F0',
                  color: selectedVariant?.id === v.id ? '#BE123C' : '#64748B',
                  background: selectedVariant?.id === v.id ? '#FFF1F2' : '#FFF'
                }}
              >
                {v.size} {v.color}
              </div>
            ))}
          </div>
        )}

        {/* --- ส่วนราคา --- */}
        <div style={styles.priceRow}>
          <span style={styles.currency}>฿</span>
          <span style={styles.priceAmount}>{currentPrice.toLocaleString()}</span>
        </div>

        {/* --- ปุ่มแอ็กชัน --- */}
        <div style={styles.btnRow}>
          <button style={styles.addCartBtn} onClick={() => onAddToCart(p, selectedVariant)}>+ รถเข็น</button>
          <button style={styles.buyNowBtn} onClick={() => onBuyNow(p, selectedVariant)}>ซื้อเลย</button>
        </div>

        {/* --- ปุ่มปักตะกร้า / แชร์ (Dynamic) --- */}
        <button 
          style={{
            ...styles.affiliateBtn, 
            background: isPinned ? '#4F46E5' : '#059669', // ปักแล้วเป็นสีน้ำเงิน ยังไม่ปักเป็นสีเขียว
            marginTop: '5px'
          }}
          onClick={handlePinOrShare}
        >
          {isPinned ? '🔗 แชร์ลิงก์รับคอม' : '📌 ปักตะกร้าลงช่อง'}
        </button>
      </div>
    </div>
  );
}

// Styles เฉพาะส่วน Variant ที่เพิ่มเข้ามา
const localStyles = {
  variantRow: { display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '10px' },
  variantChip: { padding: '4px 8px', border: '1px solid', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', transition: '0.2s' },
};
