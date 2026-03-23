import { auth, db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ProductCard = ({ product }) => {

  async function addToCart() {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงตะกร้า");
        return;
      }

      await addDoc(collection(db, "cart"), {
        user_id: user.uid,
        product_id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        created_at: serverTimestamp()
      });

      alert("เพิ่มลงตะกร้าแล้ว");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("เกิดข้อผิดพลาด: " + error.message);
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl p-3 text-yellow-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-28 h-28 object-cover rounded-lg mb-2"
      />

      <h3 className="font-bold">{product.name}</h3>
      <p className="text-white">{product.price} บาท</p>

      <button
        onClick={addToCart}
        className="mt-2 w-full bg-yellow-400 text-black px-3 py-1 rounded font-bold hover:bg-yellow-500 transition-colors"
      >
        เพิ่มลงตะกร้า
      </button>
    </div>
  );
};

export default ProductCard;
