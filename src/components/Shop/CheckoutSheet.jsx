import React, { useState } from 'react';
import { styles } from '../../styles/shopStyles';

export default function CheckoutSheet({ 
  showCheckout, setShowCheckout, selectedAddress, setShowAddressList, 
  currentTotal = 0, finalPrice = 0, onFinalOrder, isEmbedded,
  shopBalance = 365.77 
}) {
  const [showTaxForm, setShowTaxForm] = useState(false);
  const [taxType, setTaxType] = useState('personal'); 
  const [isHeadOffice, setIsHeadOffice] = useState(true); 
  const [isAgreed, setIsAgreed] = useState(false); 
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [couponCode, setCouponCode] = useState('');

  // --- Logic หักยอดบาลานซ์ ---
  const [useBalance, setUseBalance] = useState(false);
  const shippingFee = 75;
  const totalBeforeBalance = (currentTotal || 0) + shippingFee;
  // หักตามที่มีจริง แต่ไม่เกินยอดรวม
  const balanceUsed = useBalance ? Math.min(shopBalance, totalBeforeBalance) : 0;
  // ยอดคงเหลือที่ต้องไปจ่ายผ่านธนาคารหรือปลายทาง
  const finalPayAmount = totalBeforeBalance - balanceUsed;

  const addressDisplay = selectedAddress || { name: 'ยังไม่ได้เลือกที่อยู่', phone: '', detail: 'กรุณาระบุที่อยู่จัดส่ง' };

  if (!isEmbedded && !showCheckout) return null;

  const CheckoutContent = (
    <div style={{...styles.checkoutBodyScroll, flex: 1, padding: isEmbedded ? '0' : '16px', background: '#F4F4F5'}}>
        
       {/* 1. ข้อมูลการจัดส่ง */}
       <div style={sectionCard}>
          <div style={{fontWeight: 'bold', marginBottom: '10px'}}>📍 ข้อมูลการจัดส่ง (Heng Heng Delivery)</div>
          <div style={styles.addressSelectCard} onClick={() => setShowAddressList(true)}>
            <div style={{flex: 1}}>
              <div style={{fontWeight: '600'}}>{addressDisplay.name} {addressDisplay.phone && `| ${addressDisplay.phone}`}</div>
              <div style={{fontSize: '13px', color: '#64748B', marginTop: '4px'}}>{addressDisplay.detail}</div>
            </div>
            <span style={{color: '#94A3B8'}}>❯</span>
          </div>
       </div>

       {/* 💰 ส่วนลดจาก HengHeng Shop Balance */}
       <div style={{...sectionCard, marginTop: '12px'}}>
          <div style={rowBetween}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontSize: '20px'}}>💰</span>
              <div>
                <div style={{fontWeight: 'bold', fontSize: '14px'}}>ใช้ HengHeng Shop Balance</div>
                <div style={{fontSize: '12px', color: '#64748B'}}>คงเหลือ: ฿{shopBalance.toLocaleString()}</div>
              </div>
            </div>
            <div onClick={() => {
              const nextVal = !useBalance;
              setUseBalance(nextVal);
              if(nextVal && paymentMethod === 'cod') setPaymentMethod('bank'); // ดีดไปธนาคารถ้าเปิด Balance
            }} style={toggleBg(useBalance)}>
              <div style={toggleCircle(useBalance)} />
            </div>
          </div>
       </div>

       {/* 2. วิธีการชำระเงิน (จ่ายส่วนที่เหลือ) */}
       {finalPayAmount > 0 && (
         <div style={{...sectionCard, marginTop: '12px'}}>
            <div style={{fontWeight: 'bold', marginBottom: '12px'}}>เลือกวิธีชำระยอดส่วนเกิน (฿{finalPayAmount.toLocaleString()})</div>
            
            <div style={paymentOption(paymentMethod === 'bank')} onClick={() => setPaymentMethod('bank')}>
              <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                <span>🏦</span>
                <div style={{fontWeight: '600', fontSize: '14px'}}>โอนเงินผ่านธนาคาร</div>
              </div>
              <div style={radioCircle(paymentMethod === 'bank')} />
            </div>

            {/* แสดง ชำระปลายทาง เฉพาะกรณีที่ ไม่มีการใช้ Balance เท่านั้น */}
            {!useBalance && (
              <div style={paymentOption(paymentMethod === 'cod')} onClick={() => setPaymentMethod('cod')}>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                  <span>📦</span>
                  <div style={{fontWeight: '600', fontSize: '14px'}}>ชำระเงินปลายทาง</div>
                </div>
                <div style={radioCircle(paymentMethod === 'cod')} />
              </div>
            )}

            <div style={paymentOption(paymentMethod === 'truemoney')} onClick={() => setPaymentMethod('truemoney')}>
              <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                <span>🧡</span>
                <div style={{fontWeight: '600', fontSize: '14px'}}>ทรูมันนี่</div>
              </div>
              <div style={radioCircle(paymentMethod === 'truemoney')} />
            </div>
         </div>
       )}

       {/* 3. คูปอง */}
       <div style={{...sectionCard, marginTop: '12px'}}>
          <div style={{fontWeight: 'bold', marginBottom: '12px'}}>คูปอง</div>
          <div style={{display: 'flex', gap: '10px'}}>
              <input style={{...inputBox, flex: 1}} placeholder="กรอกโค้ดคูปอง" value={couponCode} onChange={(e)=>setCouponCode(e.target.value)} />
              <button style={couponBtn}>ใช้คูปอง</button>
          </div>
       </div>

       {/* 4. ส่วนใบกำกับภาษี */}
       <div style={{...sectionCard, marginTop: '12px'}}>
          <div style={rowBetween}>
            <div style={{fontWeight: 'bold'}}>ใบกำกับภาษีและข้อมูลติดต่อ</div>
            <div style={{color: '#BE123C', fontWeight: 'bold', cursor: 'pointer'}} onClick={() => setShowTaxForm(!showTaxForm)}>
              {showTaxForm ? 'ปิด' : 'แก้ไข'}
            </div>
          </div>
          {showTaxForm && (
            <div style={{marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <div style={tabContainer}>
                <button style={tabBtn(taxType === 'personal')} onClick={() => setTaxType('personal')}>บุคคลธรรมดา</button>
                <button style={tabBtn(taxType === 'company')} onClick={() => setTaxType('company')}>บริษัท</button>
              </div>
              <input style={inputBox} placeholder="ชื่อ-นามสกุล / บริษัท" />
              <input style={inputBox} placeholder="เลขประจำตัวผู้เสียภาษี (13 หลัก)" />
              <textarea style={{...inputBox, height: '60px'}} placeholder="ที่อยู่เรียกเก็บเงิน" />
              <div style={{display: 'flex', gap: '10px', marginTop: '5px', alignItems: 'flex-start'}}>
                <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} style={{width: '18px', height: '18px', accentColor: '#BE123C'}} />
                <label style={{fontSize: '11px', color: '#64748B', lineHeight: '1.4'}}>
                  ฉันยืนยันว่าข้อมูลถูกต้อง และยอมรับนโยบายความเป็นส่วนตัวของ Heng Heng
                </label>
              </div>
              <div style={{display: 'flex', gap: '10px'}}>
                <button style={cancelBtn} onClick={() => setShowTaxForm(false)}>ยกเลิก</button>
                <button style={isAgreed ? saveBtn : disabledBtn} disabled={!isAgreed} onClick={() => setShowTaxForm(false)}>บันทึก</button>
              </div>
            </div>
          )}
       </div>

       {/* 5. สรุปยอดเงิน */}
       <div style={{...sectionCard, marginTop: '12px', marginBottom: isEmbedded ? '20px' : '100px'}}>
          <div style={rowBetween}>
            <span style={labelGray}>ยอดรวมสินค้า</span>
            <span style={valBlack}>฿{(currentTotal || 0).toLocaleString()}</span>
          </div>
          <div style={rowBetween}>
            <span style={labelGray}>ค่าจัดส่ง</span>
            <span style={valBlack}>฿75.00</span>
          </div>
          {useBalance && (
            <div style={rowBetween}>
              <span style={{fontSize: '14px', color: '#BE123C'}}>หักจาก Shop Balance</span>
              <span style={{fontSize: '14px', color: '#BE123C', fontWeight: '600'}}>-฿{balanceUsed.toLocaleString()}</span>
            </div>
          )}
          <div style={{...rowBetween, borderTop: '1px solid #F1F5F9', marginTop: '10px', paddingTop: '10px'}}>
            <span style={{fontWeight: 'bold'}}>ยอดชำระสุทธิ:</span>
            <span style={{fontSize: '20px', fontWeight: '800', color: '#BE123C'}}>฿{finalPayAmount.toLocaleString()}</span>
          </div>
       </div>

       {isEmbedded && (
          <div style={{paddingBottom: '80px'}}>
            <button onClick={() => onFinalOrder(balanceUsed, finalPayAmount, paymentMethod)} style={{width: '100%', padding: '15px', background: '#BE123C', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>
              สั่งซื้อสินค้า
            </button>
          </div>
       )}
    </div>
  );

  if (isEmbedded) return CheckoutContent;

  return (
    <div style={styles.checkoutOverlay}>
      <div style={{...styles.checkoutSheet, height: '95%', display: 'flex', flexDirection: 'column'}}>
        <div style={styles.checkoutHeader}>
          <span onClick={() => setShowCheckout(false)} style={{cursor: 'pointer', fontSize: '20px'}}>✕</span>
          <span style={{fontWeight: '600'}}>ข้อมูลการสั่งซื้อ | HengMall</span>
          <div style={{width: '20px'}} />
        </div>
        {CheckoutContent}
        <div style={fixedFooter}>
           <div style={{flex: 1}}>
              <div style={{fontSize: '12px', color: '#64748B'}}>ยอดชำระสุทธิ</div>
              <div style={{fontSize: '20px', fontWeight: 'bold', color: '#BE123C'}}>฿{finalPayAmount.toLocaleString()}</div>
           </div>
           <button style={mainOrderBtn} onClick={() => onFinalOrder(balanceUsed, finalPayAmount, paymentMethod)}>สั่งซื้อ</button>
        </div>
      </div>
    </div>
  );
}

// --- Styles (ห้ามแก้ไข) ---
const sectionCard = { background: '#FFF', padding: '16px', borderRadius: '8px' };
const rowBetween = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const labelGray = { fontSize: '14px', color: '#64748B' };
const valBlack = { fontSize: '14px', color: '#1E293B', fontWeight: '600' };
const inputBox = { padding: '12px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', outline: 'none' };
const tabContainer = { display: 'flex', background: '#F1F5F9', padding: '4px', borderRadius: '8px' };
const tabBtn = (sel) => ({ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', background: sel ? '#FFF' : 'transparent', color: sel ? '#BE123C' : '#64748B' });
const toggleBg = (a) => ({ width: '45px', height: '24px', borderRadius: '12px', background: a ? '#BE123C' : '#CBD5E1', position: 'relative', cursor: 'pointer' });
const toggleCircle = (a) => ({ width: '20px', height: '20px', borderRadius: '50%', background: '#FFF', position: 'absolute', top: '2px', left: a ? '23px' : '2px', transition: '0.2s' });
const paymentOption = (sel) => ({ display: 'flex', justifyContent: 'space-between', padding: '14px', border: sel ? '1px solid #BE123C' : '1px solid #E2E8F0', borderRadius: '8px', marginBottom: '8px', background: sel ? '#FFF1F2' : '#FFF', cursor: 'pointer', alignItems: 'center' });
const radioCircle = (sel) => ({ width: '18px', height: '18px', borderRadius: '50%', border: sel ? '5px solid #BE123C' : '2px solid #CBD5E1' });
const couponBtn = { padding: '0 15px', background: '#00A8B5', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold' };
const cancelBtn = { flex: 1, padding: '12px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontWeight: 'bold', color: '#64748B' };
const saveBtn = { flex: 1, padding: '12px', background: '#BE123C', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold' };
const disabledBtn = { flex: 1, padding: '12px', background: '#E2E8F0', color: '#94A3B8', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'not-allowed' };
const fixedFooter = { padding: '12px 16px', background: '#FFF', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '15px' };
const mainOrderBtn = { padding: '14px 40px', background: '#BE123C', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' };

