export const styles = {
  // --- พื้นหลังหลัก ---
  container: { background: '#F1F5F9', minHeight: '100vh', fontFamily: "'Kanit', sans-serif" },
  
  // --- Header ด้านบน ---
  fixedTop: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: '#FFF', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  topHeader: { background: '#1E40AF', padding: '14px', display: 'flex', alignItems: 'center', gap: '8px' },
  searchBox: { flex: 1, background: '#FFF', borderRadius: '20px', padding: '8px 16px' },
  searchInput: { border: 'none', outline: 'none', width: '100%', fontSize: '16px' },
  cartBtn: { position: 'relative', color: '#FFF', cursor: 'pointer' },
  cartBadge: { position: 'absolute', top: '-6px', right: '-6px', background: '#EF4444', color: '#FFF', fontSize: '11px', padding: '2px 6px', borderRadius: '12px' },
  
  // --- เมนูบริการ ---
  serviceGrid: { display: 'flex', justifyContent: 'space-around', padding: '14px 0', background: '#FFF', borderBottom: '3px solid #FACC15' },
  serviceItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' },
  iconWrapper: { fontSize: '26px' },
  serviceLabel: { fontSize: '13px', color: '#475569', marginTop: '4px' },
  
  // --- การ์ดสินค้า ---
  productGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '12px' },
  card: { background: '#FFF', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 8px rgba(0,0,0,0.06)' },
  imgArea: { height: '160px', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  prodEmoji: { fontSize: '70px' },
  commBadge: { position: 'absolute', top: '10px', left: '10px', background: '#3B82F6', color: '#FFF', fontSize: '13px', padding: '4px 10px', borderRadius: '6px', fontWeight: '600' },
  soldBadgeTop: { position: 'absolute', top: '12px', right: '12px', color: '#94A3B8', fontSize: '12px' },
  shareIconBtn: { position: 'absolute', bottom: '10px', right: '10px', background: '#FFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer' },
  infoArea: { padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '150px', position: 'relative' },
  prodName: { fontSize: '16px', color: '#1E293B', fontWeight: '500', height: '44px', overflow: 'hidden' },
  priceRow: { display: 'flex', alignItems: 'baseline', gap: '2px' },
  currency: { fontSize: '14px' },
  priceAmount: { fontSize: '22px', fontWeight: '600', color: '#1E293B' },
  btnRow: { display: 'flex', gap: '8px', marginTop: 'auto' },
  addCartBtn: { flex: 1, background: '#D97706', color: '#FFF', border: 'none', padding: '10px 0', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' },
  buyNowBtn: { flex: 1.2, background: '#BE123C', color: '#FFF', border: 'none', padding: '10px 0', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' },
  affiliateBtn: { width: '100%', background: '#059669', color: '#FFF', padding: '10px 0', borderRadius: '8px', border: 'none', marginTop: '4px', cursor: 'pointer' },
  
  // --- Overlay & Modal (แบบเต็มจอ 100%) ---
  checkoutOverlay: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    background: 'rgba(0,0,0,0.6)', 
    zIndex: 9999, 
    display: 'flex', 
    alignItems: 'flex-end' 
  },
  checkoutSheet: { 
    background: '#FFF', 
    width: '100%', 
    height: '100%',        // สูงเต็มจอ
    display: 'flex', 
    flexDirection: 'column', 
    boxSizing: 'border-box', 
    position: 'relative' 
  },
  checkoutHeader: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '20px 15px', 
    borderBottom: '1px solid #F1F5F9',
    background: '#FFF'
  },
  checkoutBodyScroll: { 
    flex: 1, 
    overflowY: 'auto', 
    padding: '15px', 
    background: '#FFF' 
  },

    // --- 🛒 สไตล์ในตะกร้าสินค้า (Cart Overlay) แก้ใหม่ตามรูปเป๊ะๆ ---
  cartItemCard: { 
    display: 'flex', 
    flexDirection: 'column', 
    background: '#FFF', 
    padding: '16px', 
    borderRadius: '16px', 
    marginBottom: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },

  // ส่วนชื่อร้านค้าด้านบนสินค้า (เหมือนในรูปเป๊ะ)
  shopHeader: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px', 
    marginBottom: '12px',
    fontWeight: '600',
    fontSize: '15px',
    color: '#1E293B'
  },

  // แถวแสดงสินค้า (รูป + รายละเอียด)
  productRow: { 
    display: 'flex', 
    gap: '12px',
    alignItems: 'flex-start'
  },

  cartImgBox: { 
    width: '100px',      // รูปใหญ่สะใจ 100px ตามสั่ง
    height: '100px', 
    background: '#F8FAFC', 
    borderRadius: '12px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '50px',
    flexShrink: 0 
  },

  itemDetails: { 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '4px' 
  },

  // ส่วนราคาและปุ่มบวกลบ (จัดวางแบบแอปมาตรฐาน)
  qtyPriceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px'
  },

  qtyContainer: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '2px', 
    border: '1px solid #E2E8F0', 
    borderRadius: '6px', 
    background: '#F8FAFC',
    overflow: 'hidden'
  },

  qtyCircle: { 
    width: '32px', 
    height: '32px', 
    border: 'none', 
    background: 'none', 
    fontSize: '18px', 
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748B'
  },

  qtyNumber: {
    padding: '0 10px',
    fontSize: '14px',
    fontWeight: '600'
  },

  
  // --- การจัดการที่อยู่ & ฟอร์ม ---
  formGroup: { marginBottom: '15px', width: '100%' },
  formLabel: { fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', display: 'block' },
  formInput: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', boxSizing: 'border-box', background: '#F8FAFC', fontSize: '15px' },
  formTextarea: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', boxSizing: 'border-box', background: '#F8FAFC', height: '100px', resize: 'none', fontFamily: 'inherit', fontSize: '15px' },
  
  addressSelectCard: { background: '#FFF', padding: '15px', borderRadius: '12px', border: '1px dashed #BE123C', display: 'flex', alignItems: 'center', marginBottom: '15px', cursor: 'pointer' },
  addNewAddrBtn: { display: 'flex', justifyContent: 'space-between', padding: '16px', background: '#F8FAFC', borderRadius: '12px', marginBottom: '15px', fontWeight: 'bold', color: '#1E40AF', cursor: 'pointer' },
  addrListItem: { padding: '15px', background: '#FFF', borderRadius: '12px', marginBottom: '10px', cursor: 'pointer', border: '1px solid #E2E8F0' },
  editLabel: { color: '#BE123C', fontWeight: 'bold', fontSize: '14px' },
  
  // --- ปุ่มกดยืนยันด้านล่าง (ใหญ่สะใจ) ---
  gpsFullBtn: { width: '100%', background: '#1E40AF', color: '#FFF', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold', marginBottom: '15px', cursor: 'pointer' },
  finalOrderBtn: { width: '100%', background: '#BE123C', color: '#FFF', padding: '18px', borderRadius: '30px', border: 'none', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' },
  saveAddrBtn: { width: '100%', background: '#BE123C', color: '#FFF', padding: '16px', borderRadius: '30px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' },
  
  // --- อื่นๆ ---
  mapMockup: { width: '100%', height: '180px', background: '#E2E8F0', borderRadius: '16px', overflow: 'hidden', marginBottom: '10px' },
  toast: { position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.85)', color: '#FFF', padding: '12px 24px', borderRadius: '25px', zIndex: 10000 }
};
