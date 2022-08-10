import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";

export const handleGoogleLogin = async (e) => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error.code, error.message);
  }
};
