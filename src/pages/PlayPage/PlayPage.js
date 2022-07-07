import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { musicURLState } from "../../states/music";

export default function PlayPage() {
  const urlmade = useRecoilValue(musicURLState);
  const [tag, setTag] = useState("");

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const play = () => {
    const audio = document.getElementById("audio");
    audio.play();
  };

  return (
    <div>
      {urlmade && <audio id="audio" controls src={urlmade}></audio>}
      <form>
        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          id="tag"
          name="tag"
          value={tag}
          onChange={handleTagChange}
          placeholder="# Rainy"
        />
        <input type="submit" value="Save" />
        <input type="button" value="Repeat" onClick={play} />
      </form>
    </div>
  );
}
