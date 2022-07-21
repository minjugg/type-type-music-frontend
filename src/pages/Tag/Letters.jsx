import React from "react";
import { useRecoilValue } from "recoil";
import { codeIndexState, codeLetterState } from "../../states/music";
import { randomPosition } from "../../utils/calculateRandomPostion";
import styled from "styled-components";

export default function Letters() {
  const index = useRecoilValue(codeIndexState);
  const codeLetter = useRecoilValue(codeLetterState);

  return (
    <Display
      top={randomPosition(window.innerHeight) + "px"}
      left={randomPosition(window.innerWidth) + "px"}
    >
      {codeLetter[index.toString()]}
    </Display>
  );
}

const Display = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  color: #f8f8ff;
  font-size: 30px;
  font-weight: bold;
  text-shadow: 0.08em 0em #b0c4de;
`;
