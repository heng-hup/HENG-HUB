import React from 'react';

const ShareBtn = ({ text, title = "HENG HENG Share", url = window.location.href }) => {

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } catch (error) {
        console.log("Share cancelled or failed:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`);
        alert("ระบบคัดลอกข้อความไว้ให้แล้ว");
      } catch (err) {
        console.error("Clipboard failed:", err);
      }
    }
  };

  return (
    <button onClick={handleShare} style={styles.shareButton}>
      📤 <span style={styles.label}>แชร์</span>
    </button>
  );
};

const styles = {
  // แก้ไขตรงนี้: shareButton ต้องมี : อันเดียวและตามด้วย { ให้ถูกต้อง
  shareButton: {
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
    transition: 'all 0.2s ease'
  },
  label: {
    fontSize: '11px',
    color: '#333',
    fontWeight: 'bold'
  }
};

export default ShareBtn;
