import React from "react";
import { useRecoilValue } from "recoil";
import { codeState } from "../../states/music";

import { randomArray } from "../../utils/octave";
import { usePlayMusic } from "../../utils/hooks/usePlayMusic";

import Listen from "./Listen";
import Words from "./Words";
import styled from "styled-components";

export default function Tag() {
  const firstLettersOfCode = useRecoilValue(codeState);

  const finalRandomArray = firstLettersOfCode.map((letter) => {
    return randomArray(letter);
  });

  const { loading } = usePlayMusic(finalRandomArray);

  return (
    <>
      <Background src="/images/assets/background-listen.jpg" alt="background" />
      {loading && <Words />}
      {!loading && <Listen />}
    </>
  );
}

const Background = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.2;
  z-index: -1;
`;
