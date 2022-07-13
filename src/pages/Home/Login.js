import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tokenState, userState } from "../../states/user";
import { useFetchData } from "../../utils/hooks/useFetchData";

export default function Login() {
  const setToken = useSetRecoilState(tokenState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useFetchData(`${process.env.REACT_APP_SERVER_URL}/auth`, "application/json");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userCredential) => {
      if (userCredential) {
        const idToken = await userCredential.getIdToken();
        const username = userCredential.email.split("@")[0];

        setToken(idToken);
        setCurrentUser(username);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      navigate(`/users/${currentUser}`);
    }
  }, [currentUser]);

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  return (
    <button className="login-button" onClick={handleGoogleSignIn}>
      Sign In with Google
    </button>
  );
}
