import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/user";
import LogoutButton from "../../components/LogoutButton";
import Button from "../../components/ButtonLayout";
import CodeEditor from "./CodeEditor";

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
      <LogoutButton />
      <StudioWrapper>
        <div className="title">Type your code to listen</div>
        <img
          className="left-speaker"
          src="/images/assets/speaker_purple.png"
          alt="speaker"
        />
        <img
          className="right-speaker"
          src="/images/assets/speaker_purple.png"
          alt="speaker"
        />
        <CodeEditor />
        <div className="play-button">
          <Button type="button" onClick={handlePlay} text="Play" />
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
  padding-left: 300px;
  padding-right: 300px;

  img {
    position: fixed;
    width: 18%;
    bottom: 8%;
  }

  img.left-speaker {
    left: 0;
  }

  img.right-speaker {
    right: 0;
  }

  div.title {
    font-size: 50px;
    margin-bottom: 100px;
    text-align: center;
  }

  div.play-button {
    text-align: center;
  }
`;
