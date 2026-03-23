import React from 'react';

/**
 * หน้าหลัก (Home Screen)
 * @param {Function} setPage - ฟังก์ชันสำหรับเปลี่ยนหน้าจอ
 */
export default function Home({ setPage }) {
  // ข้อมูลปุ่มบริการต่างๆ ตามรูปภาพหน้าจอ
  const services = [
    { title: "โรงแรม", icon: "🏨", color: "#1e3a8a" },
    { title: "เที่ยวบิน", icon: "✈️", color: "#1e3a8a" },
    { title: "กิจกรรม", icon: "🎟️", color: "#1e3a8a" },
    { title: "แท็กซี่", icon: "🚕", color: "#1e3a8a" },
    { title: "อาหาร", icon: "🍔", color: "#1e3a8a" },
    { title: "รถเช่า", icon: "🚗", color: "#1e3a8a" },
    { title: "ช้อปปิ้ง", icon: "🛍️", color: "#1e3a8a" },
    { title: "คอร์สเรียน", icon: "🏫", color: "#1e3a8a" },
    { title: "สุขภาพ", icon: "🏥", color: "#1e3a8a" },
    { title: "ประกัน", icon: "🛡️", color: "#1e3a8a" },
    { title: "เกม", icon: "🎮", color: "#1e3a8a" },
    { title: "แอป", icon: "📱", color: "#1e3a8a" }
  ];

  return (
    <div style={styles.container}>
      {/* ส่วนบน: ปุ่มติดตั้งและปุ่มล็อกอิน */}
      <div style={styles.topHeader}>
        <button style={styles.installBtn}>ติดตั้งแอป</button>
        <div style={styles.authGroup}>
          <span style={styles.registerLink} onClick={() => setPage('register')}>สมัครสมาชิก</span>
          <button style={styles.loginBtn} onClick={() => setPage('login')}>เข้าสู่ระบบ</button>
        </div>
      </div>

      {/* ส่วนค้นหา */}
      <div style={styles.searchSection}>
        <div style={styles.searchBar}>
          <span style={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="ค้นหาบริการที่ต้องการ..." 
            style={styles.searchInput} 
          />
        </div>
      </div>

      {/* ส่วน Grid บริการ (3 คอลัมน์) */}
      <div style={styles.grid}>
        {services.map((service, index) => (
          <div 
            key={index} 
            style={{...styles.card, background: `linear-gradient(135deg, ${service.color}, #0a1535)`}}
            onClick={() => service.title === "ช้อปปิ้ง" && setPage('shop')}
          >
            <div style={styles.cardIcon}>{service.icon}</div>
            <div style={styles.cardTitle}>{service.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// สไตล์ CSS-in-JS
const styles = {
  container: {
    padding: '10px',
    paddingBottom: '20px',
  },
  topHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '0 5px'
  },
  installBtn: {
    background: '#ffd700',
    border: 'none',
    padding: '6px 15px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer'
  },
  authGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  registerLink: {
    color: '#fff',
    fontSize: '13px',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  loginBtn: {
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '6px 15px',
    borderRadius: '10px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  searchSection: {
    marginBottom: '20px',
    padding: '0 10px'
  },
  searchBar: {
    background: '#fff',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  searchIcon: {
    marginRight: '10px',
    color: '#888'
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '14px',
    color: '#333'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    padding: '0 10px'
  },
  card: {
    borderRadius: '15px',
    padding: '15px 5px',
    textAlign: 'center',
    cursor: 'pointer',
    border: '1px solid rgba(255,215,0,0.1)',
    transition: 'transform 0.2s',
  },
  cardIcon: {
    fontSize: '28px',
    marginBottom: '8px'
  },
  cardTitle: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#fff'
  }
};
