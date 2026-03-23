import React, { useState } from 'react';
import { st } from '../styles/chatStyles';

export default function PointPage({ balance, onConfirm, onBack }) {
  const [amount, setAmount] = useState("");

  const handleConfirm = () => {
    const total = parseFloat(amount);
    
    // ตรวจสอบความถูกต้องของยอดเงิน
    if (!total || total <= 0) return alert("❌ กรุณาระบุจำนวนพอยท์");
    if (total > balance) return alert("❌ พอยท์ของคุณไม่เพียงพอ");

    const fee = total * 0.05; // ค่าธรรมเนียม 5%
    const net = total - fee;  // ยอดที่ผู้รับจะได้จริง

    // แจ้งเตือนยืนยันสรุปยอด
    const check = window.confirm(`
      ⚡️ ยืนยันการโอนพอยท์ ⚡️
      ---------------------------
      ยอดที่จะโอน: ${total.toLocaleString()} P
      ค่าธรรมเนียม (5%): -${fee.toLocaleString()} P
      ผู้รับจะได้รับจริง: ${net.toLocaleString()} P
      ---------------------------
      * ระบบจะหักพอยท์จากกระเป๋าคุณ ${total.toLocaleString()} P
    `);

    if (check) {
      onConfirm(total, fee, net);
    }
  };

  const addNum = (n) => {
    if (n === 'C') {
      setAmount("");
    } else if (n === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + n);
    } else {
      // จำกัดทศนิยมไม่เกิน 2 ตำแหน่ง
      if (amount.includes('.') && amount.split('.')[1].length >= 2) return;
      setAmount(prev => prev + n);
    }
  };

  return (
    <div style={st.pointPage}>
      {/* Header */}
      <div style={st.header}>
        <button onClick={onBack} style={{...st.backBtn, border:'none', background:'none', fontSize:'20px', cursor:'pointer'}}>✕</button>
        <strong style={{flex: 1, textAlign: 'center', marginRight: '30px'}}>ส่งพอยท์</strong>
      </div>

      <div style={{padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', height: '90vh'}}>
        
        {/* กล่องแสดงยอดคงเหลือ (Balance Card) */}
        <div style={{
          background: '#001F3F', 
          color: '#FFD700', 
          padding: '25px', 
          borderRadius: '20px', 
          marginBottom: '25px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{fontSize: '14px', opacity: 0.8, marginBottom: '8px'}}>พอยท์ที่ใช้ได้</div>
          <div style={{fontSize: '34px', fontWeight: 'bold'}}>
            <span style={{marginRight: '10px'}}>⚡️</span>
            {balance.toLocaleString()}
            <span style={{fontSize: '18px', marginLeft: '8px'}}>P</span>
          </div>
          <div style={{position: 'absolute', right: '-15px', bottom: '-15px', fontSize: '100px', opacity: 0.05}}>⚡️</div>
        </div>

        {/* ช่องแสดงตัวเลขที่กำลังกรอก */}
        <div style={{marginBottom: '30px'}}>
          <div style={{fontSize: '12px', color: '#666', marginBottom: '5px'}}>จำนวนที่ต้องการโอน</div>
          <div style={{
            fontSize: '45px', 
            fontWeight: 'bold', 
            color: '#001F3F', 
            borderBottom: '2px solid #FFD700',
            paddingBottom: '10px',
            minHeight: '60px'
          }}>
            {amount || "0.00"}
          </div>
        </div>

        {/* ปุ่มกดตัวเลข (NumPad) */}
        <div style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '15px', 
          maxWidth: '350px', 
          margin: '0 auto'
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'C'].map(n => (
            <button 
              key={n} 
              style={{
                ...st.numBtn,
                width: '75px',
                height: '75px',
                fontSize: '24px',
                fontWeight: 'bold',
                borderRadius: '50%',
                border: '1px solid #EEE',
                background: n === 'C' ? '#FFF0F0' : '#FFF',
                color: n === 'C' ? '#FF4D4D' : '#001F3F',
                cursor: 'pointer',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }} 
              onClick={() => addNum(n)}
            >
              {n}
            </button>
          ))}
        </div>

        {/* ปุ่มกดยืนยัน */}
        <button 
          style={{
            ...st.confirmBtn, 
            width: '100%', 
            padding: '18px', 
            fontSize: '18px', 
            fontWeight: 'bold',
            marginTop: 'auto',
            borderRadius: '15px',
            background: '#001F3F',
            color: '#FFD700',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 5px 15px rgba(0,31,63,0.3)'
          }} 
          onClick={handleConfirm}
        >
          ยืนยันการทำรายการ
        </button>
      </div>
    </div>
  );
}
