import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase"; // เปลี่ยนมาใช้ firebase
import { 
  doc, 
  getDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs, 
  runTransaction, 
  serverTimestamp,
  addDoc 
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Wallet() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [target, setTarget] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currUser) => {
      if (currUser) {
        setUser(currUser);
        loadWalletData(currUser.uid);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  async function loadWalletData(uid) {
    setLoading(true);
    try {
      // 1. ดึงยอดเงิน (พอยท์) จาก Firestore
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setBalance(userSnap.data().พอยท์ || 0);
      }

      // 2. ดึงประวัติธุรกรรม
      const q = query(
        collection(db, "transactions"),
        where("userId", "==", uid),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const txList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(txList);
    } catch (err) {
      console.error("Load Wallet Error:", err);
    }
    setLoading(false);
  }

  // ฟังก์ชัน เติมเงิน / ถอนเงิน / โอนเงิน (ใช้ Transaction เพื่อความปลอดภัย)
  async function handleTransaction(type) {
    const value = Number(amount);
    if (!value || value <= 0) return alert("กรุณากรอกจำนวนเงินให้ถูกต้อง");

    try {
      await runTransaction(db, async (transaction) => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await transaction.get(userRef);
        
        if (!userSnap.exists()) throw "ไม่พบข้อมูลผู้ใช้";

        const currentBalance = userSnap.data().พอยท์ || 0;
        let newBalance = currentBalance;

        if (type === "deposit") {
          newBalance += value;
        } else if (type === "withdraw") {
          if (currentBalance < value) throw "ยอดเงินคงเหลือไม่เพียงพอ";
          newBalance -= value;
        }

        // อัปเดตยอดใหม่ลง Firestore
        transaction.update(userRef, { พอยท์: newBalance });

        // บันทึกประวัติ
        const txRef = doc(collection(db, "transactions"));
        transaction.set(txRef, {
          userId: user.uid,
          type: type,
          amount: value,
          createdAt: serverTimestamp()
        });
      });

      alert("ทำรายการสำเร็จ!");
      setAmount("");
      loadWalletData(user.uid);
    } catch (err) {
      alert(err);
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center">
      กำลังเปิดกระเป๋าตังค์มหาเฮง...
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">💰 HENG Wallet</h1>

      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md text-center shadow-lg border border-yellow-400/30">
        <p className="text-gray-300 mb-2">ยอดพอยท์ปัจจุบัน</p>
        <h2 className="text-4xl font-bold text-yellow-400 mb-6">{balance.toLocaleString()} PT</h2>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="จำนวนเงิน (PT)"
          className="w-full p-2 mb-4 rounded bg-gray-800 text-center border border-gray-700 text-yellow-400"
        />

        <div className="flex gap-3 mb-4">
          <button onClick={() => handleTransaction("deposit")} className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold">
            ➕ เติมพอยท์
          </button>
          <button onClick={() => handleTransaction("withdraw")} className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold">
            ➖ ถอนเงิน
          </button>
        </div>
      </div>

      <div className="bg-gray-900 mt-8 p-6 rounded-xl w-full max-w-md border border-gray-800">
        <h3 className="text-lg mb-4 text-yellow-400 font-bold border-b border-gray-800 pb-2">📜 ประวัติธุรกรรมล่าสุด</h3>
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-sm italic">ยังไม่มีรายการในขณะนี้</p>
        ) : (
          transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between border-b border-gray-800 py-3 text-sm">
              <span className={tx.type === "deposit" ? "text-green-400" : "text-red-400"}>
                {tx.type === "deposit" ? "➕ เติมพอยท์" : "➖ ถอนเงิน"}
              </span>
              <span className="text-yellow-400 font-bold">{tx.amount.toLocaleString()} PT</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
