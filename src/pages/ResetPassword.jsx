import { useState } from "react";
import { auth } from "../lib/firebase"; 
import { updatePassword } from "firebase/auth";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function update(e) {
    e.preventDefault();
    
    // ตรวจสอบ User ปัจจุบันจาก Firebase Instance
    const user = auth.currentUser;
    if (!user) {
      alert("กรุณาเข้าสู่ระบบก่อนเปลี่ยนรหัสผ่าน หรือใช้ลิงก์จากอีเมลรีเซ็ต");
      return;
    }

    if (password.length < 6) {
      alert("รหัสผ่านควรมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }

    setLoading(true);
    try {
      // ใช้ฟังก์ชันของ Firebase Auth โดยตรง
      await updatePassword(user, password);
      alert("🧧 เปลี่ยนรหัสผ่านสำเร็จแล้ว!");
      setPassword("");
    } catch (error) {
      console.error("Firebase Error:", error.message);
      
      // กรณี Error ที่พบบ่อย: ต้องมีการ Re-authenticate (ล็อกอินใหม่) ก่อนถึงจะเปลี่ยนรหัสได้
      if (error.code === "auth/requires-recent-login") {
        alert("เพื่อความปลอดภัย กรุณาล็อกอินใหม่อีกครั้งก่อนทำการเปลี่ยนรหัสผ่าน");
      } else {
        alert("เกิดข้อผิดพลาด: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>ตั้งรหัสผ่านใหม่</h2>
      <form onSubmit={update} style={formStyle}>
        <input 
          type="password" 
          placeholder="กรอกรหัสผ่านใหม่" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button 
          disabled={loading}
          style={{ 
            ...buttonStyle,
            background: loading ? "#666" : "#facc15",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "กำลังบันทึก..." : "อัปเดตรหัสผ่าน"}
        </button>
      </form>
    </div>
  );
}

/* --- Styles --- */
const containerStyle = { 
  maxWidth: "400px", 
  margin: "50px auto", 
  padding: "20px", 
  background: "#1a1a1a", 
  borderRadius: "12px", 
  border: "1px solid #facc15",
  fontFamily: "sans-serif"
};

const titleStyle = { 
  color: "#facc15", 
  textAlign: "center", 
  marginBottom: "20px" 
};

const formStyle = { 
  display: "flex", 
  flexDirection: "column", 
  gap: "15px" 
};

const inputStyle = { 
  padding: "12px", 
  borderRadius: "8px", 
  border: "1px solid #444", 
  background: "#333", 
  color: "white" 
};

const buttonStyle = { 
  padding: "12px", 
  borderRadius: "8px", 
  border: "none", 
  color: "black", 
  fontWeight: "bold",
  transition: "0.3s"
};
