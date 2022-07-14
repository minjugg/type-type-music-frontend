import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState, tokenState } from "../../states/user";
import { auth } from "../../config/firebase";
import styled from "styled-components";

export default function Logout() {
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
    <LogoutButton>
      <button className="logout-button" onClick={handleGoogleLogout}>
        Logout
      </button>
    </LogoutButton>
  );
}

const LogoutButton = styled.div`
  position: fixed;
  right: 0;
  top: 0;
`;
