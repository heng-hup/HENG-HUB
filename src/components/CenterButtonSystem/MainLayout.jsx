import React, { useState } from 'react';
import CameraOverlay from './components/CenterButtonSystem/CameraOverlay';

export default function MainLayout() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <div>
      {/* โค้ดหน้าจอหลักของพี่นัท... */}

      {/* ปุ่มกลาง (⚡) */}
      <div onClick={() => setIsCameraOpen(true)}>
         {/* ดีไซน์ปุ่มสายฟ้าของพี่... */}
      </div>

      {/* ถ้ากดปุ่ม ให้แสดงหน้ากล้องทับขึ้นมา */}
      {isCameraOpen && <CameraOverlay onClose={() => setIsCameraOpen(false)} />}
    </div>
  );
}
