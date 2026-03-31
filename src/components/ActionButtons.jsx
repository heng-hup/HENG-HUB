import React, { useRef } from 'react';
import { Camera, Image } from 'lucide-react';

export const ActionButtons = ({ onSend }) => {
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      // แยกประเภทไฟล์อัตโนมัติ เพื่อให้แชทอ่านค่าได้ถูกต้อง
      const type = file.type.startsWith('video') ? 'video' : 'image';
      onSend(fileUrl, type); 
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      {/* กล้องมาตรฐานเครื่อง: หล่อสวยด้วย Filter เครื่องลูกค้า และสลับกล้องหน้า/หลังได้เอง */}
      <input 
        type="file" accept="image/*,video/*" capture="environment" 
        ref={cameraInputRef} style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />
      <input 
        type="file" accept="image/*,video/*" 
        ref={galleryInputRef} style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />

      <Camera 
        size={26} color="#FFD700" style={{ cursor: 'pointer' }} 
        onClick={() => cameraInputRef.current.click()} 
      />

      <Image 
        size={26} color="#FFD700" style={{ cursor: 'pointer' }} 
        onClick={() => galleryInputRef.current.click()} 
      />
    </div>
  );
};
