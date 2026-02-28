// heng-frontend/components/Navbar.jsx
import { useRouter } from "next/router";
import { Home, ShoppingBag, PlusCircle, MessageCircle, Wallet } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const navItems = [
    { name: "Feed", icon: <Home size={22} />, path: "/" },
    { name: "Market", icon: <ShoppingBag size={22} />, path: "/market" },
    { name: "Post", icon: <PlusCircle size={36} />, path: "/postfeed", center: true },
    { name: "Chat & Call", icon: <MessageCircle size={22} />, path: "/chatcall" },
    { name: "Wallet", icon: <Wallet size={22} />, path: "/wallet" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-yellow-400/30 flex justify-around items-center py-3 z-50">
      {navItems.map((item, i) => (
        <button
          key={i}
          onClick={() => router.push(item.path)}
          className={`flex flex-col items-center text-sm ${
            item.center
              ? "text-yellow-400 -mt-8 rounded-full bg-yellow-500 p-2"
              : "text-gray-300"
          } hover:text-yellow-300`}
        >
          {item.icon}
          {!item.center && <span className="text-xs mt-1">{item.name}</span>}
        </button>
      ))}
    </div>
  );
}