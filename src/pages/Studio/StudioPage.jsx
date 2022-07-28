import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/user";
import Logout from "../../components/Logout";
import Button from "../../components/ButtonLayout";
import CodeEditor from "./CodeEditor";
import SpeakerLayout from "../../components/SpeakerLayout";

import styled from "styled-components";
import * as Tone from "tone";

export default function Studio() {
  const currentUser = useRecoilValue(userState);
  const navigate = useNavigate();

  const handlePlay = async (e) => {
    e.preventDefault();

    if (Tone.context.state !== "running") {
      await Tone.start();
    }

    navigate(`/users/${currentUser}/code/tag`);
  };

  return (
    <>
      <Logout />
      <SpeakerLayout image="speaker_purple.png" />
      <StudioWrapper>
        <h1 className="title">Type your code to listen</h1>
        <CodeEditor />
        <div className="play-button">
          <Button
            type="button"
            onClick={handlePlay}
            text="Play"
            style={{
              position: "relative",
              right: "0",
              width: "6rem",
              height: "3rem",
              fontSize: "2rem",
              background: "none",
              color: "#CCFD02",
              border: "1px solid #CCFD02",
            }}
          />
        </div>
      </StudioWrapper>
    </>
  );
}

const StudioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  h1.title {
    margin-bottom: 2rem;
    text-align: center;
    font-family: Helvetica, sans-serif;
    font-size: 3rem;
    font-weight: 400;
  }

  div.play-button {
    display: flex;
    justify-content: space-evenly;
    margin-top: 1rem;
  }
`;
