import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ ถูกต้อง: ใช้ตัวนำทางของระบบ Routes
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("⚠️ รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: email,
        username: email.split('@')[0], 
        createdAt: new Date(),
        role: "user",
        points: 0
      });
      
      const userData = {
        id: user.uid,
        name: "ผู้ใช้ใหม่", 
        handle: `@${email.split('@')[0]}`,
        avatar: '👤',
        email: email
      };

      const savedAccounts = JSON.parse(localStorage.getItem('heng_accounts')) || [];
      if (!savedAccounts.find(acc => acc.id === user.uid) && savedAccounts.length < 8) {
        localStorage.setItem('heng_accounts', JSON.stringify([...savedAccounts, userData]));
      }

      localStorage.setItem('current_heng_user', JSON.stringify(userData));

      // ✅ จุดที่ 1: สั่งให้ล็อกอินทันทีหลังสมัครเสร็จ
      if (setIsLoggedIn) {
        setIsLoggedIn(true);
      }

      alert("🎉 สมัครสมาชิกสำเร็จ!");
      
      // ✅ จุดที่ 2: เด้งไปหน้าโปรไฟล์ทันที
      navigate('/profile'); 
      
    } catch (error) {
      alert("❌ สมัครไม่สำเร็จ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', background: '#f4f4f4', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '15px', maxWidth: '400px', width: '100%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        
        <h2 style={{ color: '#00338D', marginBottom: '20px' }}>สมัครสมาชิก HENG HENG</h2>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="ใส่อีเมลของคุณ" 
            required
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={styles.input}
          />

          <div style={{ position: 'relative' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="ตั้งรหัสผ่าน (6 ตัวขึ้นไป)" 
              required
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={styles.input}
            />
            <span 
              onClick={() => setShowPassword(!showPassword)} 
              style={styles.eyeIcon}
            >
              {showPassword ? "👁️" : "🙈"} 
            </span>
          </div>
          
          {/* ✅ ปุ่มยืนยัน สีน้ำเงินเดิม ตำแหน่งเดิม */}
          <button 
            type="submit" 
            disabled={loading}
            style={styles.submitBtn}
          >
            {loading ? "กำลังบันทึก..." : "ยืนยันการสมัคร"}
          </button>
        </form>

        {/* ✅ จุดสำคัญที่สุด: ปุ่มเด้งกลับหน้าล็อกอิน */}
        <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
          มีบัญชีอยู่แล้ว? <span 
            style={{ color: '#00338D', fontWeight: 'bold', cursor: 'pointer' }} 
            onClick={() => navigate('/', { state: { openLogin: true } })} // ✅ ใช้ navigate('/') เพื่อดีดกลับไปหน้าหลัก (ที่มีหน้า Login ของพี่อยู่)
          >
            เข้าสู่ระบบที่นี่
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  input: { 
    width: '100%',
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #ccc', 
    fontSize: '16px',
    boxSizing: 'border-box'
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '20px',
    userSelect: 'none'
  },
  submitBtn: { 
    background: '#00338D', // ✅ สีเดิม
    color: 'white', 
    padding: '14px', 
    borderRadius: '8px', 
    fontWeight: 'bold', 
    border: 'none', 
    cursor: 'pointer',
    fontSize: '16px'
  }
};
