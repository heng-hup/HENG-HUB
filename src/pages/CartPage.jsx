import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, updateQty, removeFromCart, totalPrice, totalQty } = useCart();

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🛒 ตะกร้าสินค้าของฉัน ({totalQty})</h2>

      {cartItems.length > 0 ? (
        <>
          <div style={styles.itemList}>
            {cartItems.map((item, idx) => (
              <div key={`${item.product.id}-${item.variant.id}`} style={styles.itemCard}>
                <div style={styles.itemImg}>{item.product.img}</div>
                <div style={styles.itemInfo}>
                  <div style={styles.itemName}>{item.product.name}</div>
                  <div style={styles.itemVariant}>{item.variant.size} | {item.variant.color}</div>
                  <div style={styles.itemPrice}>฿{item.variant.price.toLocaleString()}</div>
                </div>
                <div style={styles.qtyControl}>
                  <button onClick={() => updateQty(item.product.id, item.variant.id, -1)} style={styles.qtyBtn}>-</button>
                  <span style={styles.qtyNum}>{item.quantity}</span>
                  <button onClick={() => updateQty(item.product.id, item.variant.id, 1)} style={styles.qtyBtn}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.product.id, item.variant.id)} style={styles.delBtn}>🗑️</button>
              </div>
            ))}
          </div>

          {/* สรุปยอดเงินด้านล่าง */}
          <div style={styles.footer}>
            <div style={styles.totalRow}>
              <span>ยอดรวมทั้งสิ้น:</span>
              <span style={styles.totalPrice}>฿{totalPrice.toLocaleString()}</span>
            </div>
            <button style={styles.checkoutBtn} onClick={() => alert("ระบบกำลังเชื่อมต่อ HENG Payment...")}>
              สั่งซื้อและชำระเงิน
            </button>
          </div>
        </>
      ) : (
        <div style={styles.empty}>
          <div style={{fontSize: '60px'}}>📭</div>
          <p>ไม่มีสินค้าในตะกร้าครับพี่นัท</p>
          <button style={styles.goShopBtn} onClick={() => window.location.href='/shop'}>ไปช้อปเลย</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '20px', background: '#F8FAFC', minHeight: '100vh', fontFamily: "'Kanit', sans-serif" },
  header: { fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1E293B' },
  itemList: { display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '150px' },
  itemCard: { background: '#FFF', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  itemImg: { fontSize: '30px', width: '50px', height: '50px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' },
  itemInfo: { flex: 1, marginLeft: '12px' },
  itemName: { fontSize: '14px', fontWeight: 'bold' },
  itemVariant: { fontSize: '11px', color: '#64748B' },
  itemPrice: { fontSize: '16px', color: '#BE123C', fontWeight: 'bold' },
  qtyControl: { display: 'flex', alignItems: 'center', gap: '8px', marginRight: '10px' },
  qtyBtn: { width: '25px', height: '25px', borderRadius: '50%', border: '1px solid #E2E8F0', background: '#FFF', cursor: 'pointer' },
  qtyNum: { fontSize: '14px', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' },
  delBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' },
  footer: { position: 'fixed', bottom: 0, left: 0, right: 0, background: '#FFF', padding: '20px', borderTop: '1px solid #E2E8F0', boxShadow: '0 -5px 15px rgba(0,0,0,0.05)' },
  totalRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '18px', fontWeight: 'bold' },
  totalPrice: { color: '#BE123C', fontSize: '22px' },
  checkoutBtn: { width: '100%', padding: '15px', borderRadius: '12px', border: 'none', background: '#BE123C', color: '#FFF', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  empty: { textAlign: 'center', padding: '100px 20px', color: '#94A3B8' },
  goShopBtn: { marginTop: '15px', padding: '10px 20px', borderRadius: '20px', border: 'none', background: '#1E293B', color: '#FFF' }
};
