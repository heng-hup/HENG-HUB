import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";

export const recordTopup = async (userId, pkg) => {
  const base = Number(pkg.total / 1.07); // แยกยอดก่อน VAT
  const vat = pkg.total - base;         // ยอดภาษี 7%
  
  try {
    const transactionData = {
      userId,
      orderId: `MH-${Date.now()}`,
      points: pkg.pt,
      basePrice: base,
      vat7: vat,
      totalPaid: pkg.total,
      type: 'topup_gold',
      status: 'success',
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, "transactions"), transactionData);
    await updateDoc(doc(db, "users", userId), {
      gold_points: increment(pkg.pt)
    });

    return { success: true, data: transactionData };
  } catch (error) {
    return { success: false, error };
  }
};
