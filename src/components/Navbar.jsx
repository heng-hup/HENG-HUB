import { useNavigate } from "react-router-dom";
import { Home, ShoppingBag, PlusCircle, MessageCircle, Wallet } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const navItems = [
    { name: "Feed", icon: <Home size={22} />, path: "/" },
    { name: "Market", icon: <ShoppingBag size={22} />, path: "/market" },
    { name: "Post", icon: <PlusCircle size={36} />, path: "/postfeed", center: true },
    { name: "Chat & Call", icon: <MessageCircle size={22} />, path: "/chatcall" },
    { name: "Wallet", icon: <Wallet size={22} />, path: "/wallet" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#111",
        borderTop: "1px solid rgba(255,215,0,0.3)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 0",
        zIndex: 50
      }}
    >
      {navItems.map((item, i) => (
        <button
          key={i}
          onClick={() => navigate(item.path)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: item.center ? "#FFD700" : "#ccc",
            background: item.center ? "#FFD700" : "transparent",
            borderRadius: item.center ? "50%" : "0",
            padding: item.center ? "10px" : "0",
            marginTop: item.center ? "-20px" : "0",
            border: "none"
          }}
        >
          {item.icon}
          {!item.center && (
            <span style={{ fontSize: "11px", marginTop: "3px" }}>
              {item.name}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}