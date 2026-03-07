import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        paddingBottom: "70px"
      }}
    >
      {/* เนื้อหาของแต่ละหน้า */}
      <Outlet />

      {/* เมนูด้านล่าง */}
      <Navbar />
    </div>
  );
}