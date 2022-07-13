import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/user";
import styled from "styled-components";

import CodeEditor from "./CodeEditor";

export default function Studio() {
  const currentUser = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleListenButton = () => {
    navigate(`/users/${currentUser}/code/play`);
  };

  return (
    <div className="main-background">
      <CodeWrapper>
        <CodeEditor />
        <button onClick={handleListenButton}>Listen</button>
      </CodeWrapper>
    </div>
  );
}

const CodeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  button {
    justify-content: center;
    text-align: center;
    font-size: 40px;
  }
`;
