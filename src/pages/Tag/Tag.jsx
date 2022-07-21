import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { recordingState } from "../../states/music";
import { tokenState, userState } from "../../states/user";
import axios from "axios";
import Listen from "./Listen";

export default function Tag() {
  const recording = useRecoilValue(recordingState);
  const currentUser = useRecoilValue(userState);
  const token = useRecoilValue(tokenState);
  const navigate = useNavigate();

  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = new File([recording], "blob", {
      type: "audio/mpeg",
    });

    const formData = new FormData();

    formData.append("audio", file);
    formData.append("tag", inputRef.current.value);

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="tag">Tag</label>
        <input
          ref={inputRef}
          type="text"
          id="tag"
          name="tag"
          placeholder="# Rainy"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
