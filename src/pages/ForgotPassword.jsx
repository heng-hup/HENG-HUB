import React, { useState } from 'react';
import { auth } from '../firebase'; // ✅ ย้อนกลับ 1 ชั้นเพื่อไปหาไฟล์ firebase ใน src
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ ส่งลิงก์กู้คืนรหัสผ่านไปที่อีเมลแล้ว!");
    } catch (error) {
      setMessage("❌ ไม่พบอีเมลนี้ในระบบ");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔑 กู้คืนรหัสผ่าน</h2>
        <p style={{ color: "#fff", marginBottom: "20px" }}>กรอกอีเมลเพื่อรับลิงก์ตั้งรหัสใหม่</p>
        <form onSubmit={handleReset}>
          <input 
            type="email" 
            placeholder="ใส่อีเมลของคุณ..." 
            style={styles.input} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <button type="submit" style={styles.btnGold}>ส่งข้อมูล HENG HENG</button>
        </form>
        {message && <p style={styles.msg}>{message}</p>}
        <button onClick={() => navigate('/')} style={styles.btnBack}>กลับไปหน้าหลัก</button>
      </div>
    </div>
  );
}

const styles = {
  container: { background: "#000", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" },
  card: { background: "#00338D", padding: "30px", borderRadius: "20px", border: "2px solid #ffd700", width: "100%", maxWidth: "400px", textAlign: "center" },
  title: { color: "#ffd700", marginBottom: "10px" },
  input: { width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "10px", border: "none", boxSizing: "border-box" },
  btnGold: { width: "100%", padding: "12px", borderRadius: "25px", border: "none", background: "#ffd700", color: "#00338D", fontWeight: "bold", cursor: "pointer" },
  btnBack: { background: "none", border: "none", color: "#fff", marginTop: "20px", cursor: "pointer", textDecoration: "underline" },
  msg: { color: "#ffd700", marginTop: "15px", fontWeight: "bold" }
};
