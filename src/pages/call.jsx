import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { startCall as startWebRTC } from "../webrtc";
import { createRoom } from "../services/call";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

export default function Call() {
  const navigate = useNavigate();
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);

  const [calling, setCalling] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [userCoins, setUserCoins] = useState(0);

  // ดึงยอดเหรียญมาโชว์ก่อนโทร
  useEffect(() => {
    const fetchCoins = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) setUserCoins(snap.data().พอยท์ || 0);
      }
    };
    fetchCoins();
  }, []);

  async function handleCall() {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("กรุณา Login ก่อนเข้าใช้งานห้องสนทนา");
        navigate("/login");
        return;
      }

      // --- ส่วนที่เพิ่ม: ระบบหักเหรียญก่อนโทร ---
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const currentCoins = userSnap.data()?.พอยท์ || 0;
      const costPerCall = 10; // ตั้งค่าหักกี่พอยท์ต่อการโทร

      if (currentCoins < costPerCall) {
        alert(`พอยท์ไม่พอ! การโทรต้องใช้ ${costPerCall} PT (คุณมี ${currentCoins} PT)`);
        navigate("/topup");
        return;
      }
      // ------------------------------------

      // 1. สร้างห้องสนทนา
      const { data, error } = await createRoom(user.uid);
      if (error) {
        alert("ไม่สามารถสร้างห้องได้: " + error.message);
        return;
      }

      // 2. หักเหรียญจริงเมื่อสร้างห้องสำเร็จ
      await updateDoc(userRef, {
        พอยท์: increment(-costPerCall)
      });

      setRoomId(data.id);

      // 3. เริ่มต้นระบบ WebRTC
      await startWebRTC(
        data.id,
        localVideo.current,
        remoteVideo.current
      );

      setCalling(true);
      alert(`หัก ${costPerCall} PT เรียบร้อย กำลังเชื่อมต่อสาย...`);
    } catch (err) {
      console.error("Call Error:", err);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อหรือสิทธิ์การเข้าถึงถูกปฏิเสธ");
    }
  }

  function handleEnd() {
    window.location.reload();
  }

  return (
    <div style={container}>
      <h2 style={title}>📞 Video Call (HENG System)</h2>
      
      <div style={coinBadge}>
        🧧 พอยท์ของคุณ: {userCoins.toLocaleString()} PT
      </div>

      {roomId && (
        <p style={roomIdText}>
          Room ID : <span style={{ color: "#fff" }}>{roomId}</span>
        </p>
      )}

      <div style={videoWrap}>
        <video ref={remoteVideo} autoPlay playsInline style={remoteStyle} />
        <video ref={localVideo} autoPlay muted playsInline style={localStyle} />
      </div>

      <div style={controls}>
        {!calling ? (
          <button onClick={handleCall} style={callBtn}>
            🚀 เริ่มโทร (10 PT)
          </button>
        ) : (
          <button onClick={handleEnd} style={endBtn}>
            ❌ วางสาย
          </button>
        )}
        <button onClick={() => navigate("/")} style={backBtn}>กลับหน้าหลัก</button>
      </div>
    </div>
  );
}

/* --- Styles (เพิ่มเฉพาะส่วน) --- */
const coinBadge = {
  background: "#ffd700",
  color: "#000",
  padding: "5px 15px",
  borderRadius: "20px",
  fontWeight: "bold",
  marginBottom: "15px"
};
const container = { width: "100%", height: "100vh", background: "#000", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif" };
const title = { marginBottom: "10px", fontSize: "1.5rem" };
const roomIdText = { color: "#ffd700", fontWeight: "bold", fontSize: "0.9rem" };
const videoWrap = { position: "relative", width: "90%", maxWidth: "700px", marginTop: "10px" };
const remoteStyle = { width: "100%", borderRadius: "12px", background: "#111", aspectRatio: "16/9", objectFit: "cover" };
const localStyle = { position: "absolute", bottom: "15px", right: "15px", width: "120px", borderRadius: "10px", border: "2px solid #ffd700", boxShadow: "0 4px 10px rgba(0,0,0,0.5)" };
const controls = { marginTop: "30px", display: "flex", gap: "15px" };
const callBtn = { background: "linear-gradient(45deg, #00c853, #00e676)", color: "white", border: "none", padding: "14px 28px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer" };
const endBtn = { background: "#ff1744", color: "white", border: "none", padding: "14px 28px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer" };
const backBtn = { background: "#333", color: "white", border: "none", padding: "14px 28px", borderRadius: "30px", cursor: "pointer" };
