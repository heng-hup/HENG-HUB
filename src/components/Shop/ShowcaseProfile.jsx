import React, { useState } from 'react';
import CheckoutSheet from './CheckoutSheet'; // ไฟล์ที่มี 5 ปุ่มชำระเงิน

export default function ShowcaseProfile() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 📍 รายการสินค้าที่พี่ปักตะกร้าไว้ (Showcase)
  const pinnedProducts = [
    { id: 1, name: 'HENG T-Shirt Premium', price: 450.00, img: '👕', comm: 45 },
    { id: 2, name: 'HENG Coin Physical Gold', price: 990.00, img: '🪙', comm: 99 },
    { id: 3, name: 'HENG Coffee Special', price: 320.00, img: '☕', comm: 32 },
    { id: 4, name: 'Service PWA Standard', price: 2500.00, img: '💻', comm: 250 },
  ];

  // ฟังก์ชันเมื่อกด "ซื้อ" จากสินค้าที่ปักไว้
  const handleBuy = (product) => {
    setSelectedProduct(product);
    setShowCheckout(true); // 🔗 วิ่งตรงไปหน้าชำระเงิน 5 ปุ่มทันที
  };

  return (
    <div style={{ background: '#FFF', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* ส่วนหัวโปรไฟล์ (อิงตามจอ localhost:5173 ที่พี่ถ่ายมา) */}
      <div style={profileHeader}>
        <div style={avatar}>N</div>
        <div style={statsRow}>
          <div style={stat}><b>9,006</b><br/><span>กำลังติดตาม</span></div>
          <div style={stat}><b>6,391</b><br/><span>ผู้ติดตาม</span></div>
          <div style={stat}><b>47.7K</b><br/><span>ถูกใจ</span></div>
        </div>
      </div>

      <div style={tabArea}>
        <div style={activeTab}>📦 สินค้าที่ปักตะกร้า</div>
      </div>

      {/* 🛍️ Grid รายการสินค้าที่ปักไว้ */}
      <div style={productGrid}>
        {pinnedProducts.map(p => (
          <div key={p.id} style={productCard}>
            <div style={imageBox}>{p.img}</div>
            <div style={productName}>{p.name}</div>
            <div style={priceTag}>฿{p.price.toLocaleString()}</div>
            <div style={commTag}>ค่าคอม ฿{p.comm}</div>
            <button style={buyNowBtn} onClick={() => handleBuy(p)}>
              ซื้อของที่ปักมา
            </button>
          </div>
        ))}
      </div>

      {/* 💳 หน้าชำระเงิน 5 ปุ่ม (TrueMoney, PromptPay, ฯลฯ) */}
      {showCheckout && (
        <CheckoutSheet 
          showCheckout={showCheckout}
          setShowCheckout={setShowCheckout}
          currentTotal={selectedProduct?.price || 1954.15} // ยอดตามสินค้าที่เลือก
          shopBalance={365.77} // ยอดคงเหลือในระบบพี่
          onFinalOrder={(data) => {
            console.log("ยืนยันชำระเงิน:", data);
            alert(`สั่งซื้อ ${selectedProduct?.name} สำเร็จ!`);
            setShowCheckout(false);
          }}
        />
      )}
    </div>
  );
}

// --- Styles ให้เหมือนหน้า Showcase จริง ---
const profileHeader = { padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' };
const avatar = { width: '80px', height: '80px', borderRadius: '50%', background: '#BE123C', color: '#FFF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', fontWeight: 'bold' };
const statsRow = { display: 'flex', gap: '25px', textAlign: 'center', fontSize: '13px' };
const stat = { color: '#1E293B' };
const tabArea = { borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'center', marginBottom: '15px' };
const activeTab = { padding: '10px 20px', borderBottom: '2px solid #000', fontWeight: 'bold', fontSize: '14px' };
const productGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '0 10px' };
const productCard = { border: '1px solid #F1F5F9', borderRadius: '12px', padding: '12px', background: '#FFF' };
const imageBox = { fontSize: '40px', textAlign: 'center', marginBottom: '10px' };
const productName = { fontSize: '13px', fontWeight: '600', height: '36px', overflow: 'hidden' };
const priceTag = { color: '#BE123C', fontWeight: 'bold', fontSize: '16px', marginTop: '5px' };
const commTag = { fontSize: '11px', color: '#64748B' };
const buyNowBtn = { width: '100%', marginTop: '10px', padding: '8px', background: '#000', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' };
