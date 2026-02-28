export default function VideoCallModal() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-black/40 border border-yellow-700/30 rounded-xl">
      <div className="text-yellow-300 text-4xl mb-4">📞</div>
      <h2 className="text-yellow-200 text-lg mb-2">กำลังเชื่อมต่อการโทร...</h2>
      <p className="text-gray-400 text-sm">ระบบกำลังเตรียมการประชุมแบบเรียลไทม์</p>
    </div>
  );
}