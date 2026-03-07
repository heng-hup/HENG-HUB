// heng-frontend/components/MarketItem.jsx
export default function MarketItem({ item }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-yellow-500/40 transition">
      <h2 className="text-lg font-bold text-yellow-400">{item.name}</h2>
      <p className="text-sm text-gray-300 mt-1">
        ราคา: {item.price} {item.currency}
      </p>
      <p className="text-sm text-gray-400">แหล่งที่มา: {item.platform}</p>
      <p className="text-sm text-green-400 font-semibold mt-2">
        🎁 Cashback: {item.cashback}
      </p>
      <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-xl">
        🛒 ซื้อเลย
      </button>
    </div>
  );
}