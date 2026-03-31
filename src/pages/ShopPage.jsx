import React, { useState } from 'react';
import { useAffiliate } from '../hooks/useAffiliate';
import ProductCard from '../components/Shop/ProductCard';

// 1. ข้อมูลสินค้าทั้งหมดในตลาด (พี่นัทสามารถดึงจาก API หรือ Firebase ต่อไปได้ครับ)
const ALL_PRODUCTS = [
  {
    id: 1, name: 'HENG T-Shirt Premium', img: '👕',
    variants: [
      { id: 'v1', size: 'S', color: 'ขาว', price: 350, comm: 35 },
      { id: 'v2', size: 'L', color: 'ดำ', price: 450, comm: 45 },
    ]
  },
  {
    id: 2, name: 'Smart Watch Pro 2026', img: '⌚',
    variants: [
      { id: 'v3', size: '40mm', color: 'Silver', price: 2500, comm: 250 },
      { id: 'v4', size: '44mm', color: 'Black', price: 2900, comm: 290 },
    ]
  },
  {
    id: 3, name: 'HENG Coffee Special', img: '☕',
    variants: [
      { id: 'v5', size: '250g', color: 'คั่วเข้ม', price: 320, comm: 32 },
      { id: 'v6', size: '500g', color: 'คั่วกลาง', price: 590, comm: 60 },
    ]
  }
];

export default function ShopPage() {
  const [viewMode, setViewMode] = useState('market'); // 'market' = ตลาดสินค้า, 'channel' = ช่องของฉัน
  const { pinnedItems, togglePin } = useAffiliate('NAT_01'); // ดึง Logic ปักตะกร้าแบบ Real-time

  // --- 2. Logic จัดการตะกร้าสินค้า ---
  const handleAddToCart = (product, variant) => {
    // พี่นัทนำไปเชื่อมกับ cart context หรือ global state ได้เลยครับ
    console.log("Add to Cart:", { product, variant });
    alert(`เพิ่ม ${product.name} (${variant.size}) ลงรถเข็นแล้ว!`);
  };

  const handleBuyNow = (product, variant) => {
    // พี่นัทนำไปเชื่อมกับหน้า Checkout หรือเปิด Modal ชำระเงินได้เลยครับ
    console.log("Buy Now:", { product, variant });
    alert(`กำลังไปหน้าชำระเงิน: ฿${variant.price.toLocaleString()}`);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', fontFamily: "'Kanit', sans-serif" }}>
      
      {/* ส่วนหัว: ปุ่มสลับหน้า ตลาด กับ ช่องของฉัน */}
      <div style={styles.tabContainer}>
        <div 
          onClick={() => setViewMode('market')} 
          style={{ 
            ...styles.tab, 
            color: viewMode === 'market' ? '#BE123C' : '#64748B', 
            borderBottom: viewMode === 'market' ? '4px solid #BE123C' : 'none' 
          }}
        >
          ตลาดสินค้า
        </div>
        <div 
          onClick={() => setViewMode('channel')} 
          style={{ 
            ...styles.tab, 
            color: viewMode === 'channel' ? '#BE123C' : '#64748B', 
            borderBottom: viewMode === 'channel' ? '4px solid #BE123C' : 'none' 
          }}
        >
          ช่องของฉัน ({pinnedItems.length})
        </div>
      </div>

      {/* ส่วนแสดงรายการสินค้า */}
      <div style={styles.productGrid}>
        {viewMode === 'market' ? (
          // หน้าตลาด: แสดงสินค้าทั้งหมดที่มี
          ALL_PRODUCTS.map(p => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onPin={togglePin} 
              isPinned={pinnedItems.find(item => item.id === p.id)} 
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          ))
        ) : (
          // หน้าช่องของฉัน: แสดงเฉพาะสินค้าที่ "ปักตะกร้า" ไว้
          pinnedItems.length > 0 ? (
            pinnedItems.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onPin={togglePin} 
                isPinned={true} 
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            ))
          ) : (
            // ถ้ายังไม่มีสินค้าในช่อง ให้แสดงหน้าว่าง (Empty State)
            <div style={styles.emptyState}>
              <div style={{fontSize: '60px', marginBottom: '15px'}}>🛒</div>
              <div style={{fontWeight: 'bold', fontSize: '18px'}}>ยังไม่มีสินค้าในช่องครับพี่นัท</div>
              <div style={{fontSize: '14px', color: '#94A3B8', marginTop: '8px'}}>
                เลือกสินค้าจากหน้าตลาดมาปักไว้ที่นี่เพื่อแชร์รับคอมมิชชัน
              </div>
              <button onClick={() => setViewMode('market')} style={styles.backToMarketBtn}>
                ไปดูตลาดสินค้า
              </button>
            </div>
          )
        )}
      </div>

      {/* เว้นที่ด้านล่างกันบัง */}
      <div style={{ height: '100px' }} />
    </div>
  );
}

const styles = {
  tabContainer: { 
    display: 'flex', 
    background: '#FFF', 
    position: 'sticky', 
    top: 0, 
    zIndex: 100, 
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)' 
  },
  tab: { 
    flex: 1, 
    textAlign: 'center', 
    padding: '18px 0', 
    fontWeight: 'bold', 
    cursor: 'pointer',
    transition: '0.2s ease-in-out',
    fontSize: '15px'
  },
  productGrid: { 
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
    gap: '12px', 
    padding: '12px' 
  },
  emptyState: { 
    gridColumn: '1/3', 
    textAlign: 'center', 
    padding: '100px 20px', 
    color: '#64748B' 
  },
  backToMarketBtn: {
    marginTop: '25px',
    background: '#BE123C',
    color: '#FFF',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '30px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(190, 18, 60, 0.2)'
  }
};
