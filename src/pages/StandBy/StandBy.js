import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/user";
import Logout from "./Logout";

export default function StandBy() {
  const currentUser = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <div className="main-background">
      <Logout />
      <button onClick={() => navigate(`/users/${currentUser}/code`)}>
        STUDIO
      </button>
      <button onClick={() => navigate(`/users/${currentUser}/my-page`)}>
        MY MUSIC
      </button>
    </div>
  );
}
