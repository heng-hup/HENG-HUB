import { db } from '../firebase'; // ถอย 1 ก้าวไปหา src/firebase.js
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";

export const fetchButtons = async (lastVisibleDoc = null) => {
  try {
    const buttonsRef = collection(db, "profile_buttons");
    let q;

    if (lastVisibleDoc) {
      q = query(buttonsRef, orderBy("order", "asc"), startAfter(lastVisibleDoc), limit(30));
    } else {
      q = query(buttonsRef, orderBy("order", "asc"), limit(30));
    }

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    return { data, lastVisible };
  } catch (error) {
    console.error("Firebase Fetch Error:", error);
    return { data: [], lastVisible: null };
  }
};
