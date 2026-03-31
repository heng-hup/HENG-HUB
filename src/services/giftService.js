// src/services/giftService.js
import { db } from '../firebase'; // ตรวจสอบว่า ../firebase ชี้ไปที่ไฟล์ config ถูกต้อง
import { 
  doc, 
  runTransaction, 
  serverTimestamp, 
  collection 
} from "firebase/firestore";

/**
 * ฟังก์ชันสำหรับหักเหรียญทองและส่งของขวัญ
 * @param {string} userId - ID ของผู้ส่ง
 * @param {object} gift - ข้อมูลของขวัญ (ต้องมี name และ price)
 */
export const sendGift = async (userId, gift) => {
  const userRef = doc(db, "users", userId);

  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      
      if (!userDoc.exists()) {
        throw "ไม่พบข้อมูลผู้ใช้งาน!";
      }

      const currentGold = userDoc.data().gold_points || 0;

      // ตรวจสอบยอดเหรียญ
      if (currentGold < gift.price) {
        throw "เหรียญทองไม่พอครับนัต!";
      }

      // 1. หักเหรียญทองออกจากบัญชีผู้ส่ง
      transaction.update(userRef, {
        gold_points: currentGold - gift.price
      });

      // 2. บันทึกประวัติการส่ง (เพื่อใช้ทำบัญชีและภาษี)
      // สร้าง Reference สำหรับเอกสารใหม่ในคอลเลกชัน transactions
      const newTransactionRef = doc(collection(db, "transactions"));
      
      transaction.set(newTransactionRef, {
        userId,
        type: 'send_gift',
        giftName: gift.name,
        points: gift.price,
        status: 'success',
        createdAt: serverTimestamp()
      });
    });

    return { success: true };
  } catch (e) {
    console.error("Gift Error:", e);
    return { success: false, error: e };
  }
};
