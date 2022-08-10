import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tokenState, userState } from "../../states/user";
import { useAxios } from "../../utils/hooks/useAxios";
import { handleGoogleLogin } from "../../utils/handleGoogleLogin";
import styled from "styled-components";

export default function LoginButton() {
  const [token, setToken] = useRecoilState(tokenState);
  const setCurrentUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userCredential) => {
      if (userCredential) {
        const idToken = await userCredential.getIdToken();
        const userId = userCredential.email.split("@")[0];

        setToken(idToken);
        setCurrentUser(userId);
        navigate(`/users/${userId}`);
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

  return (
    <GoogleButton
      src="/images/button/google-login.png"
      alt="google login button"
      onClick={handleGoogleLogin}
    />
  );
}

const GoogleButton = styled.img`
  position: relative;
  left: 50%;
  transform: translate(-50%);
  width: 15em;
  z-index: 1;

  &:hover {
    cursor: pointer;
  }
`;
