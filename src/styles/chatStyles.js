export const st = {
  // Container หลักของแอป
  container: { 
    position: 'fixed', 
    inset: 0, 
    display: 'flex', 
    flexDirection: 'column', 
    background: '#F0F2F5', 
    fontFamily: 'sans-serif',
    // ป้องกันการลากคลุมทั้งหน้าจอ ยกเว้นในแชท
    userSelect: 'none',
    WebkitUserSelect: 'none'
  },

  // Header ส่วนบน
  header: { 
    padding: '15px', 
    background: '#FFD700', 
    zIndex: 10, 
    display: 'flex', 
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  headerFlex: { display: 'flex', alignItems: 'center', gap: '10px', width: '100%' },
  headerIcons: { display: 'flex', gap: '15px', fontSize: '18px', color: '#001F3F', alignItems: 'center' },
  avatar: { width: 35, height: 35, borderRadius: '50%', background: '#001F3F', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  // พื้นที่แสดงข้อความ
  chatArea: { 
    flex: 1, 
    padding: '15px', 
    overflowY: 'auto', 
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  msgRow: { display: 'flex', marginBottom: '15px', width: '100%' },

  // ✅ Bubble ข้อความ (ปรับปรุงเพื่อการคัดลอก)
  bubble: { 
    padding: '10px 14px', 
    borderRadius: '18px', 
    maxWidth: '75%', 
    fontSize: '14px', 
    position: 'relative', 
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    // เปิดให้ลากคลุมเฉพาะใน Bubble
    userSelect: 'text',
    WebkitUserSelect: 'text',
    outline: 'none',
    transition: 'background 0.2s',
    wordBreak: 'break-word',
    // ปรับสีแถบไฮไลท์ให้เป็นสีฟ้าอ่อนแบบมาตรฐาน LINE
    cursor: 'text'
  },
  timeText: { fontSize: '9px', opacity: 0.5, marginTop: '4px' },
  
  // Footer & Input Section
  footer: { 
    background: '#001F3F', 
    borderTopLeftRadius: '25px', 
    borderTopRightRadius: '25px', 
    transition: '0.3s', 
    overflow: 'hidden',
    zIndex: 20
  },
  inputRow: { display: 'flex', alignItems: 'center', padding: '12px 8px', gap: '2px' },
  inputBox: { 
    flex: 1, 
    background: '#FFF', 
    borderRadius: '20px', 
    display: 'flex', 
    alignItems: 'center', 
    height: '40px', 
    padding: '0 12px', 
    margin: '0 5px',
    userSelect: 'text' // ให้ช่อง Input พิมพ์ได้ปกติ
  },
  innerInput: { border: 'none', outline: 'none', flex: 1, fontSize: '14px', background: 'transparent' },
  
  // ปุ่มไอคอนต่างๆ
  iconBtn: { 
    background: 'none', 
    border: 'none', 
    color: '#FFD700', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: '4px',
    minWidth: '35px'
  },
  lineMicBtn: { 
    background: 'none', 
    border: 'none', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: '0 8px',
    height: '40px',
    minWidth: '40px'
  },
  sendArrowBtn: { 
    background: 'none', 
    border: 'none', 
    color: '#FFD700', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: '0 5px' 
  },
  stickerBtnInside: { 
    background: 'none', 
    border: 'none', 
    cursor: 'pointer', 
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center'
  },
  
  // Tools Grid (เมนู Plus)
  toolsGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(5, 1fr)', 
    gap: '15px', 
    padding: '15px',
    background: '#001F3F' 
  },
  toolItem: { textAlign: 'center', cursor: 'pointer' },
  iconCircle: { 
    width: '45px', 
    height: '45px', 
    borderRadius: '12px', 
    border: '1px solid #FFD700', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '22px', 
    color: '#FFD700', 
    margin: '0 auto' 
  },
  toolLabel: { color: '#FFD700', fontSize: '10px', marginTop: '5px' },
  
  // ✅ Context Menu (เมนูกดค้าง)
  whiteMenu: { 
    position: 'fixed', 
    background: '#FFF', 
    borderRadius: '20px', 
    width: '200px', 
    padding: '15px', 
    zIndex: 10000, 
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    // เมนูไม่ควรลากคลุมได้
    userSelect: 'none',
    WebkitUserSelect: 'none'
  },
  menuGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' },
  gridItem: { 
    fontSize: '10px', 
    textAlign: 'center', 
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  menuIcon: { 
    fontSize: '20px', 
    background: '#F5F5F7', 
    padding: '10px', 
    borderRadius: '12px', 
    marginBottom: '5px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
