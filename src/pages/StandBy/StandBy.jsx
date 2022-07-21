import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/user";
import Logout from "./Logout";
import styled from "styled-components";

export default function StandBy() {
  const currentUser = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <div className="main-background">
      <Logout />
      <Wrapper>
        <PageButton>
          <button onClick={() => navigate(`/users/${currentUser}/code`)}>
            STUDIO
          </button>
          <img src="/images/button/studio.jpg" alt="studio"></img>
        </PageButton>
        <PageButton>
          <button onClick={() => navigate(`/users/${currentUser}/my-page`)}>
            MY MUSIC
          </button>
          <img src="/images/button/music-tape.jpg" alt="my-page"></img>
        </PageButton>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px;
  margin: 10px;
`;

const PageButton = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }

  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    background-color: rgba(169, 169, 169, 0.8);
    border-radius: 4px;
  }

  button:hover {
    background-color: black;
  }
`;
