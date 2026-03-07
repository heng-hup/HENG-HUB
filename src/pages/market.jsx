import { Link } from "react-router-dom";

export default function Market() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center p-6 text-center">

      <h1 className="text-3xl font-bold text-yellow-400 mb-4">
        🛍️ ตลาดกลาง HENG
      </h1>

      <p className="text-gray-300 mb-8">
        ระบบตลาดกลางของ HENG สำหรับการซื้อขายสินค้าและบริการในเครือ
      </p>

      <div className="grid sm:grid-cols-2 gap-6 w-full max-w-2xl">

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition">
          <p className="text-lg font-semibold">🌿 สมุนไพรบำรุงร่างกาย</p>
          <p className="text-gray-400 text-sm mt-2">
            สูตรพิเศษสำหรับสุขภาพ
          </p>
          <p className="text-yellow-400 text-sm mt-3">
            ราคา 299 THB
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition">
          <p className="text-lg font-semibold">☕ กาแฟ HENG 24/7</p>
          <p className="text-gray-400 text-sm mt-2">
            กาแฟพรีเมียมเพิ่มพลัง
          </p>
          <p className="text-yellow-400 text-sm mt-3">
            ราคา 199 THB
          </p>
        </div>

      </div>

      <Link
        to="/"
        className="mt-10 px-6 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition"
      >
        🏠 กลับสู่หน้าหลัก
      </Link>

    </div>
  );
}