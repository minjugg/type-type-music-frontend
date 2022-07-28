import React from "react";
import { useRecoilValue } from "recoil";
import { codeIndexState, codeLetterState } from "../../states/music";
import { randomPosition } from "../../utils/calculateRandomPostion";
import styled from "styled-components";

export default function WordDisplay() {
  const index = useRecoilValue(codeIndexState);
  const codeLetter = useRecoilValue(codeLetterState);

  const displayedWord = codeLetter[index.toString()];

  return (
    <Display
      top={randomPosition("heightStandard") / 16 + "rem"}
      left={randomPosition("widthStandard") / 16 + "rem"}
    >
      {displayedWord}
    </Display>
  );
}

const Display = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  color: #f8f8ff;
  font-size: 5rem;
  font-weight: 800;
  text-shadow: 0.5rem 0.5rem 0.5rem #ccfd02;
  font-family: sans-serif;
`;
