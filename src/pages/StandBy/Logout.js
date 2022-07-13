import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../states/user";
import { auth } from "../../config/firebase";

export default function Logout() {
  const setCurrentUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleGoogleLogout = async (e) => {
    e.preventDefault();

    try {
      await auth.signOut();

      setCurrentUser(null);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button className="logout-button" onClick={handleGoogleLogout}>
      Logout
    </button>
  );
}
