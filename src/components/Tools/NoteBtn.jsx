import React, { useState } from 'react';
import { Notebook, X, Save, Eye, Plus } from 'lucide-react';
import { st } from '../../styles/chatStyles';

export default function NoteBtn({ onSend }) {
  const [view, setView] = useState('menu'); // 'menu', 'create', 'list'
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState({ title: '', content: '' });
  
  // ตัวอย่างข้อมูลโน้ต (ในอนาคตพี่สามารถดึงจาก Database หรือ LocalStorage ได้)
  const [allNotes, setAllNotes] = useState([
    { id: 1, title: 'ที่อยู่ส่งของ', content: '123 ม.5 ต.หนองสังข์...', date: '20 มีนาคม 2569' },
    { id: 2, title: 'เบอร์ติดต่อช่าง', content: 'ช่างไฟ: 081-xxx-xxxx', date: '19 มีนาคม 2569' }
  ]);

  const handleSave = () => {
    if (!note.title.trim()) return;
    const nowDate = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
    const newNote = { id: Date.now(), ...note, date: nowDate };
    
    setAllNotes([newNote, ...allNotes]); // เก็บเข้าลิสต์
    onSend(`📌 **โน้ตใหม่**\nหัวข้อ: ${note.title}\n${note.content}`); // ส่งเข้าแชท
    setNote({ title: '', content: '' });
    setView('menu');
  };

  return (
    <>
      <div style={st.toolItem} onClick={() => { setIsOpen(true); setView('menu'); }}>
        <div style={st.iconCircle}><Notebook size={24} color="#FFD700" /></div>
        <span style={st.toolLabel}>โน้ตความจำ</span>
      </div>

      {isOpen && (
        <div style={modalSt.overlay}>
          <div style={modalSt.container}>
            <div style={modalSt.header}>
              <span style={{fontWeight: 'bold', color: '#FFD700'}}>
                {view === 'menu' ? 'โน้ตความจำ' : view === 'create' ? 'สร้างโน้ต' : 'รายการโน้ต'}
              </span>
              <X size={20} color="#8E8E93" onClick={() => setIsOpen(false)} style={{cursor: 'pointer'}} />
            </div>

            {/* หน้าเมนูหลัก */}
            {view === 'menu' && (
              <div style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
                <button style={modalSt.menuBtn} onClick={() => setView('create')}>
                  <Plus size={20} style={{marginRight: '10px'}} /> สร้างโน้ตใหม่
                </button>
                <button style={modalSt.menuBtn} onClick={() => setView('list')}>
                  <Eye size={20} style={{marginRight: '10px'}} /> ดูโน้ตที่บันทึกไว้ ({allNotes.length})
                </button>
              </div>
            )}

            {/* หน้าสร้างโน้ต */}
            {view === 'create' && (
              <>
                <input style={modalSt.input} placeholder="หัวข้อ..." value={note.title} onChange={(e)=>setNote({...note, title: e.target.value})} />
                <textarea style={modalSt.textarea} placeholder="เนื้อหา..." value={note.content} onChange={(e)=>setNote({...note, content: e.target.value})} />
                <div style={{display: 'flex', gap: '10px'}}>
                  <button style={{...modalSt.saveBtn, backgroundColor: '#444', color: '#FFF'}} onClick={() => setView('menu')}>ยกเลิก</button>
                  <button style={modalSt.saveBtn} onClick={handleSave}>บันทึก</button>
                </div>
              </>
            )}

            {/* หน้ารายการโน้ต */}
            {view === 'list' && (
              <div style={{maxHeight: '300px', overflowY: 'auto'}}>
                {allNotes.map(n => (
                  <div key={n.id} style={modalSt.noteCard}>
                    <div style={{fontWeight: 'bold', color: '#FFD700'}}>{n.title}</div>
                    <div style={{fontSize: '12px', color: '#AAA'}}>{n.content}</div>
                    <div style={{fontSize: '10px', color: '#666', marginTop: '5px'}}>{n.date}</div>
                  </div>
                ))}
                <button style={{...modalSt.menuBtn, marginTop: '10px'}} onClick={() => setView('menu')}>กลับหน้าหลัก</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const modalSt = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  container: { width: '90%', maxWidth: '350px', backgroundColor: '#1C1C1E', borderRadius: '15px', padding: '20px', border: '1px solid #333' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' },
  input: { width: '100%', backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C', borderRadius: '8px', padding: '10px', color: '#FFF', marginBottom: '10px', outline: 'none' },
  textarea: { width: '100%', height: '100px', backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C', borderRadius: '8px', padding: '10px', color: '#FFF', marginBottom: '15px', outline: 'none', resize: 'none' },
  saveBtn: { flex: 1, backgroundColor: '#FFD700', border: 'none', borderRadius: '8px', padding: '12px', color: '#000', fontWeight: 'bold', cursor: 'pointer' },
  menuBtn: { width: '100%', backgroundColor: '#2C2C2E', border: '1px solid #3A3A3C', borderRadius: '8px', padding: '15px', color: '#FFD700', fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer' },
  noteCard: { backgroundColor: '#2C2C2E', padding: '12px', borderRadius: '8px', marginBottom: '10px', borderLeft: '4px solid #FFD700' }
};
