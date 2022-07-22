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
    <GoogleButton onClick={handleGoogleLogout}>
      <img src="/images/button/google-logout.png" alt="logout" />
    </GoogleButton>
  );
}

const GoogleButton = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  font-size: 30px;
  padding: 5px;
  margin: 50px;
  transition: transform 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;
