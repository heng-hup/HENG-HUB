import { Outlet, Link, useLocation } from "react-router-dom";

export default function Layout() {

  const location = useLocation();

  const nav = [
    { name: "Home", path: "/home", icon: "🏠" },
    { name: "Feed", path: "/feed", icon: "🌍" },
    { name: "Shop", path: "/shop", icon: "🛒" },
    { name: "Live", path: "/live", icon: "📺" },
    { name: "Profile", path: "/profile", icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Top bar */}
      <div className="flex justify-end gap-3 p-4 border-b border-gray-800">

        <Link
          to="/login"
          className="bg-yellow-400 text-black px-4 py-2 rounded text-sm"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="border border-yellow-400 px-4 py-2 rounded text-sm"
        >
          Register
        </Link>

      </div>

      {/* Page content */}
      <div className="pb-24">
        <Outlet />
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">

        <div className="grid grid-cols-5 text-center text-xs">

          {nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`py-3 flex flex-col items-center ${
                location.pathname === item.path
                  ? "text-yellow-400"
                  : "text-gray-400"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}

        </div>

      </div>

    </div>
  );
}