import React from 'react';
import { ref, remove } from "firebase/database";
import { db } from "../../firebase"; 

const DeleteMsgBtn = ({ messageId, onOpenDeleteModal }) => {
  const handleDelete = async () => {
    if (window.confirm("คุณต้องการลบข้อความนี้ใช่หรือไม่?")) {
      try {
        await remove(ref(db, `messages/${messageId}`));
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  return (
    <button onClick={handleDelete} style={styles.deleteButton}>
      🗑️ <span style={styles.label}>ลบข้อความ</span>
    </button>
  );
};

const styles = {
  deleteButton: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '5px', padding: '10px', background: '#fff', border: '1px solid #ddd',
    borderRadius: '12px', cursor: 'pointer', width: '85px'
  },
  label: { fontSize: '11px', color: '#333', fontWeight: 'bold' }
};
export default DeleteMsgBtn;
