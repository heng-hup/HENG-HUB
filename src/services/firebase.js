import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// --- 1. คอนฟิก Firebase ด้วยคีย์จริงของพี่นัท ---
const firebaseConfig = {
  apiKey: "AIzaSyCJevrcM2gM0lkBI61WKtUmz-Ruyl86j2M",
  authDomain: "hengheng88.firebaseapp.com",
  projectId: "hengheng88",
  storageBucket: "hengheng88.firebasestorage.app",
  messagingSenderId: "99780648009",
  appId: "1:99780648009:web:c0ea6783937f924f1b3398",
  measurementId: "G-7BDPYNQ5X2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// --- 2. ฟังก์ชันสำหรับระบบปักตะกร้า (Affiliate) เชื่อมฐานข้อมูล ---

/**
 * ดึงรายการสินค้าที่ปักไว้ในหน้าช่องของ User คนนั้น
 */
export const getPinnedItemsFromDB = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().pinnedItems || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching pinned items:", error);
    return [];
  }
};

/**
 * ปักตะกร้า: เพิ่มสินค้าเข้า List ใน Cloud
 */
export const pinProductToDB = async (userId, product) => {
  try {
    const docRef = doc(db, "users", userId);
    // ใช้ arrayUnion เพื่อเพิ่มข้อมูลเข้า Array โดยไม่ซ้ำ (ป้องกันการปักซ้ำ)
    await setDoc(docRef, {
      pinnedItems: arrayUnion(product)
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error pinning product:", error);
    return false;
  }
};

/**
 * ถอนการปัก: เอาสินค้าออกจากหน้าช่อง
 */
export const unpinProductFromDB = async (userId, product) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      pinnedItems: arrayRemove(product)
    });
    return true;
  } catch (error) {
    console.error("Error unpinning product:", error);
    return false;
  }
};
