import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { musicUrlState, recordingState } from "../../states/music";
import { tokenState, userState } from "../../states/user";
import Listen from "../../components/Listen/Listen";
import styled from "styled-components";

export default function Tag() {
  const urlmade = useRecoilValue(musicUrlState);
  const recording = useRecoilValue(recordingState);
  const currentUser = useRecoilValue(userState);
  const token = useRecoilValue(tokenState);
  const [tag, setTag] = useState("");
  const navigate = useNavigate();

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const repeat = (e) => {
    e.preventDefault();

    const audio = document.getElementById("audio");
    audio.play();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = new File([recording], "blob", {
      type: "audio/mpeg",
    });

    const formData = new FormData();
    formData.append("audio", file);
    formData.append("tag", e.target.tag.value);

    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/${currentUser}/records`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          charset: "utf-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate(`/users/${currentUser}/my-page`);
  };

  return (
    <div className="main-background">
      <Listen />
      <audio id="audio" controls src={urlmade}></audio>
      <form onSubmit={handleSubmit}>
        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          id="tag"
          name="tag"
          value={tag}
          onChange={handleTagChange}
          placeholder="Rainy"
        />
        <button type="submit">Save</button>
      </form>
      <button type="button" onClick={repeat}>
        Repeat
      </button>
    </div>
  );
}
