import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { musicURLState } from "../../states/music";

export default function PlayPage() {
  const url = useRecoilValue(musicURLState);

  useEffect(() => {
    const anchor = document.createElement("audio");
    anchor.controls = url;
    document.body.appendChild(anchor);
  }, [url]);

  return <div></div>;
}
