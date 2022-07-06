import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import axios from "axios";
import { useRecoilState } from "recoil";
import { tokenState } from "../../states/music";

export default function Welcome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useRecoilState(tokenState);

  const fetchData = async (token) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/login`,
      {
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  useEffect(() => {
    auth.onAuthStateChanged(async (userCredential) => {
      if (userCredential) {
        setIsLoggedIn(true);
        const idToken = await userCredential.getIdToken();
        setToken(idToken);
      }
    });
  }, []);

  const handleGoogleButton = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithPopup(auth, provider);

      if (userCredential) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  return (
    <div>
      <h1>Type Type Music</h1>
      <h3>How does your code sound?</h3>
      {isLoggedIn ? (
        <div>
          <button>
            <Link to="/code">Create Music</Link>
          </button>
          <button>
            <Link to="/code/mypage">My Music</Link>
          </button>
        </div>
      ) : (
        <button onClick={handleGoogleButton}>Login with Google</button>
      )}
    </div>
  );
}
