import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function GoogleLoginButton() {
  
  const loginGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      console.log("User logged in:", result.user);
      
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  return (
    <button 
      onClick={loginGoogle}
      className="google-login-btn"
    >
      Login with Google
    </button>
  );
}
