import { db } from '../firebase';
import { collection, writeBatch, doc } from "firebase/firestore";

export const seedButtons = async (count = 1000) => {
  console.log(`--- เริ่มสร้างข้อมูล ${count} ปุ่ม ---`);
  const buttonsRef = collection(db, "profile_buttons");
  let batch = writeBatch(db);
  let counter = 0;

  for (let i = 1; i <= count; i++) {
    const newDocRef = doc(buttonsRef);
    batch.set(newDocRef, {
      label: `เมนู ${i}`,
      iconUrl: `https://picsum.photos/id/${i % 100}/100/100`,
      order: i,
      status: "active",
      createdAt: new Date().toISOString()
    });

    counter++;
    // Firestore Batch จำกัดที่ 500 รายการ
    if (counter === 500) {
      await batch.commit();
      console.log(`✅ บันทึกแล้ว ${i} รายการ`);
      batch = writeBatch(db);
      counter = 0;
    }
  }

  if (counter > 0) {
    await batch.commit();
  }
  
  alert(`สร้างข้อมูล ${count} ปุ่มสำเร็จ!`);
};
