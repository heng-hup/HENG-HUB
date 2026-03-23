import React, { useState } from 'react';
import { Search, X, Users, MessageSquare } from 'lucide-react';

export default function ChatList({ onSelectChat }) {
  // 🔍 State สำหรับค้นหาชื่อห้องสนทนา
  const [searchTerm, setSearchTerm] = useState('');

  // สมมติข้อมูลรายชื่อห้องสนทนา (ในเครื่องพี่อาจจะดึงมาจาก API)
  const [rooms] = useState([
    { id: 1, name: 'HENG HENG Official', lastMsg: 'ยินดีต้อนรับครับ', time: '09:00' },
    { id: 2, name: 'กลุ่มครอบครัว เฮง เฮง', lastMsg: 'วันนี้รวย!', time: 'Yesterday' },
    { id: 3, name: 'ฝ่ายบริการลูกค้า', lastMsg: 'แก้ไขเรียบร้อยครับ', time: 'Monday' },
  ]);

  // ✅ กรองรายชื่อห้องตามชื่อที่พิมพ์ค้นหา
  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={st.container}>
      {/* --- ส่วนหัวหน้าแชทและช่องค้นหา --- */}
      <div style={st.header}>
        <h2 style={st.title}>แชท</h2>
        <div style={st.searchWrapper}>
          <Search size={16} color="#94A3B8" />
          <input 
            placeholder="ค้นหาชื่อห้องสนทนา หรือผู้คน..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={st.searchInput}
          />
          {searchTerm && (
            <X size={16} onClick={() => setSearchTerm('')} style={{ cursor: 'pointer' }} />
          )}
        </div>
      </div>

      {/* --- รายชื่อห้องสนทนาที่กรองแล้ว --- */}
      <div style={st.listArea}>
        {filteredRooms.length > 0 ? filteredRooms.map(room => (
          <div 
            key={room.id} 
            onClick={() => onSelectChat(room)} 
            style={st.chatItem}
          >
            <div style={st.avatar}>
              <Users size={20} color="#003366" />
            </div>
            <div style={st.chatInfo}>
              <div style={st.chatTop}>
                <span style={st.roomName}>{room.name}</span>
                <span style={st.time}>{room.time}</span>
              </div>
              <div style={st.lastMsg}>{room.lastMsg}</div>
            </div>
          </div>
        )) : (
          <div style={st.noResult}>ไม่พบรายชื่อที่พี่ค้นหาครับ</div>
        )}
      </div>
    </div>
  );
}

const st = {
  container: { display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFF' },
  header: { padding: '15px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#FFF' },
  title: { fontSize: '20px', fontWeight: 'bold', color: '#003366', marginBottom: '10px' },
  // สไตล์ช่องค้นหาห้องสนทนา
  searchWrapper: { 
    display: 'flex', alignItems: 'center', backgroundColor: '#F1F5F9', 
    padding: '8px 12px', borderRadius: '10px', gap: '8px' 
  },
  searchInput: { 
    border: 'none', background: 'none', outline: 'none', 
    fontSize: '14px', flex: 1, color: '#003366' 
  },
  listArea: { flex: 1, overflowY: 'auto' },
  chatItem: { 
    display: 'flex', padding: '12px 15px', gap: '12px', 
    cursor: 'pointer', borderBottom: '1px solid #F8FAFC', transition: '0.2s'
  },
  avatar: { 
    width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#EAB308', 
    display: 'flex', justifyContent: 'center', alignItems: 'center' 
  },
  chatInfo: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  chatTop: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' },
  roomName: { fontWeight: 'bold', fontSize: '15px', color: '#003366' },
  time: { fontSize: '11px', color: '#94A3B8' },
  lastMsg: { fontSize: '13px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  noResult: { textAlign: 'center', marginTop: '30px', color: '#94A3B8', fontSize: '14px' }
};
