import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Send, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function CalendarModal({ onClose, onSend }) {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthNames = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", 
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  
  // ฟังก์ชันเลื่อนเวลา (เดือน/ปี)
  const changeDate = (monthOffset) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + monthOffset, 1));
  };

  const renderDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // เติมช่องว่างก่อนวันที่ 1
    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} />);
    
    // สร้างปุ่มวันที่ 1 - สิ้นเดือน
    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = selectedDate.toDateString() === new Date(year, month, d).toDateString();
      const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

      days.push(
        <div 
          key={d} 
          onClick={() => setSelectedDate(new Date(year, month, d))}
          style={{ 
            height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            cursor: 'pointer', borderRadius: '50%', fontSize: '14px',
            backgroundColor: isSelected ? '#FFD700' : 'transparent',
            color: isSelected ? '#000' : (isToday ? '#007AFF' : '#333'),
            fontWeight: (isSelected || isToday) ? 'bold' : 'normal',
            border: isToday && !isSelected ? '1px solid #007AFF' : 'none'
          }}
        >
          {d}
        </div>
      );
    }
    return days;
  };

  const navBtnStyle = { 
    border: 'none', background: 'none', cursor: 'pointer', color: '#001F3F', 
    padding: '5px', display: 'flex', alignItems: 'center' 
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#FFF', width: '320px', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        
        {/* Header ส่วนหัว */}
        <div style={{ padding: '15px', background: '#001F3F', color: '#FFD700', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold' }}>📅 ปฏิทินนัดหมาย</span>
          <X size={22} onClick={onClose} style={{ cursor: 'pointer' }} />
        </div>

        {/* ส่วนควบคุม วัน/เดือน/ปี (ย้อนหลัง-ข้างหน้า) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', alignItems: 'center', backgroundColor: '#F8F9FA', borderBottom: '1px solid #EEE' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button title="ย้อนหลัง 1 ปี" onClick={() => changeDate(-12)} style={navBtnStyle}><ChevronsLeft size={18}/></button>
            <button title="ย้อนหลัง 1 เดือน" onClick={() => changeDate(-1)} style={navBtnStyle}><ChevronLeft size={18}/></button>
          </div>

          <div style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center', minWidth: '120px' }}>
            {monthNames[viewDate.getMonth()]} <br/>
            <span style={{ color: '#007AFF' }}>พ.ศ. {viewDate.getFullYear() + 543}</span>
          </div>

          <div style={{ display: 'flex', gap: '5px' }}>
            <button title="ข้างหน้า 1 เดือน" onClick={() => changeDate(1)} style={navBtnStyle}><ChevronRight size={18}/></button>
            <button title="ข้างหน้า 1 ปี" onClick={() => changeDate(12)} style={navBtnStyle}><ChevronsRight size={18}/></button>
          </div>
        </div>

        {/* ตารางวันที่ */}
        <div style={{ padding: '10px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
          {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(d => (
            <div key={d} style={{ fontSize: '12px', color: '#999', fontWeight: 'bold', paddingBottom: '5px' }}>{d}</div>
          ))}
          {renderDays()}
        </div>

        {/* ปุ่มยืนยันส่งข้อมูล */}
        <div style={{ padding: '15px', borderTop: '1px solid #EEE', backgroundColor: '#FFF' }}>
          <div style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginBottom: '10px' }}>
            วันที่เลือก: <b>{selectedDate.toLocaleDateString('th-TH')}</b>
          </div>
          <button 
            style={{ 
              width: '100%', padding: '12px', backgroundColor: '#007AFF', color: '#FFF', 
              border: 'none', borderRadius: '10px', fontWeight: 'bold', 
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer' 
            }}
            onClick={() => { 
              onSend(selectedDate.toLocaleDateString('th-TH')); 
              onClose(); 
            }}
          >
            <Send size={18} /> ส่งวันที่เข้าแชท
          </button>
        </div>
      </div>
    </div>
  );
}
