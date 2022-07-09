import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../../states/user";

import CodeEditor from "./CodeEditor";

export default function Studio() {
  const currentUser = useRecoilValue(userState);

  return (
    <div className="main-background">
      <CodeWrapper>
        <CodeEditor />
        <button>
          <Link to={`/users/${currentUser}/code/play`}>Listen</Link>
        </button>
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
