import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

export default function CalculatorModal({ onClose, onSend }) {
  const [display, setDisplay] = useState('0');

  // สไตล์ปุ่มกด
  const btnStyle = {
    padding: '20px',
    fontSize: '20px',
    fontWeight: 'bold',
    border: '1px solid #EEE',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#FFF',
    color: '#000' // ตัวเลขบนปุ่มสีดำชัดเจน
  };

  const handleKey = (val) => {
    // ถ้าหน้าจอเป็น 0 ให้ทับด้วยเลขใหม่ ถ้าไม่ใช่ให้ต่อท้าย
    if (display === '0' || display === 'Error') setDisplay(val);
    else setDisplay(display + val);
  };

  const calculate = () => {
    try {
      // คำนวณค่าจากหน้าจอ
      const result = Function(`'use strict'; return (${display})`)();
      setDisplay(String(result));
    } catch (e) {
      setDisplay('Error');
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#FFF', width: '320px', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        
        {/* Header */}
        <div style={{ padding: '15px', background: '#001F3F', color: '#FFD700', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold' }}>เครื่องคิดเลข</span>
          <X size={20} onClick={onClose} style={{ cursor: 'pointer' }} />
        </div>
        
        {/* --- ส่วนแสดงผล (แก้ไขให้เห็นเลขชัดๆ) --- */}
        <div style={{ 
          padding: '25px 20px', 
          fontSize: '36px', 
          textAlign: 'right', 
          backgroundColor: '#1A1A1A', // พื้นหลังมืด
          color: '#FFD700',          // ตัวเลขสีเหลืองทอง (โชว์เลขชัดเจน)
          borderBottom: '2px solid #EEE',
          fontFamily: 'monospace',
          overflowX: 'auto'
        }}>
          {display}
        </div>

        {/* ปุ่มกด */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px', padding: '10px', backgroundColor: '#F5F5F5' }}>
          {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', 'C', '+'].map(k => (
            <button 
              key={k} 
              style={k === 'C' ? { ...btnStyle, color: 'red' } : btnStyle} 
              onClick={() => k === 'C' ? setDisplay('0') : handleKey(k)}
            >
              {k}
            </button>
          ))}
          
          {/* ปุ่มเท่ากับ */}
          <button 
            style={{ ...btnStyle, gridColumn: 'span 2', backgroundColor: '#FFD700', color: '#000' }} 
            onClick={calculate}
          >
            =
          </button>

          {/* ปุ่มส่งเข้าแชท */}
          <button 
            style={{ 
              ...btnStyle, 
              gridColumn: 'span 2', 
              backgroundColor: '#007AFF', 
              color: '#FFF', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '5px' 
            }} 
            onClick={() => onSend(display)}
          >
            <Send size={18} /> ส่งเข้าแชท
          </button>
        </div>
      </div>
    </div>
  );
}
