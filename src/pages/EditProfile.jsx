import { useEffect, useState } from "react";
import { auth, db, storage } from "../lib/firebase"; // นำเข้า firebase config
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const user = auth.currentUser; // ใช้ Firebase Auth
      if (!user) return;

      const docSnap = await getDoc(doc(db, "profiles", user.uid));

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUsername(data.username || "");
        setBio(data.bio || "");
        setAvatar(data.avatar_url || "");
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  }

  async function save() {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("กรุณาเข้าสู่ระบบ");

      // อัปเดตข้อมูลใน Firestore
      await setDoc(doc(db, "profiles", user.uid), {
        username,
        bio,
        updatedAt: new Date()
      }, { merge: true });

      alert("บันทึกโปรไฟล์สำเร็จ");
    } catch (error) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function uploadAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const user = auth.currentUser;
      if (!user) return;

      setLoading(true);
      // อัปโหลดไฟล์ไปที่ Firebase Storage
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, file);
      
      // ดึง URL ของรูปภาพออกมา
      const downloadURL = await getDownloadURL(storageRef);

      // อัปเดต URL รูปภาพใน Firestore
      await updateDoc(doc(db, "profiles", user.uid), {
        avatar_url: downloadURL
      });

      setAvatar(downloadURL);
      alert("อัปโหลดรูปสำเร็จ");
    } catch (error) {
      alert("อัปโหลดไม่สำเร็จ: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", color: "#facc15" }}>
      <h2 style={{ textAlign: "center" }}>แก้ไขโปรไฟล์ ⚡ HENG</h2>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <img
          src={avatar || "https://placehold.co/120"}
          alt="avatar"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            display: "block",
            margin: "0 auto 10px",
            border: "2px solid #facc15",
            objectFit: "cover"
          }}
        />
        <input type="file" accept="image/*" onChange={uploadAvatar} />
      </div>

      <input
        value={username}
        placeholder="ชื่อผู้ใช้"
        onChange={e => setUsername(e.target.value)}
        style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #444", background: "#1a1a1a", color: "white" }}
      />

      <textarea
        value={bio}
        placeholder="ประวัติส่วนตัว"
        onChange={e => setBio(e.target.value)}
        style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #444", background: "#1a1a1a", color: "white", minHeight: "100px" }}
      />

      <button
        onClick={save}
        disabled={loading}
        style={{
          padding: "14px",
          width: "100%",
          background: "#facc15",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px"
        }}
      >
        {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
      </button>
    </div>
  );
}
