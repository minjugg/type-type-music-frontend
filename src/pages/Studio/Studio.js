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

    navigate(`/users/${currentUser}/code/play`);
  };

  return (
    <div className="main-background">
      <CodeWrapper>
        <CodeEditor />
        <button onClick={handlePlay}>PLAY</button>
      </CodeWrapper>
    </div>
  );
}

const CodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
