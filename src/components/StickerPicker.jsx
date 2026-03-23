import React from 'react';

export default function StickerPicker({ onSelect }) {
  // ✅ สติ๊กเกอร์เคลื่อนไหว (Animated Emoji จาก Google - ชัวร์กว่า Giphy)
  const animatedStickers = [
    "https://fonts.gstatic.com/s/e/notoemoji/latest/1f60a/512.gif",
    "https://fonts.gstatic.com/s/e/notoemoji/latest/1f92d/512.gif",
    "https://fonts.gstatic.com/s/e/notoemoji/latest/1f44d/512.gif",
    "https://fonts.gstatic.com/s/e/notoemoji/latest/1f602/512.gif",
    "https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.gif",
    "https://fonts.gstatic.com/s/e/notoemoji/latest/2728/512.gif",
  ];

  // ✅ สติ๊กเกอร์ภาพนิ่ง (Static - ลิงก์ใหม่ที่โหลดไว)
  const staticStickers = [
    "https://cdn-icons-png.flaticon.com/512/2278/2278992.png",
    "https://cdn-icons-png.flaticon.com/512/2278/2278984.png",
    "https://cdn-icons-png.flaticon.com/512/2279/2279014.png",
    "https://cdn-icons-png.flaticon.com/512/4710/4710839.png",
    "https://cdn-icons-png.flaticon.com/512/4710/4710842.png",
    "https://cdn-icons-png.flaticon.com/512/4710/4710847.png",
  ];

  const containerStyle = {
    position: 'absolute',
    bottom: '85px', // ปรับขึ้นมานิดนึงไม่ให้ทับช่องพิมพ์
    right: '20px',
    width: '280px',
    height: '350px',
    background: '#FFF',
    borderRadius: '15px',
    boxShadow: '0 5px 25px rgba(0,0,0,0.2)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: '1px solid #EEE'
  };

  const sectionStyle = {
    padding: '10px',
    overflowY: 'auto',
    flex: 1
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px'
  };

  const imgStyle = {
    width: '100%',
    aspectRatio: '1/1',
    objectFit: 'contain',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'transform 0.2s ease-in-out'
  };

  return (
    <div style={containerStyle} onClick={(e) => e.stopPropagation()}>
      <div style={{ 
        padding: '12px', 
        fontWeight: 'bold', 
        borderBottom: '1px solid #F0F0F0', 
        textAlign: 'center',
        color: '#001F3F' 
      }}>
        เลือกสติ๊กเกอร์ ⚡️
      </div>
      
      <div style={sectionStyle}>
        {/* หมวดเคลื่อนไหว */}
        <div style={{ fontSize: '12px', color: '#7485A5', marginBottom: '10px', fontWeight: '600' }}>
          เคลื่อนไหว (Animated)
        </div>
        <div style={gridStyle}>
          {animatedStickers.map((url, i) => (
            <img 
              key={`anim-${i}`} 
              src={url} 
              style={imgStyle} 
              onClick={() => onSelect(url, 'sticker')} 
              onMouseOver={e => e.target.style.transform = 'scale(1.1)'} 
              onMouseOut={e => e.target.style.transform = 'scale(1)'} 
            />
          ))}
        </div>

        {/* หมวดภาพนิ่ง */}
        <div style={{ fontSize: '12px', color: '#7485A5', margin: '20px 0 10px 0', fontWeight: '600' }}>
          ภาพนิ่ง (Static)
        </div>
        <div style={gridStyle}>
          {staticStickers.map((url, i) => (
            <img 
              key={`stat-${i}`} 
              src={url} 
              style={imgStyle} 
              onClick={() => onSelect(url, 'sticker')} 
              onMouseOver={e => e.target.style.transform = 'scale(1.1)'} 
              onMouseOut={e => e.target.style.transform = 'scale(1)'} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
