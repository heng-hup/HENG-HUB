import React, { useState } from 'react';
import { X, Search, ArrowLeft } from 'lucide-react';

// 1. เพิ่ม onSend เข้ามาใน Props เพื่อให้ส่งข้อความกลับไปที่แชทได้
export default function CreateGroupModal({ onClose, friends, onSend }) {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [groupName, setGroupName] = useState(''); // State สำหรับเก็บชื่อกลุ่ม

  const toggleFriend = (id) => {
    if (selectedFriends.includes(id)) {
      setSelectedFriends(selectedFriends.filter(fid => fid !== id));
    } else {
      setSelectedFriends([...selectedFriends, id]);
    }
  };

  // 2. ฟังก์ชันจัดการเมื่อกดปุ่ม "สร้าง"
  const handleCreate = () => {
    if (selectedFriends.length === 0) return; // ถ้าไม่เลือกเพื่อนเลย จะกดไม่ได้
    
    const selectedData = friends.filter(f => selectedFriends.includes(f.id));
    const members = selectedData.map(f => f.name).join(', ');
    const name = groupName || "กลุ่มใหม่";

    // ส่งข้อความแจ้งเตือนการสร้างกลุ่มเข้าสู่หน้าแชทหลัก
    if (onSend) {
      onSend(`👥 สร้างกลุ่ม: ${name}\nสมาชิก: ${members}`);
    }
    
    onClose(); // ปิดหน้าต่าง Modal หลังจากสร้างเสร็จ
  };

  return (
    <div style={modalSt.overlay}>
      <div style={modalSt.container}>
        {/* Header */}
        <div style={modalSt.header}>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <ArrowLeft size={24} onClick={onClose} style={{cursor: 'pointer'}} />
            <span style={{fontSize: '18px', fontWeight: 'bold'}}>กลุ่มใหม่</span>
          </div>
          
          {/* 3. แก้ไขจาก <span> เป็น <button> เพื่อให้รับคำสั่ง onClick ได้จริง */}
          <button 
            onClick={handleCreate}
            disabled={selectedFriends.length === 0}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              // เปลี่ยนสีตามสถานะการเลือกเพื่อนแบบในรูปพี่
              color: selectedFriends.length > 0 ? '#FFD700' : '#666', 
              cursor: selectedFriends.length > 0 ? 'pointer' : 'default'
            }}
          >
            สร้าง
          </button>
        </div>

        {/* ช่องกรอกชื่อกลุ่ม */}
        <div style={{padding: '15px', borderBottom: '1px solid #333'}}>
          <input 
            style={modalSt.groupNameInput} 
            placeholder="ชื่อกลุ่ม (มีหรือไม่มีก็ได้)" 
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        {/* ช่องค้นหา */}
        <div style={modalSt.searchBar}>
          <Search size={18} color="#8E8E93" />
          <input style={modalSt.searchInput} placeholder="ค้นหา" />
        </div>

        {/* รายการเพื่อนที่ดึงมาจาก props */}
        <div style={modalSt.listContainer}>
          <div style={{padding: '10px 15px', fontSize: '14px', color: '#8E8E93'}}>แนะนำ</div>
          {friends && friends.map(friend => (
            <div key={friend.id} style={modalSt.friendItem} onClick={() => toggleFriend(friend.id)}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <img src={friend.avatar} alt="" style={modalSt.avatar} />
                <span style={{color: '#FFF'}}>{friend.name}</span>
              </div>
              {/* วงกลมติ๊กเลือกสีฟ้า */}
              <div style={{
                ...modalSt.checkbox,
                backgroundColor: selectedFriends.includes(friend.id) ? '#3B82F6' : 'transparent',
                borderColor: selectedFriends.includes(friend.id) ? '#3B82F6' : '#666'
              }}>
                {selectedFriends.includes(friend.id) && <div style={modalSt.checkMark} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const modalSt = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', zIndex: 2000 },
  container: { display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#1C1C1E' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid #333' },
  groupNameInput: { width: '100%', backgroundColor: 'transparent', border: 'none', color: '#FFF', fontSize: '16px', outline: 'none' },
  searchBar: { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#2C2C2E', margin: '15px', padding: '8px 15px', borderRadius: '10px' },
  searchInput: { backgroundColor: 'transparent', border: 'none', color: '#FFF', width: '100%', outline: 'none' },
  listContainer: { flex: 1, overflowY: 'auto' },
  friendItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', cursor: 'pointer' },
  avatar: { width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#444', objectFit: 'cover' },
  checkbox: { width: '22px', height: '22px', borderRadius: '50%', border: '2px solid', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  checkMark: { width: '10px', height: '6px', borderLeft: '2px solid #FFF', borderBottom: '2px solid #FFF', transform: 'rotate(-45deg)', marginBottom: '3px' }
};
