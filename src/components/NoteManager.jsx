import React, { useState, useRef } from 'react';
import { X, Plus, Trash2, Edit3, Camera, Save, Image as ImageIcon } from 'lucide-react';

export default function NoteManager({ notes, onAdd, onUpdate, onDelete, onClose }) {
  const [isEditing, setIsEditing] = useState(null); 
  const [tempContent, setTempContent] = useState("");
  const [tempImage, setTempImage] = useState(null); 
  const [showAdd, setShowAdd] = useState(false);
  const fileInputRef = useRef(null);

  // --- 1. ฟังก์ชันดึง Video ID จากลิงก์ YouTube (แบบละเอียด) ---
  const getYouTubeID = (text) => {
    if (!text) return null;
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = text.match(regExp);
    return (match && match[1]) ? match[1] : null;
  };

  // --- 2. ฟังก์ชันรองรับการลากวาง (Drag & Drop) ---
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (data) {
      // เมื่อวางลิงก์ ระบบจะสร้างโน้ตใหม่โดยใช้ลิงก์นั้นทันที
      onAdd(data); 
      // หากอยากให้เปิดหน้าเขียนโน้ตขึ้นมาด้วย สามารถตั้งค่า setShowAdd(true) และ setTempContent(data) ได้ครับ
    }
  };

  // --- 3. การจัดการรูปภาพ ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setTempImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // --- 4. ฟังก์ชันบันทึกและแก้ไข ---
  const handleSaveAdd = () => {
    if (!tempContent.trim() && !tempImage) return;
    onAdd(tempContent, tempImage); 
    setTempContent("");
    setTempImage(null);
    setShowAdd(false);
  };

  const handleStartEdit = (note) => {
    setIsEditing(note.id);
    setTempContent(note.content);
  };

  const handleSaveEdit = (id) => {
    onUpdate(id, tempContent);
    setIsEditing(null);
    setTempContent("");
  };

  return (
    <div 
      onDragOver={(e) => e.preventDefault()} 
      onDrop={handleDrop}
      onClick={(e) => e.stopPropagation()}
      style={{ 
        position: 'absolute', right: 0, top: 0, width: '100%', maxWidth: '350px', 
        height: '100%', backgroundColor: '#FFF', zIndex: 3000, 
        boxShadow: '-5px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' 
      }} 
    >
      {/* Header */}
      <div style={{ padding: '20px', background: '#001F3F', color: '#FFD700', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '18px' }}>📔 บันทึกช่วยจำ</h3>
        <X size={24} onClick={onClose} style={{ cursor: 'pointer' }} title="ปิด" />
      </div>

      {/* Add Button Area */}
      {!showAdd && (
        <div style={{ padding: '15px', borderBottom: '1px solid #EEE' }}>
          <button 
            onClick={() => { setShowAdd(true); setTempContent(""); setTempImage(null); }} 
            style={{ width: '100%', padding: '12px', backgroundColor: '#FFD700', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Plus size={20} /> เขียนบันทึกใหม่
          </button>
        </div>
      )}

      {/* Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '15px', backgroundColor: '#F8F9FA' }}>
        
        {/* Form: Add New Note */}
        {showAdd && (
          <div style={{ marginBottom: '20px', padding: '15px', background: '#FFF', borderRadius: '12px', border: '2px solid #FFD700', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
            <textarea 
              autoFocus 
              style={{ width: '100%', border: 'none', outline: 'none', minHeight: '80px', resize: 'none', fontSize: '14px' }} 
              placeholder="วางลิงก์ YouTube หรือพิมพ์ที่นี่..." 
              value={tempContent} 
              onChange={(e) => setTempContent(e.target.value)} 
            />
            
            {tempImage && (
              <div style={{ position: 'relative', marginTop: '10px' }}>
                <img src={tempImage} style={{ width: '100%', borderRadius: '8px', maxHeight: '150px', objectFit: 'cover' }} alt="preview" />
                <X size={16} onClick={() => setTempImage(null)} style={{ position: 'absolute', top: 5, right: 5, background: '#FFF', borderRadius: '50%', cursor: 'pointer' }} />
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <button onClick={() => fileInputRef.current.click()} style={{ background: '#F0F0F0', border: 'none', borderRadius: '6px', padding: '8px', cursor: 'pointer' }}>
                <Camera size={20} color="#555" />
                <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleImageChange} />
              </button>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setShowAdd(false)} style={{ border: 'none', background: 'none', color: '#888', cursor: 'pointer' }}>ยกเลิก</button>
                <button onClick={handleSaveAdd} style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>บันทึก</button>
              </div>
            </div>
          </div>
        )}

        {notes.length === 0 && !showAdd && (
          <div style={{ textAlign: 'center', color: '#BBB', marginTop: '40px' }}>ยังไม่มีบันทึก...<br/><small>(ลองลากลิงก์ YouTube มาวางดูครับ)</small></div>
        )}

        {/* Notes List */}
        {notes.map(note => {
          const videoId = getYouTubeID(note.content);
          return (
            <div key={note.id} style={{ padding: '12px', backgroundColor: '#FFF', borderRadius: '10px', marginBottom: '12px', borderLeft: '5px solid #FFD700', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              {isEditing === note.id ? (
                <textarea 
                  autoFocus 
                  style={{ width: '100%', border: '1px solid #FFD700', borderRadius: '5px', padding: '8px', fontSize: '14px', outline: 'none' }} 
                  value={tempContent} 
                  onChange={(e) => setTempContent(e.target.value)} 
                />
              ) : (
                <>
                  {/* YouTube Player Section */}
                  {videoId && (
                    <div style={{ marginBottom: '10px', overflow: 'hidden', borderRadius: '8px', backgroundColor: '#000', position: 'relative', paddingTop: '56.25%' }}>
                      <iframe 
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        src={`https://www.youtube.com/embed/${videoId}`} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  {note.image && <img src={note.image} alt="note" style={{ width: '100%', borderRadius: '5px', marginBottom: '8px' }} />}
                  <div style={{ fontSize: '14px', color: '#333', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{note.content}</div>
                </>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #F5F5F5' }}>
                <span style={{ fontSize: '10px', color: '#CCC' }}>{note.time}</span>
                <div style={{ display: 'flex', gap: '15px' }}>
                  {isEditing === note.id ? (
                    <Save size={18} color="#4CAF50" onClick={() => handleSaveEdit(note.id)} style={{ cursor: 'pointer' }} />
                  ) : (
                    <Edit3 size={18} color="#999" onClick={() => handleStartEdit(note)} style={{ cursor: 'pointer' }} />
                  )}
                  <Trash2 size={18} color="#FF4D4D" onClick={() => onDelete(note.id)} style={{ cursor: 'pointer' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
