import { auth } from "./lib/firebase";
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error.message);
    return null;
  }
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export async function getUser() {
  return auth.currentUser;
}
