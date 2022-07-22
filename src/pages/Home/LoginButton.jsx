import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tokenState, userState } from "../../states/user";
import { useAxios } from "../../utils/hooks/useAxios";
import styled from "styled-components";

export default function LoginButton() {
  const [token, setToken] = useRecoilState(tokenState);
  const setCurrentUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userCredential) => {
      if (userCredential) {
        const idToken = await userCredential.getIdToken();
        const username = userCredential.email.split("@")[0];

        setToken(idToken);
        setCurrentUser(username);
        navigate(`/users/${username}`);
      }
    });

    return () => unsubscribe();
  }, []);

  useAxios({
    method: "get",
    url: "/auth",
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
      Authorization: `Bearer ${token}`,
    },
  });

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  return (
    <GoogleButton>
      <img
        className="login-button"
        src="/images/button/google-login.png"
        alt="google login button"
        onClick={handleGoogleLogin}
      />
    </GoogleButton>
  );
}

const GoogleButton = styled.div`
  transition: transform 0.3s;
  z-index: 1;

  .login-button {
    cursor: pointer;
  }

  &:hover {
    transform: scale(1.05);
  }
`;
