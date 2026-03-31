import React from 'react';
import { styles } from '../../styles/shopStyles';

export default function AddressModal(props) {
  const { 
    showAddressList, setShowAddressList, addressList, selectedAddress, setSelectedAddress,
    setEditingAddressId, setShowAddAddressForm, showAddAddressForm, currentCoords,
    GOOGLE_MAPS_API_KEY, handleGetGPS, isLoadingLocation, newName, setNewName,
    newPhone, setNewPhone, newDetail, setNewDetail, handleSaveAddress
  } = props;

  if (!showAddressList) return null;

  return (
    <div style={styles.checkoutOverlay}>
      <div style={styles.checkoutSheet}>
        <div style={styles.checkoutHeader}>
          <span onClick={() => { setShowAddressList(false); setShowAddAddressForm(false); }} style={{cursor: 'pointer', fontSize: '24px'}}>✕</span>
          <span style={{fontWeight: '600'}}>{showAddAddressForm ? 'กรอกที่อยู่จัดส่ง' : 'เลือกที่อยู่'}</span>
          <div style={{width: '24px'}} />
        </div>

        <div style={styles.checkoutBodyScroll}>
          {showAddAddressForm ? (
            <>
              <div style={styles.mapMockup}>
                {currentCoords ? (
                  <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${currentCoords.lat},${currentCoords.lng}&zoom=16&size=600x300&markers=color:red%7C${currentCoords.lat},${currentCoords.lng}&key=${GOOGLE_MAPS_API_KEY}`} alt="map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%', color:'#94A3B8'}}>📍 กรุณากดปุ่ม GPS ด้านล่าง</div>}
              </div>
              <button style={styles.gpsFullBtn} onClick={handleGetGPS}>
                {isLoadingLocation ? '🔄 กำลังค้นหาตำแหน่ง...' : '📍 ดึงตำแหน่งปัจจุบัน (GPS)'}
              </button>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>ชื่อ-นามสกุล</label>
                <input style={styles.formInput} placeholder="ชื่อจริง-นามสกุล" value={newName} onChange={e => setNewName(e.target.value)} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>เบอร์โทรศัพท์</label>
                <input style={styles.formInput} placeholder="08xxxxxxxx" value={newPhone} onChange={e => setNewPhone(e.target.value)} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>รายละเอียดที่อยู่</label>
                <textarea style={styles.formTextarea} placeholder="บ้านเลขที่, ซอย, ถนน..." value={newDetail} onChange={e => setNewDetail(e.target.value)} />
              </div>
              <button style={styles.saveAddrBtn} onClick={handleSaveAddress}>บันทึกที่อยู่</button>
            </>
          ) : (
            <>
              <div style={styles.addNewAddrBtn} onClick={() => { setEditingAddressId(null); setShowAddAddressForm(true); }}>
                <span>➕ เพิ่มที่อยู่ใหม่</span>
                <span>❯</span>
              </div>
              {addressList.map(addr => (
                <div key={addr.id} style={{...styles.addrListItem, border: selectedAddress.id === addr.id ? '1.5px solid #BE123C' : '1px solid #E2E8F0'}} onClick={() => { setSelectedAddress(addr); setShowAddressList(false); }}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{fontWeight: '600'}}>{addr.name}</div>
                    <span style={styles.editLabel} onClick={(e) => { e.stopPropagation(); setEditingAddressId(addr.id); setShowAddAddressForm(true); setNewName(addr.name); setNewPhone(addr.phone); setNewDetail(addr.detail); }}>แก้ไข</span>
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', margin: '4px 0'}}>{addr.phone}</div>
                  <div style={{fontSize: '13px', color: '#64748B'}}>{addr.detail}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
