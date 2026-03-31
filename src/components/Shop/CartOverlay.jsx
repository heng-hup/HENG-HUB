import React, { useState } from 'react';
import { styles } from '../../styles/shopStyles';
import CheckoutSheet from './CheckoutSheet';

export default function CartOverlay({ 
  showCart, setShowCart, cartItems = [], updateQty, removeFromCart, calculateSubtotal,
  selectedAddress, setShowAddressList, onFinalOrder 
}) {
  const [view, setView] = useState('cart'); 
  const [isEditing, setIsEditing] = useState(false);

  if (!showCart) return null;

  // คำนวณยอดเงิน (ป้องกัน Error)
  const currentTotal = calculateSubtotal ? calculateSubtotal() : 0;

  const handleClose = () => {
    setShowCart(false);
    setView('cart');
    setIsEditing(false);
  };

  return (
    <div style={styles.checkoutOverlay} onClick={handleClose}>
      <div 
        style={{
          ...styles.checkoutSheet, 
          height: view === 'checkout' ? '95%' : '80%',
          display: 'flex',
          flexDirection: 'column'
        }} 
        onClick={e => e.stopPropagation()}
      >
        
        {/* --- Header --- */}
        <div style={styles.checkoutHeader}>
          <div 
            style={{ cursor: 'pointer', fontSize: '20px', padding: '10px' }} 
            onClick={() => view === 'cart' ? handleClose() : setView('cart')}
          >
            {view === 'cart' ? '✕' : '←'}
          </div>
          <div style={{ flex: 1, textAlign: 'center', fontSize: '17px', fontWeight: '600' }}>
            {view === 'cart' ? `รถเข็นสินค้า (${cartItems.length})` : 'ชำระเงิน | HengMall'}
          </div>
          {view === 'cart' ? (
            <div 
              style={{ color: '#BE123C', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', padding: '10px' }}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'เสร็จสิ้น' : 'แก้ไข'}
            </div>
          ) : (
            <div style={{ width: '40px' }} />
          )}
        </div>

        {/* --- Content --- */}
        <div style={{
          ...styles.checkoutBodyScroll, 
          flex: 1, 
          background: view === 'checkout' ? '#F4F4F5' : '#FFF',
          overflowY: 'auto'
        }}>
          
          {view === 'cart' ? (
            <div style={{ padding: '12px' }}>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} style={cartItemCard}>
                    <div style={productRow}>
                      <div style={styles.cartImgBox}>{item.img}</div>
                      <div style={styles.itemDetails}>
                        <div style={{ fontSize: '14px', color: '#1E293B', fontWeight: '500' }}>{item.name}</div>
                        <div style={styles.qtyPriceRow}>
                          <div style={{ color: '#BE123C', fontWeight: 'bold' }}>฿{(item.price || 0).toLocaleString()}</div>
                          <div style={styles.qtyContainer}>
                            <button onClick={() => updateQty(item.id, -1)} style={styles.qtyCircle}>-</button>
                            <span>{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} style={styles.qtyCircle}>+</button>
                          </div>
                        </div>
                      </div>
                      {isEditing && (
                        <div 
                          onClick={() => removeFromCart(item.id)}
                          style={{ color: '#BE123C', marginLeft: '10px', cursor: 'pointer', fontSize: '20px' }}
                        >
                          🗑️
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
                   🛒 ตะกร้าของคุณยังว่างอยู่
                </div>
              )}
            </div>
          ) : (
            /* เชื่อมต่อ Props เพื่อให้ CheckoutSheet ทำงานได้สมบูรณ์ */
            <CheckoutSheet 
              selectedAddress={selectedAddress}
              setShowAddressList={setShowAddressList}
              currentTotal={currentTotal}
              finalPrice={currentTotal} 
              onFinalOrder={onFinalOrder}
              setShowCheckout={() => { setShowCart(false); setView('cart'); }} 
              isEmbedded={true} 
            />
          )}
        </div>

        {/* --- Footer --- */}
        {view === 'cart' && (
          <div style={fixedFooter}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>ยอดรวมสุทธิ</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#BE123C' }}>
                ฿{currentTotal.toLocaleString()}
              </div>
            </div>
            {/* ✅ จุดที่แก้ไข: เช็คที่อยู่ก่อนเปลี่ยนหน้า */}
            <button 
              style={cartItems.length > 0 ? mainBtn : disabledBtn} 
              disabled={cartItems.length === 0}
              onClick={() => {
                if (!selectedAddress || !selectedAddress.detail) {
                  // ถ้ายังไม่มีที่อยู่ ให้เปิดหน้า Address ทันที
                  setShowAddressList(true);
                } else {
                  // ถ้ามีที่อยู่แล้ว ให้เปลี่ยนไปหน้าสรุปยอด (Checkout)
                  setView('checkout');
                }
              }}
            >
              ชำระเงิน ({cartItems.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const cartItemCard = { background: '#FFF', borderBottom: '1px solid #F1F5F9', padding: '12px 0' };
const productRow = { display: 'flex', alignItems: 'center', gap: '12px' };
const fixedFooter = { padding: '16px', background: '#FFF', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '15px' };
const mainBtn = { padding: '14px 35px', background: '#BE123C', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' };
const disabledBtn = { ...mainBtn, background: '#E2E8F0', color: '#94A3B8', cursor: 'not-allowed' };
