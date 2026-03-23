import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase"; // เปลี่ยนมาใช้ Firebase
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      const user = auth.currentUser; // ใช้ Firebase Auth
      if (!user) return;

      // ดึงข้อมูลจาก Collection "cart" ของ user คนนี้
      const q = query(collection(db, "cart"), where("user_id", "==", user.uid));
      const querySnapshot = await getDocs(q);
      
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setItems(data);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }

  // ✅ ฟังก์ชัน Checkout (Firebase Version)
  async function checkout() {
    try {
      const user = auth.currentUser;
      if (!user || items.length === 0) return;

      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      // 1. สร้าง Order ใน Collection "orders"
      const orderRef = await addDoc(collection(db, "orders"), {
        user_id: user.uid,
        total: total,
        status: "paid",
        created_at: serverTimestamp()
      });

      // 2. บันทึกรายการสินค้าลง "order_items"
      for (let item of items) {
        await addDoc(collection(db, "order_items"), {
          order_id: orderRef.id,
          product_id: item.product_id,
          price: item.price,
          quantity: item.quantity
        });
      }

      alert("สั่งซื้อสำเร็จ (Firebase)");
      setItems([]); // ล้างตะกร้าหน้าจอ
    } catch (error) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    }
  }

  return (
    <div className="p-4 bg-black min-h-screen text-yellow-300">
      <h1 className="text-xl mb-4 font-bold">ตะกร้าสินค้า ⚡ HENG</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="mb-3 bg-gray-800 text-white p-3 rounded-lg border border-yellow-600">
            <p className="font-bold text-yellow-400">{item.name}</p>
            <p className="text-gray-300">{item.price} บาท (จำนวน: {item.quantity})</p>
          </div>
        ))
      )}

      {items.length > 0 && (
        <button
          onClick={checkout}
          className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-3 rounded-xl transition-all"
        >
          ชำระเงิน
        </button>
      )}
    </div>
  );
}
