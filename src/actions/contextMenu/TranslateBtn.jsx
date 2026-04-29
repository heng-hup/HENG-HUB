import React from 'react';

const TranslateBtn = ({ text }) => {
  const handleTranslate = () => {
    const googleTranslateUrl = `https://translate.google.com/?sl=auto&tl=th&text=${encodeURIComponent(text)}&op=translate`;
    window.open(googleTranslateUrl, '_blank');
  };

  return (
    <button onClick={handleTranslate} style={styles.translateButton}>
      🌐 <span style={styles.label}>แปลภาษา</span>
    </button>
  );
};

const styles = {
  translateButton: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '5px', padding: '10px', background: '#fff', border: '1px solid #ddd',
    borderRadius: '12px', cursor: 'pointer', width: '85px'
  },
  label: { fontSize: '11px', color: '#333', fontWeight: 'bold' }
};
export default TranslateBtn;
