// src/components/Shop/MapStaticView.jsx
import React from 'react';

// Styles เฉพาะสำหรับส่วนแสดงแผนที่
const mapStyles = {
  mapMockup: { 
    width: '100%', 
    height: '140px', 
    background: '#E2E8F0', 
    borderRadius: '12px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    overflow: 'hidden' 
  },
  mapPlaceholder: { 
    color: '#94A3B8', 
    fontSize: '14px',
    padding: '20px',
    textAlign: 'center'
  },
};

export default function MapStaticView({ coords, apiKey }) {
  return (
    <div style={mapStyles.mapMockup}>
      {coords ? (
        <img 
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${coords.lat},${coords.lng}&zoom=16&size=600x200&maptype=roadmap&markers=color:red%7C${coords.lat},${coords.lng}&key=${apiKey}`} 
          alt="Google Map Location"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div style={mapStyles.mapPlaceholder}>
          📍 แผนที่ Google จะแสดงเมื่อกดปุ่ม GPS หรือเลือกที่อยู่ที่มีพิกัด เพื่อความแม่นยำในการจัดส่ง
        </div>
      )}
    </div>
  );
}
