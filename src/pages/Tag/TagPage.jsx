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
    <TagPageWrapper>
      <img
        className="background"
        src="/images/assets/background-listen.jpg"
        alt="background"
      />
      {!loading && <Listen />}
      {loading && <Words />}
    </TagPageWrapper>
  );
}

const TagPageWrapper = styled.div`
  img.background {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.2;
    z-index: -1;
  }
`;
