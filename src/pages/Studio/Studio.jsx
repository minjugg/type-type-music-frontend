import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/user";
import styled from "styled-components";
import * as Tone from "tone";

import CodeEditor from "./CodeEditor";

export default function Studio() {
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userState);

  const handlePlay = async (e) => {
    e.preventDefault();

    if (Tone.context.state !== "running") {
      await Tone.start();
    }

    navigate(`/users/${currentUser}/code/tag`);
  };

  return (
    <div className="main-background">
      <CodeWrapper>
        <div className="title">Type your code to listen 🎧</div>
        <CodeEditor />
        <button onClick={handlePlay}>PLAY</button>
      </CodeWrapper>
    </div>
  );
}

const CodeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-size: 50px;
    padding-bottom: 80px;
  }
`;
