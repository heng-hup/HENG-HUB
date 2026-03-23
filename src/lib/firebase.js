import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJevrcM2gM0LkBf61WKtUmz-RuyL86j2M",
  authDomain: "hengheng88.firebaseapp.com",
  projectId: "hengheng88",
  storageBucket: "hengheng88.firebasestorage.app",
  messagingSenderId: "99780648009",
  appId: "1:99780648009:web:c0ea6783987f924f1b3398"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
