import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { doc, onSnapshot, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

/**
 * Hook สำหรับจัดการระบบปักตะกร้า (Affiliate) และการแชร์สินค้า
 * รวม Logic ของ Firebase และ Web Share API เข้าด้วยกัน
 */
export const useAffiliate = (userId, setToastMsg, setShowToast) => {
  const [pinnedItems, setPinnedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. ฟังข้อมูลปักตะกร้าจาก Cloud แบบ Real-time ---
  useEffect(() => {
    if (!userId) {
      setPinnedItems([]);
      setIsLoading(false);
      return;
    }

    const userDocRef = doc(db, "users", userId);
    
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setPinnedItems(docSnap.data().pinnedItems || []);
      } else {
        setPinnedItems([]);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Firestore Subscription Error:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  // --- 2. ฟังก์ชัน ปัก/ถอน สินค้า (Toggle Pin) ---
  const togglePin = async (product) => {
    if (!userId) {
      alert("กรุณาเข้าสู่ระบบก่อนปักตะกร้าครับพี่นัท");
      return;
    }

    const userDocRef = doc(db, "users", userId);
    const isAlreadyPinned = pinnedItems.some(item => item.id === product.id);

    try {
      if (isAlreadyPinned) {
        // ถ้าปักอยู่แล้ว -> ถอนออก
        await updateDoc(userDocRef, {
          pinnedItems: arrayRemove(product)
        });
        if (setToastMsg) {
          setToastMsg('ถอนการปักตะกร้าแล้ว');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }
      } else {
        // ถ้ายังไม่ปัก -> เพิ่มเข้า Cloud
        await setDoc(userDocRef, {
          pinnedItems: arrayUnion({
            id: product.id,
            name: product.name,
            price: product.price,
            comm: product.comm,
            img: product.img,
            sold: product.sold,
            pinnedAt: new Date().toISOString()
          })
        }, { merge: true });
        
        if (setToastMsg) {
          setToastMsg('ปักตะกร้าสำเร็จ! ไปดูที่หน้าช่องนะพี่');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }
      }
    } catch (e) {
      console.error("Firebase Update Error:", e);
      alert("ไม่สามารถอัปเดตข้อมูลได้ครับพี่นัท");
    }
  };

  // --- 3. ฟังก์ชันแชร์ลิงก์ (Affiliate Link) ---
  const handleShare = async (product) => {
    // ใช้ userId จริงใน Ref ลิงก์เพื่อให้พี่นัทเก็บค่าคอมได้ถูกต้อง
    const refCode = userId || 'NAT_PARTNER'; 
    const affiliateLink = `https://hengheng88.app/shop?ref=${refCode}&prod=${product.id}`;

    if (navigator.share) {
      try {
        await navigator.share({ 
          title: product.name, 
          text: `สินค้าดี ค่าคอมสูง ฿${product.comm} ที่ HENG HENG`, 
          url: affiliateLink 
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // กรณี Browser ไม่รองรับ (เช่น บน PC บางรุ่น) ให้ Copy ลง Clipboard แทน
      try {
        await navigator.clipboard.writeText(affiliateLink);
        if (setToastMsg) {
          setToastMsg('คัดลอกลิงก์สำเร็จ!');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }
      } catch (err) {
        alert("ไม่สามารถคัดลอกลิงก์ได้ครับ");
      }
    }
  };

  return { 
    pinnedItems, 
    togglePin, 
    handleShare, 
    isLoading,
    isPinned: (productId) => pinnedItems.some(item => item.id === productId)
  };
};
