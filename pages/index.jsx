import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-black to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-2">
        ⚡ ยินดีต้อนรับสู่ HENG-HUB
      </h1>
      <p className="text-gray-300 mb-8">
        ระบบศูนย์กลาง HENG – Marketplace, Chat, Wallet, และ Social Hub
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/market"
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
        >
          🛍️ เข้าสู่ตลาด HENG
        </Link>

        <Link
          to="/wallet"
          className="px-6 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition"
        >
          💰 เปิดกระเป๋าเงิน
        </Link>
      </div>
    </div>
  );
}