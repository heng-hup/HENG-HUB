import { Link, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function logout() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 30px",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      <button
        style={{
          background: "linear-gradient(45deg,#ffd700,#ffb300)",
          border: "none",
          padding: "8px 18px",
          borderRadius: "20px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
        }}
      >
        📲 ติดตั้งแอพ
      </button>

      <div style={{ display: "flex", gap: "10px" }}>
        {!user && (
          <>
            <Link to="/register">
              <button
                style={{
                  background: "white",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
                }}
              >
                สมัครสมาชิก
              </button>
            </Link>

            <Link to="/login">
              <button
                style={{
                  background: "linear-gradient(45deg,#3b82f6,#2563eb)",
                  color: "white",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.4)"
                }}
              >
                เข้าสู่ระบบ
              </button>
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/profile">
              <button
                style={{
                  background: "#22c55e",
                  color: "#fff",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                โปรไฟล์
              </button>
            </Link>

            <button
              onClick={logout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 18px",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              ออกจากระบบ
            </button>
          </>
        )}
      </div>
    </div>
  );
}
