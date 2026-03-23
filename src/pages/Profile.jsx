import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase"; // ดึงค่าจากไฟล์ที่คุณตั้งค่าไว้
import { doc, onSnapshot } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";

/**
 * หน้าโปรไฟล์ (Profile Screen) - รวมร่างระบบ Firebase และ UI ใหม่
 * @param {Function} setPage - ฟังก์ชันเปลี่ยนหน้าจาก main.jsx
 */
export default function Profile({ setPage }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. ตรวจสอบสถานะการ Login แบบ Real-time
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 2. ดึงข้อมูลจาก Firestore แบบ Real-time (onSnapshot)
        const docRef = doc(db, "users", user.uid);
        const unsubDoc = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            // กรณีข้อมูลใน DB ยังไม่มี (สมาชิกใหม่)
            setProfile({
              username: user.displayName || "สมาชิกเฮงเฮง",
              email: user.email,
              พอยท์: 0,
              ภาษีสะสม: 0,
              สถานะ: "รอยืนยัน"
            });
          }
          setLoading(false);
        });
        return () => unsubDoc();
      } else {
        // ถ้าไม่ได้ Login ให้ส่งไปหน้า Login
        setPage('login');
      }
    });

    return () => unsubscribe();
  }, [setPage]);

  // ฟังก์ชัน Logout และเปลี่ยนหน้ากลับไปหน้าหลัก
  async function logout() {
    try {
      await signOut(auth);
      setPage('home'); // กลับไปหน้า Home หลังจากออกจากระบบ
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }

  // หน้าจอระหว่างรอโหลดข้อมูล
  if (loading) return (
    <div style={styles.loadingBox}>
      <div className="spinner" style={styles.spinner}></div>
      <h2 style={{ marginTop: "20px", color: "#ffd700" }}>กำลังโหลดข้อมูลมหาเฮง...</h2>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={styles.container}>
      
      {/* HEADER - ข้อมูลส่วนตัวจาก Firebase */}
      <div style={styles.profileHeader}>
        <img
          src={profile?.avatar_url || "https://placehold.co/120/000000/ffd700?text=HENG"}
          alt="avatar"
          style={styles.avatarImg}
        />
        <div style={{ flex: 1 }}>
          <h2 style={styles.username}>{profile?.username || "คุณ เฮงเฮง"}</h2>
          <p style={styles.emailText}>{profile?.email}</p>
          <div style={styles.statusTag}>✅ สถานะ: {profile?.สถานะ || "สมาชิกทั่วไป"}</div>
          
          <div style={{ marginTop: "10px" }}>
            <button style={styles.btnSmall} onClick={() => alert('ฟีเจอร์แก้ไขโปรไฟล์เร็วๆ นี้')}>แก้ไขโปรไฟล์</button>
            <button style={styles.btnDangerSmall} onClick={logout}>ออกจากระบบ</button>
          </div>
        </div>
      </div>

      {/* FINANCE - ส่วนยอดเหรียญ (Real-time) */}
      <div style={styles.walletCard}>
        <h3 style={{ color: "#ffd700", marginTop: 0 }}>🧧 กระเป๋าตังค์เฮงเฮง</h3>
        <div style={styles.walletRow}>
          <div>
            <p style={styles.label}>ยอดพอยท์คงเหลือ</p>
            <h1 style={styles.pointsText}>
              {Number(profile?.พอยท์ || 0).toLocaleString()} <span style={{ fontSize: "18px" }}>PT</span>
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={styles.label}>ภาษีสะสม (7%)</p>
            <h3 style={styles.taxText}>
              {Number(profile?.ภาษีสะสม || 0).toLocaleString()} ฿
            </h3>
          </div>
        </div>
        <button style={styles.btnGold} onClick={() => alert('เปิดระบบเติมเงิน')}>เติมพอยท์ / ถอนเงิน</button>
      </div>

      {/* MENU LIST - ส่วนเมนูการใช้งาน */}
      <div style={styles.menuContainer}>
        <div style={styles.menuItem}>🏦 บัญชีธนาคาร <span>❯</span></div>
        <div style={styles.menuItem}>🧾 ภาษี (ทวิ 50) <span style={styles.pdfBadge}>PDF</span></div>
        <div style={styles.menuItem}>⚙️ การตั้งค่าความปลอดภัย <span>❯</span></div>
        <div style={styles.menuItem} onClick={() => setPage('home')}>🏠 กลับหน้าหลัก</div>
      </div>
    </div>
  );
}

// รวมสไตล์ทั้งหมดเพื่อให้ไฟล์สะอาด
const styles = {
  container: { padding: "20px", color: "white", minHeight: "100vh" },
  loadingBox: { background: "#000", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" },
  spinner: { border: "4px solid #333", borderTop: "4px solid #ffd700", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 1s linear infinite" },
  profileHeader: { display: "flex", alignItems: "center", gap: "20px", marginBottom: "30px", background: "rgba(255,215,0,0.05)", padding: "20px", borderRadius: "15px", border: "1px solid #ffd70033" },
  avatarImg: { width: "100px", height: "100px", borderRadius: "50%", border: "3px solid #ffd700", objectFit: "cover" },
  username: { color: "#ffd700", margin: "0 0 5px 0", fontSize: "20px" },
  emailText: { opacity: 0.7, margin: "0", fontSize: "14px" },
  statusTag: { color: "#22c55e", fontWeight: "bold", fontSize: "12px", marginTop: "5px" },
  walletCard: { marginBottom: "30px", background: "linear-gradient(135deg, #1a1a1a, #000)", padding: "20px", borderRadius: "15px", border: "2px solid #ffd700" },
  walletRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  label: { margin: 0, opacity: 0.6, fontSize: "12px" },
  pointsText: { color: "#4ade80", margin: "5px 0", fontSize: "32px" },
  taxText: { color: "#f87171", margin: "5px 0" },
  btnGold: { background: "#ffd700", color: "#000", border: "none", padding: "10px", borderRadius: "25px", fontWeight: "bold", width: "100%", cursor: "pointer", marginTop: "10px" },
  btnSmall: { background: "#333", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "15px", cursor: "pointer", fontSize: "11px" },
  btnDangerSmall: { background: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "15px", cursor: "pointer", fontSize: "11px", marginLeft: "10px" },
  menuContainer: { background: "rgba(255,255,255,0.05)", borderRadius: "15px", overflow: "hidden" },
  menuItem: { padding: "15px", borderBottom: "1px solid #333", display: "flex", justifyContent: "space-between", cursor: "pointer", fontSize: "14px" },
  pdfBadge: { background: "#ef4444", padding: "2px 6px", borderRadius: "4px", fontSize: "10px" }
};
