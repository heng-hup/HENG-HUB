import { db } from "../lib/firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * ฟังก์ชันสร้างห้องสนทนา (Room) ใน Cloud Firestore
 * @param {string} userId - UID ของผู้ใช้ที่ได้จาก Firebase Auth
 */
export async function createRoom(userId) {
  try {
    // 1. ระบุ Collection ที่ชื่อ "rooms" (Firestore จะสร้างให้เองถ้ายังไม่มี)
    const roomsCollection = collection(db, "rooms");

    // 2. เพิ่มข้อมูลห้องสนทนาใหม่
    const docRef = await addDoc(roomsCollection, {
      hostId: userId,      // ID ผู้สร้างห้อง
      status: "active",    // สถานะห้อง
      createdAt: serverTimestamp(), // ใช้เวลาจาก Server ของ Firebase
    });

    // 3. ส่ง ID ของ Document ที่เพิ่งสร้างกลับไป (เพื่อให้ Call.jsx นำไปใช้ทำ WebRTC)
    return { 
      data: { id: docRef.id }, 
      error: null 
    };

  } catch (error) {
    console.error("Firestore Create Room Error:", error);
    return { 
      data: null, 
      error: {
        message: "ไม่สามารถสร้างห้องได้ในขณะนี้ กรุณาลองใหม่",
        details: error.message
      } 
    };
  }
}
