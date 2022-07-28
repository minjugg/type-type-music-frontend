import React from "react";
import { useRecoilValue } from "recoil";
import { codeState } from "../../states/music";

import { createRandomArray } from "../../utils/handleOctave";
import { usePlayMusic } from "../../utils/hooks/usePlayMusic";

import TagInput from "./TagInput";
import WordsDisplay from "./WordDisplay";
import styled from "styled-components";

export default function TagPage() {
  const firstAlphabet = useRecoilValue(codeState);

  const finalRandomArray = firstAlphabet.map((alphabet) => {
    return createRandomArray(alphabet);
  });

  const { loading } = usePlayMusic(finalRandomArray);

  return (
    <>
      <Background src="/images/assets/background-listen.jpg" alt="background" />
      {loading && <WordsDisplay />}
      {!loading && <TagInput />}
    </>
  );
}

const Background = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.2;
  z-index: -1;
`;
