import React from "react";
import { useRecoilValue } from "recoil";
import { codeIndexState, codeLetterState } from "../../states/music";
import { randomPosition } from "../../utils/calculateRandomPostion";
import styled from "styled-components";

export default function Words() {
  const index = useRecoilValue(codeIndexState);
  const codeLetter = useRecoilValue(codeLetterState);

  return (
    // <Main>
    <Display
      top={randomPosition("heightStandard") + 1000 + "px"}
      left={randomPosition("widthStandard") + 2000 + "px"}
    >
      {codeLetter[index.toString()]}
    </Display>
    // </Main>
  );
}

// const Main = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;

const Display = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  color: #f8f8ff;
  font-size: 70px;
  font-weight: bold;
  text-shadow: 5px 5px 5px #ccfd02;
`;
