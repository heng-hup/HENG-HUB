// src/components/Shop/AddressManager.jsx
import React from 'react';
import MapStaticView from './MapStaticView'; // นำเข้าคอมโพเนนต์แผนที่

// ดึง Styles เดิมที่เกี่ยวกับที่อยู่มาไว้ที่นี่ (เพื่อความ Clean ในไฟล์หลัก)
import { styles as shopStyles } from '../../pages/Shop'; 
// หมายเหตุ: พี่นัทต้อง export const styles ใน Shop.jsx ด้วยนะครับ หรือย้าย styles ไปไฟล์แยก

export default function AddressManager({
  // Props สำหรับควบคุมการแสดงผล
  showAddressList, setShowAddressList,
  showAddAddressForm, setShowAddAddressForm,
  
  // Props ข้อมูลที่อยู่
  addressList, selectedAddress, setSelectedAddress,
  editingAddressId, setEditingAddressId,
  
  // Props สำหรับฟอร์ม
  formState: { newName, setNewName, newPhone, setNewPhone, newDetail, setNewDetail, isNewDefault, setIsNewDefault },
  
  // Props สำหรับ GPS
  gpsState: { currentCoords, isLoadingLocation, GOOGLE_MAPS_API_KEY },
  
  // Props ฟังก์ชันการทำงาน
  handleEditClick, handleSaveAddress, handleGetGPS
}) {

  // --- 1. หน้าจอเลือกที่อยู่ (Address List) ---
  if (showAddressList) {
    return (
      <div style={shopStyles.checkoutOverlay}>
        <div style={shopStyles.checkoutSheet}>
          <div style={shopStyles.checkoutHeader}>
            <span onClick={() => setShowAddressList(false)} style={{cursor: 'pointer', fontSize: '24px'}}>←</span>
            <span style={{fontWeight: '600'}}>ที่อยู่ของคุณ</span>
            <div style={{width: '24px'}} />
          </div>
          
          <div style={shopStyles.checkoutBodyScroll}>
            <div style={shopStyles.addNewAddrBtn} onClick={() => { setEditingAddressId(null); setShowAddAddressForm(true); }}>
              <span>➕ เพิ่มที่อยู่ใหม่</span>
              <span>❯</span>
            </div>
            
            {addressList.map(addr => (
              <div 
                key={addr.id} 
                style={{
                  ...shopStyles.addrListItem, 
                  border: selectedAddress.id === addr.id ? '1.5px solid #BE123C' : '1px solid #E2E8F0',
                  cursor: 'pointer'
                }} 
                onClick={() => { setSelectedAddress(addr); setShowAddressList(false); }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{fontWeight: '600'}}>{addr.name}</div>
                  <span style={shopStyles.editLabel} onClick={(e) => handleEditClick(e, addr)}>แก้ไข</span>
                </div>
                <div style={{fontSize: '14px', color: '#475569', margin: '4px 0'}}>{addr.phone}</div>
                <div style={{fontSize: '13px', color: '#64748B'}}>{addr.detail}</div>
                {addr.isDefault && <div style={shopStyles.defaultBadge}>ค่าเริ่มต้น</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- 2. หน้าจอพอร์ม เพิ่ม/แก้ไขที่อยู่ (Add/Edit Form) ---
  if (showAddAddressForm) {
    return (
      <div style={shopStyles.checkoutOverlay}>
        <div style={shopStyles.checkoutSheet}>
          <div style={shopStyles.checkoutHeader}>
            <span onClick={() => { setShowAddAddressForm(false); setEditingAddressId(null); }} style={{cursor: 'pointer', fontSize: '20px'}}>✕</span>
            <span style={{fontWeight: '600'}}>{editingAddressId ? 'แก้ไขที่อยู่' : 'เพิ่มที่อยู่ใหม่'}</span>
            <div style={{width: '20px'}} />
          </div>
          
          <div style={shopStyles.checkoutBodyScroll}>
            <div style={shopStyles.gpsContainer}>
              {/* เรียกใช้ Component แสดงแผนที่ */}
              <MapStaticView coords={currentCoords} apiKey={GOOGLE_MAPS_API_KEY} />
              
              <button style={shopStyles.gpsFullBtn} onClick={handleGetGPS} disabled={isLoadingLocation}>
                {isLoadingLocation ? '🔄 กำลังค้นหาที่อยู่ละเอียด...' : '📍 ใช้ที่อยู่ปัจจุบัน (GPS)'}
              </button>
            </div>

            <div style={shopStyles.formLabel}>ชื่อ-นามสกุล</div>
            <input style={shopStyles.formInput} placeholder="ชื่อจริงและนามสกุล" value={newName} onChange={e => setNewName(e.target.value)} />
            
            <div style={shopStyles.formLabel}>หมายเลขโทรศัพท์</div>
            <input style={shopStyles.formInput} type="tel" placeholder="08xxxxxxxx" value={newPhone} onChange={e => setNewPhone(e.target.value)} />
            
            <div style={shopStyles.formLabel}>รายละเอียดที่อยู่ (บ้านเลขที่/ซอย/ตึก/ชั้น)</div>
            <textarea 
              style={shopStyles.formTextarea} 
              placeholder="กรุณาระบุรายละเอียดเพิ่มเติม เช่น บ้านเลขที่ หรือจุดสังเกต..." 
              value={newDetail} 
              onChange={e => setNewDetail(e.target.value)} 
            />

            <div style={shopStyles.defaultToggleRow}>
              <span>ตั้งเป็นค่าเริ่มต้น</span>
              <div 
                onClick={() => setIsNewDefault(!isNewDefault)} 
                style={{...shopStyles.toggleBg, backgroundColor: isNewDefault ? '#10B981' : '#CBD5E1'}}
              >
                <div style={{...shopStyles.toggleCircle, transform: isNewDefault ? 'translateX(20px)' : 'translateX(0px)'}} />
              </div>
            </div>
            
            <button style={shopStyles.saveAddrBtn} onClick={handleSaveAddress}>บันทึกที่อยู่</button>
          </div>
        </div>
      </div>
    );
  }

  return null; // ไม่แสดงอะไรเลยถ้า states เป็น false ทั้งคู่
}
