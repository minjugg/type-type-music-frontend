import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState, tokenState } from "../states/user";
import { auth } from "../config/firebase";
import styled from "styled-components";

export default function LogoutButton() {
  const setCurrentUser = useSetRecoilState(userState);
  const setToken = useSetRecoilState(tokenState);
  const navigate = useNavigate();

  const handleGoogleLogout = async (e) => {
    e.preventDefault();

    try {
      await auth.signOut();

      setToken(null);
      setCurrentUser(null);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleButton
      src="/images/button/google-logout.png"
      alt="logout"
      onClick={handleGoogleLogout}
    />
  );
}

const GoogleButton = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  margin: 5rem;
  transition: transform 0.3s;
  z-index: 1;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;
