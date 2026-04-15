import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyCJevrcM2gM0lkBI61WKtUmz-Ruyl86j2M",
  authDomain: "hengheng88.firebaseapp.com",
  projectId: "hengheng88",
  storageBucket: "hengheng88.firebasestorage.app",
  messagingSenderId: "99780648009",
  appId: "1:99780648009:web:c0ea6783937f924f1b3398",
  measurementId: "G-7BDPYNQ5X2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
