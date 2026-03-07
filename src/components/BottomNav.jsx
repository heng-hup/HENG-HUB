import { Link } from "react-router-dom";

export default function BottomNav() {

return (

<div className="fixed bottom-0 w-full bg-black text-white flex justify-around py-3 border-t border-yellow-500">

<Link to="/">🏠 หน้าหลัก</Link>

<Link to="/market">🛍 ร้านค้า</Link>

<Link to="/live">📹 ไลฟ์</Link>

<Link to="/chat">💬 แชท</Link>

<Link to="/profile">👤 โปรไฟล์</Link>

</div>

);
}