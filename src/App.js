import { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./config/firebase";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

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
      {isLoggedIn ? (
        <div>
          <button>Create Music</button>
          <button>My Music</button>
        </div>
      ) : (
        <button onClick={handleGoogleButton}>Login with Google</button>
      )}
    </div>
  );
}

export default App;
