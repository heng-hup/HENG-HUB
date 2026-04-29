import React from 'react';

const SaveNoteBtn = ({ text }) => {
  const handleSaveNote = () => {
    const notes = JSON.parse(localStorage.getItem('heng_notes') || '[]');
    notes.push({ id: Date.now(), content: text, date: new Date().toLocaleString() });
    localStorage.setItem('heng_notes', JSON.stringify(notes));
    alert("บันทึกข้อความลงในโน้ตแล้ว");
  };

  return (
    <button onClick={handleSaveNote} style={styles.saveButton}>
      📝 <span style={styles.label}>เก็บในโน้ต</span>
    </button>
  );
};

const styles = {
  saveButton: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '5px', padding: '10px', background: '#fff', border: '1px solid #ddd',
    borderRadius: '12px', cursor: 'pointer', width: '85px'
  },
  label: { fontSize: '11px', color: '#333', fontWeight: 'bold' }
};
export default SaveNoteBtn;
