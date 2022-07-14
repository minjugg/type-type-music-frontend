import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import { useRecoilState } from "recoil";
import { tokenState, userState } from "../../states/user";
import { useAxios } from "../../utils/hooks/useAxios";
import styled from "styled-components";

export default function Login() {
  const [token, setToken] = useRecoilState(tokenState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useAxios({
    method: "get",
    url: "/auth",
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
      Authorization: `Bearer ${token}`,
    },
  });

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

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  return (
    <SocialLoginButton>
      <img
        src="/images/button/google-login.png"
        alt="google login button"
        onClick={handleGoogleLogin}
      />
    </SocialLoginButton>
  );
}

const SocialLoginButton = styled.div`
  & {
    cursor: pointer;
    transition: transform 0.3s;
  }

  &:hover {
    transform: scale(1.04);
  }
`;
