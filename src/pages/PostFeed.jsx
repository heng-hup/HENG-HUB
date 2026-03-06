import { useState } from "react";
import { autoPostToGlobal } from "../utils/aiPostHandler";

export default function PostFeed() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!text.trim()) {
      alert("กรุณาเขียนข้อความก่อนโพสต์");
      return;
    }

    try {
      setLoading(true);

      const result = await autoPostToGlobal(text);

      alert(result?.message || "โพสต์สำเร็จ");

      setText("");
    } catch (err) {
      console.error("POST ERROR", err);
      alert("เกิดข้อผิดพลาดในการโพสต์");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-2xl font-bold text-center mb-6 text-yellow-400">
        ⚡ โพสต์อัตโนมัติด้วย HENG AI
      </h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-4 bg-gray-800 rounded-lg mb-4"
        placeholder="เขียนสิ่งที่อยากแชร์ หรือแนบลิงก์วิดีโอ..."
        rows="6"
      />

      <button
        disabled={loading}
        onClick={handlePost}
        className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
      >
        {loading ? "กำลังโพสต์..." : "🚀 โพสต์ทั่วโลก"}
      </button>

    </div>
  );
}