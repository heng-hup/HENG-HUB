import { useState } from "react";
import { auth } from "../lib/firebase"; 
import { sendPasswordResetEmail } from "firebase/auth"; 

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function send(e) {
    e.preventDefault();
    
    if (!email) return alert("กรุณากรอกอีเมล");

    try {
      // ใช้ Firebase Auth ในการส่งลิงก์รีเซ็ตรหัสผ่าน
      await sendPasswordResetEmail(auth, email);
      alert("🧧 ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว! กรุณาตรวจสอบใน Inbox หรือ Junk mail");
    } catch (error) {
      console.error("Firebase Error:", error);
      // จัดการ Error พื้นฐาน
      if (error.code === "auth/user-not-found") {
        alert("ไม่พบอีเมลนี้ในระบบ");
      } else {
        alert("เกิดข้อผิดพลาด: " + error.message);
      }
    }
  }

  return (
    <div style={containerStyle}>
      <form onSubmit={send} style={formStyle}>
        <h2 style={{ color: "#ffd700", marginBottom: "10px" }}>ลืมรหัสผ่าน?</h2>
        <p style={{ marginBottom: "20px", fontSize: "14px" }}>ระบุอีเมลที่ใช้สมัคร เพื่อรับลิงก์ตั้งรหัสผ่านใหม่</p>
        
        <input 
          type="email"
          placeholder="อีเมลของคุณ (เช่น name@email.com)" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <br />
        
        <button type="submit" style={buttonStyle}>
          ส่งเมลรีเซ็ต
        </button>

        <div style={{ marginTop: "15px" }}>
          <a href="/login" style={{ color: "#fff", fontSize: "12px", textDecoration: "none" }}>
            กลับหน้าเข้าสู่ระบบ
          </a>
        </div>
      </form>
    </div>
  );
}

/* --- Inline Styles --- */

const containerStyle = { 
  background: "linear-gradient(180deg,#020c44,#010a2e)", 
  minHeight: "100vh", 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center",
  color: "white",
  fontFamily: "sans-serif"
};

const formStyle = { 
  textAlign: "center", 
  background: "#0a2cff", 
  padding: "40px", 
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  width: "100%",
  maxWidth: "350px"
};

const inputStyle = { 
  padding: "12px", 
  borderRadius: "8px", 
  border: "none", 
  width: "100%", 
  marginBottom: "15px",
  boxSizing: "border-box"
};

const buttonStyle = { 
  background: "#ffd700", 
  color: "black", 
  padding: "12px 30px", 
  borderRadius: "20px", 
  fontWeight: "bold", 
  border: "none",
  cursor: "pointer",
  width: "100%"
};
