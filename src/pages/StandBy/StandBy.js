import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/user";

export default function StandBy() {
  const currentUser = useRecoilValue(userState);

  return (
    <div className="main-background">
      <button>
        <Link to={`/${currentUser}/code`}>CREATE MUSIC</Link>
      </button>
      <button>
        <Link to={`/${currentUser}/mypage`}>MY MUSIC</Link>
      </button>
    </div>
  );
}
