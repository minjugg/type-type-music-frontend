import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import axios from "axios";
import { useRecoilState } from "recoil";
import { tokenState } from "../../states/music";
import styled from "styled-components";

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
    <div className="main-background">
      <WelcomeWrapper>
        <div className="main">
          <div className="title">TYPE TYPE MUSIC</div>
          <div className="subtitle">How does your code sound?</div>
        </div>
        {isLoggedIn ? (
          <div>
            <button>
              <Link to="/code">CREATE MUSIC</Link>
            </button>
            <button>
              <Link to="/code/mypage">MY MUSIC</Link>
            </button>
          </div>
        ) : (
          <button onClick={handleGoogleButton}>Login with Google</button>
        )}
      </WelcomeWrapper>
    </div>
  );
}

const WelcomeWrapper = styled.div`
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    font-size: 100px;
    margin-bottom: 30px;
    font-weight: bold;
  }

  .subtitle {
    font-size: 40px;
    margin-bottom: 30px;
  }

  button {
    display: inline-block;
  }

  button:hover {
    background: #1a73e8;
  }
`;
