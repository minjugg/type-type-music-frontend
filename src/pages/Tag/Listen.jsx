import React, { useRef } from "react";
import { useRecoilValue } from "recoil";
import { musicUrlState, codeState } from "../../states/music";
import { randomArray } from "../../utils/octave";
import { usePlayMusic } from "../../utils/hooks/usePlayMusic";

export default function Listen() {
  const firstLettersOfCode = useRecoilValue(codeState);
  const url = useRecoilValue(musicUrlState);
  const audioRef = useRef(null);

  const finalRandomArray = firstLettersOfCode.map((letter) => {
    return randomArray(letter);
  });

  const repeat = (e) => {
    e.preventDefault();
    audioRef.current.play();
  };

  const { loading } = usePlayMusic(finalRandomArray);

  return (
    !loading && (
      <>
        <audio id="audio" controls src={url} ref={audioRef}></audio>
        <button type="button" onClick={repeat}>
          Repeat
        </button>
      </>
    )
  );
}
