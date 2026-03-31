import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  increment, 
  serverTimestamp,
  runTransaction
} from "firebase/firestore";

/**
 * 1. ฟังก์ชันเติมเหรียญอัตโนมัติ (Automation Topup)
 * ใช้เรียกเมื่อได้รับสัญญาณยืนยันการชำระเงินจาก Payment Gateway (Webhook)
 * ถูกต้องตามกฎหมาย: แยกยอดก่อน VAT และภาษี 7% ชัดเจน
 */
export const automateTopup = async (userId, pkgData) => {
  // pkgData ตัวอย่าง: { pt: 100, total: 212.93 }
  const total = Number(pkgData.total);
  const basePrice = total / 1.07; // คำนวณราคาสุทธิ (ยอดก่อน VAT)
  const vatAmount = total - basePrice; // ยอดภาษีขาย 7%

  try {
    // ใช้ Transaction เพื่อความปลอดภัยของข้อมูล (Atomic Operation)
    const result = await runTransaction(db, async (transaction) => {
      
      const userRef = doc(db, "users", userId);
      const transactionRef = doc(collection(db, "transactions"));

      const newOrderData = {
        userId: userId,
        orderId: `MH-${Date.now()}`, // รหัสคำสั่งซื้อบริษัทมหาเฮง
        points_received: pkgData.pt,
        amount_before_vat: basePrice,
        vat_7: vatAmount,
        total_paid: total,
        type: 'topup',
        status: 'success',
        createdAt: serverTimestamp()
      };

      // 1. บันทึกประวัติการทำรายการ (สำหรับสรรพากรและบัญชี)
      transaction.set(transactionRef, newOrderData);

      // 2. อัปเดตยอดเหรียญทองในกระเป๋าผู้ใช้ทันที
      transaction.update(userRef, {
        gold_points: increment(pkgData.pt)
      });

      return newOrderData;
    });

    console.log("✅ [Automation] เติมเหรียญและบันทึกภาษีเรียบร้อย:", result.orderId);
    return { success: true, data: result };

  } catch (error) {
    console.error("❌ [Automation] ระบบเติมเงินขัดข้อง:", error);
    return { success: false, error };
  }
};

/**
 * 2. ฟังก์ชันหักเหรียญส่งของขวัญ (Send Gift Logic)
 * ตรวจสอบยอดเงินอัตโนมัติก่อนส่งเหมือน ตต.
 */
export const sendGift = async (userId, gift) => {
  const userRef = doc(db, "users", userId);

  try {
    return await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      
      if (!userDoc.exists()) throw "ไม่พบข้อมูลผู้ใช้งาน";
      
      const currentBalance = userDoc.data().gold_points || 0;

      // ตรวจสอบว่าเหรียญพอไหม
      if (currentBalance < gift.price) {
        throw "เหรียญทองไม่พอ กรุณาเติมเงินก่อนส่งของขวัญ";
      }

      // 1. หักเหรียญออกจากกระเป๋า
      transaction.update(userRef, {
        gold_points: increment(-gift.price)
      });

      // 2. บันทึกประวัติการส่งของขวัญ
      const logRef = doc(collection(db, "transactions"));
      transaction.set(logRef, {
        userId: userId,
        type: 'send_gift',
        giftName: gift.name,
        points: gift.price,
        status: 'success',
        createdAt: serverTimestamp()
      });

      return { success: true };
    });
  } catch (error) {
    console.error("❌ Gift Error:", error);
    return { success: false, error: error.toString() };
  }
};

/**
 * 3. ฟังก์ชันดึงประวัติการทำรายการ (History Support)
 * ใช้โชว์ในหน้าประวัติธุรกรรม (ไอคอน 🕒 ในศูนย์ช่วยเหลือ)
 */
export const getCoinHistory = (userId) => {
  // ตัวอย่าง query สำหรับหน้า UI
  // query(collection(db, "transactions"), where("userId", "==", userId), orderBy("createdAt", "desc"))
};
