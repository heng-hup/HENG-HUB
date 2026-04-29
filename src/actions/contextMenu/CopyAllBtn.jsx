import React from 'react';

const CopyAllBtn = ({ text }) => {
  
  const handleCopy = async () => {
    if (!text) {
      alert("ไม่มีข้อความให้คัดลอก");
      return;
    }

    try {
      // ใช้ Clipboard API ของเบราว์เซอร์
      await navigator.clipboard.writeText(text);
      
      // แสดงแจ้งเตือนเล็กน้อย (พี่นัตอาจเปลี่ยนเป็น Toast UI ทีหลังได้ครับ)
      alert("คัดลอกข้อความแล้ว!");
      console.log("Copied to clipboard:", text);
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("ไม่สามารถคัดลอกข้อความได้");
    }
  };

  return (
    <button 
      onClick={handleCopy}
      style={styles.copyButton}
      title="คัดลอกข้อความ"
    >
      📋 <span style={styles.label}>คัดลอก</span>
    </button>
  );
};

const styles = {
  // แก้ไขจุดนี้: ตรวจสอบเครื่องหมาย : ให้มีอันเดียวและตามด้วย {
  copyButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    padding: '10px',
    background: '#ffffff',
    border: '1px solid #eee',
    borderRadius: '12px',
    cursor: 'pointer',
    width: '85px',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  label: {
    fontSize: '11px',
    color: '#333',
    fontWeight: 'bold'
  }
};

export default CopyAllBtn;
