import React, { useState } from 'react';
import { 
  X, FileText, ArrowLeft, Share2, Trash2, 
  PlayCircle, Globe, Users, Send, MessageCircle, HardDrive, Copy, Check
} from 'lucide-react';

export default function HengHengFinalScript({ onClose }) {
  const [tab, setTab] = useState('media');
  const [newItem, setNewItem] = useState({ title: '', value: '' });
  const [shareItem, setShareItem] = useState(null);
  const [copied, setCopied] = useState(false);

  const [data, setData] = useState({
    media: [{ id: 1, title: 'เพลงสากลเพราะๆ', youtubeId: 'dQw4w9WgXcQ' }],
    file: [{ id: 2, title: 'คู่มือสมาชิก HENG HENG.pdf', url: 'https://example.com/manual.pdf' }],
    link: [{ id: 3, title: 'ทางเข้าเว็บหลัก', url: 'https://hengheng88.app' }]
  });

  const getUrl = (item) => item.url || `https://www.youtube.com/watch?v=${item.youtubeId}`;

  // ✅ ระบบแชร์ไปยังแอปอื่น (ทำงานจริง)
  const handleSystemShare = async (item) => {
    const url = getUrl(item);
    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, url: url });
      } catch (e) { console.log('Share failed', e); }
    } else {
      navigator.clipboard.writeText(url);
      alert('คัดลอกลิงก์เรียบร้อย!');
    }
  };

  // ✅ แก้ไข: เพิ่มการแจ้งเตือนเมื่อไม่ใส่ข้อมูล
  const handleAdd = () => {
    if (!newItem.title.trim()) {
      alert("กรอกข้อมูลให้ครบ!");
      return;
    }
    if (!newItem.value.trim()) {
      alert("ลืมวางลิงก์! ใส่ลิงก์ก่อนบันทึก");
      return;
    }

    const isMedia = tab === 'media';
    let val = newItem.value;
    
    // ดึง YouTube ID ถ้าเป็นแท็บวิดีโอ
    if (isMedia && val.includes('v=')) {
      val = val.split('v=')[1].substring(0, 11);
    } else if (isMedia && val.includes('youtu.be/')) {
      val = val.split('youtu.be/')[1].substring(0, 11);
    }

    const newEntry = { 
      id: Date.now(), 
      title: newItem.title, 
      url: isMedia ? null : val, 
      youtubeId: isMedia ? val : null 
    };

    setData({ ...data, [tab]: [newEntry, ...data[tab]] });
    setNewItem({ title: '', value: '' });
    alert("บันทึกข้อมูลเรียบร้อย!");
  };

  return (
    <div style={st.overlay}>
      <div style={st.container}>
        {/* Header */}
        <div style={st.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={18} onClick={onClose} style={{ cursor: 'pointer', color: '#EAB308' }} />
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#EAB308' }}>HENG HENG MEDIA</span>
          </div>
          <X size={18} onClick={onClose} style={{ cursor: 'pointer', color: '#EAB308' }} />
        </div>

        {/* Tab Menu */}
        <div style={st.menuGrid}>
          {['media', 'file', 'link'].map((t) => (
            <div key={t} onClick={() => setTab(t)} style={st.menuItem}>
              <div style={{...st.iconBox, backgroundColor: tab === t ? '#003366' : '#FFFFFF', color: tab === t ? '#EAB308' : '#94A3B8', borderColor: '#EAB308'}}>
                {t === 'media' && <PlayCircle size={22} />}
                {t === 'file' && <FileText size={22} />}
                {t === 'link' && <Globe size={22} />}
              </div>
              <span style={{ fontSize: '10px', color: '#003366', marginTop: '4px', fontWeight: 'bold' }}>
                {t === 'media' ? 'วิดีโอ' : t === 'file' ? 'ไฟล์' : 'ลิงก์'}
              </span>
            </div>
          ))}
        </div>

        {/* Input Zone */}
        <div style={st.addSection}>
          <div style={{...st.inputBox, borderColor: '#EAB308'}}>
            <input 
              placeholder="ระบุหัวข้อ..." 
              value={newItem.title} 
              onChange={e => setNewItem({...newItem, title: e.target.value})} 
              style={st.input} 
            />
            <input 
              placeholder={tab === 'media' ? "วางลิงก์ YouTube ที่นี่..." : "วางลิงก์ที่นี่..."}
              value={newItem.value} 
              onChange={e => setNewItem({...newItem, value: e.target.value})} 
              style={st.input} 
            />
            <button onClick={handleAdd} style={st.addBtn}>บันทึกรายการ</button>
          </div>
        </div>

        {/* Content Area */}
        <div style={st.content}>
          {data[tab]?.map(item => (
            <div key={item.id} style={{...st.card, borderColor: '#EAB308'}}>
              <div style={st.cardHeader}>
                <span style={st.itemTitle}>{item.title}</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Share2 size={18} color="#003366" onClick={() => setShareItem(item)} style={{ cursor: 'pointer' }} />
                  <Trash2 size={18} color="#EF4444" onClick={() => setData({...data, [tab]: data[tab].filter(i => i.id !== item.id)})} style={{ cursor: 'pointer' }} />
                </div>
              </div>
              {tab === 'media' && item.youtubeId && (
                <div style={st.videoWrapper}>
                   <iframe width="100%" height="160" src={`https://www.youtube.com/embed/${item.youtubeId}`} frameBorder="0" allowFullScreen />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Popup แชร์ - แก้ไขสีปุ่มเพื่อน และแชร์แอปอื่น */}
        {shareItem && (
          <div style={st.popOverlay}>
            <div style={st.popCard}>
              <div style={st.popHeader}>
                <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#003366' }}>แชร์ไปยัง...</span>
                <X size={20} onClick={() => setShareItem(null)} style={{ cursor: 'pointer', color: '#003366' }} />
              </div>
              
              <div style={st.shareGrid}>
                {/* ปุ่มเพื่อน: ขวาสูงสีทอง ซ้ายต่ำสีกรมท่า */}
                <div style={st.shareIconBtn} onClick={() => { alert('ส่งให้เพื่อนสำเร็จ'); setShareItem(null); }}>
                  <div style={st.friendYinYangCorrect}>
                    <div style={st.iconCenter}><Users size={24} color="#FFF" /></div>
                  </div>
                  <span style={st.shareLabel}>เพื่อน</span>
                </div>

                <ShareIcon label="LINE" color="#06C755" icon={<MessageCircle size={22}/>} onClick={() => window.open(`https://line.me/R/msg/text/?${encodeURIComponent(getUrl(shareItem))}`)} />
                <ShareIcon label="Telegram" color="#229ED9" icon={<Send size={22}/>} onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(getUrl(shareItem))}`)} />
                <ShareIcon label="Driver" color="#4285F4" icon={<HardDrive size={22}/>} onClick={() => window.open(`https://drive.google.com/share?url=${encodeURIComponent(getUrl(shareItem))}`)} />
              </div>

              <button onClick={() => handleSystemShare(shareItem)} style={st.btnGlobalYellow}>แชร์ไปยังแอปอื่น</button>
              
              <button onClick={() => { navigator.clipboard.writeText(getUrl(shareItem)); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} style={{...st.btnCopy, borderColor: '#EAB308'}}>
                {copied ? <Check size={14} color="#16A34A" /> : <Copy size={14} />} 
                <span style={{marginLeft: '4px'}}>{copied ? 'คัดลอกสำเร็จ!' : 'คัดลอกลิงก์'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const ShareIcon = ({ label, color, icon, onClick }) => (
  <div style={st.shareIconBtn} onClick={onClick}>
    <div style={{...st.iconRound, backgroundColor: color, color: '#FFFFFF'}}>{icon}</div>
    <span style={st.shareLabel}>{label}</span>
  </div>
);

const st = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 4000, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  container: { display: 'flex', flexDirection: 'column', height: '85vh', backgroundColor: '#FFFFFF', width: '340px', borderRadius: '15px', overflow: 'hidden', border: '2px solid #003366', position: 'relative' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', backgroundColor: '#003366', borderBottom: '2px solid #EAB308' },
  menuGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', padding: '10px' },
  menuItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' },
  iconBox: { width: '45px', height: '45px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1.5px solid' },
  addSection: { padding: '0 10px 10px 10px' },
  inputBox: { padding: '10px', borderRadius: '10px', border: '1.5px solid', display: 'flex', flexDirection: 'column', gap: '4px' },
  input: { padding: '8px', borderRadius: '5px', border: '1px solid #E2E8F0', fontSize: '12px', outline: 'none' },
  addBtn: { padding: '10px', backgroundColor: '#EAB308', color: '#003366', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', marginTop: '4px' },
  content: { flex: 1, overflowY: 'auto', padding: '10px', backgroundColor: '#F8FAFC' },
  card: { padding: '10px', borderRadius: '8px', marginBottom: '10px', border: '1.5px solid', backgroundColor: '#FFF' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  itemTitle: { fontWeight: 'bold', color: '#003366', fontSize: '13px', textDecoration: 'underline' },
  videoWrapper: { marginTop: '8px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#000' },
  popOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-end' },
  popCard: { backgroundColor: '#FFF', width: '100%', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', padding: '20px', borderTop: '3px solid #EAB308' },
  popHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  shareGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '15px' },
  shareIconBtn: { display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' },
  shareLabel: { fontSize: '11px', color: '#64748B', marginTop: '4px' },
  iconRound: { width: '48px', height: '48px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  btnGlobalYellow: { width: '100%', padding: '12px', backgroundColor: '#EAB308', color: '#003366', border: 'none', borderRadius: '8px', fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' },
  btnCopy: { width: '100%', padding: '10px', border: '1px dashed', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px' },
  
  // ✅ แก้ไข: ขวาสูงสีทอง (#EAB308) / ซ้ายต่ำกรมท่า (#003366)
  friendYinYangCorrect: { 
    width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', position: 'relative',
    border: '1.5px solid #EAB308',
    background: 'linear-gradient(205deg, #EAB308 50%, #003366 50%)' 
  },
  iconCenter: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5 }
};