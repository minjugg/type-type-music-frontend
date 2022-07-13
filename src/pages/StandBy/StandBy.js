import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/user";
import Logout from "./Logout";

export default function StandBy() {
  const currentUser = useRecoilValue(userState);

  return (
    <div className="main-background">
      <Logout />
      <button>
        <Link to={`/users/${currentUser}/code`}>STUDIO</Link>
      </button>
      <button>
        <Link to={`/users/${currentUser}/my-page`}>MY MUSIC</Link>
      </button>
    </div>
  );
}
