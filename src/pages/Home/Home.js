import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import axios from "axios";
import { useRecoilState } from "recoil";
import { tokenState, userState } from "../../states/user";
import styled from "styled-components";

export default function Home() {
  const [token, setToken] = useRecoilState(tokenState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const fetchData = async (token) => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth`, {
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  useEffect(() => {
    auth.onAuthStateChanged(async (userCredential) => {
      if (userCredential) {
        const idToken = await userCredential.getIdToken();
        setToken(idToken);

        const username = userCredential.email.split("@")[0];
        setCurrentUser(username);
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      navigate(`/users/${currentUser}`);
    }
  }, [currentUser]);

  const handleGoogleButton = async (e) => {
    e.preventDefault();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  return (
    <div className="main-background">
      <Main>
        <div className="main">
          <div className="title">TYPE TYPE MUSIC</div>
          <div className="subtitle">How does your code sound?</div>
        </div>
        <button className="login-button" onClick={handleGoogleButton}>
          Login with Google
        </button>
      </Main>
    </div>
  );
}

const Main = styled.div`
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

  .login-button {
    display: inline-block;
  }

  .login-button:hover {
    background: #1a73e8;
  }
`;
