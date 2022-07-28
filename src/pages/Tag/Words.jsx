import React from "react";
import { useRecoilValue } from "recoil";
import { codeIndexState, codeLetterState } from "../../states/music";
import { randomPosition } from "../../utils/calculateRandomPostion";
import styled from "styled-components";

export default function Words() {
  const index = useRecoilValue(codeIndexState);
  const codeLetter = useRecoilValue(codeLetterState);

  const displayedWord = codeLetter[index.toString()];

  return (
    <Display
      top={randomPosition("heightStandard") + "px"}
      left={randomPosition("widthStandard") + "px"}
    >
      {displayedWord}
    </Display>
  );
}

const Display = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* top: ${(props) => props.top};
  left: ${(props) => props.left}; */
  color: #f8f8ff;
  font-size: 5rem;
  font-weight: 800;
  text-shadow: 0.5rem 0.5rem 0.5rem #ccfd02;
`;
