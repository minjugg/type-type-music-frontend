import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  musicState,
  musicUrlState,
  recordingState,
  codeIndexState,
} from "../../states/music";
import { tokenState, userState } from "../../states/user";
import axios from "axios";
import styled from "styled-components";

import Button from "../../components/ButtonLayout";
import Spinner from "../../components/Spinner";

export default function Listen() {
  const currentUser = useRecoilValue(userState);
  const token = useRecoilValue(tokenState);
  const url = useRecoilValue(musicUrlState);
  const recording = useRecoilValue(recordingState);

  const resetMusic = useResetRecoilState(musicState);
  const resetIndex = useResetRecoilState(codeIndexState);

  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = new File([recording], "blob", {
      type: "audio/mpeg",
    });

    const formData = new FormData();
    formData.append("audio", file);

    let input;

    if (inputRef.current.value === "") {
      input = "No name";
    } else {
      input = inputRef.current.value;
    }

    formData.append("tag", input);

    try {
      setLoading(true);

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
    } catch (error) {
      setError(error);
    } finally {
      navigate(`/users/${currentUser}/my-page`);
    }
  };

  const repeat = (e) => {
    e.preventDefault();
    resetMusic();
    resetIndex();

    navigate(`/users/${currentUser}/code`);
  };

  return (
    <AudioWrapper>
      <div className="title"># Name your music</div>
      <FormTag>
        <form onSubmit={handleSubmit}>
          <input
            className="title-writer"
            ref={inputRef}
            type="text"
            id="tag"
            name="tag"
            placeholder="Try typing something like... Rock 'n' Roll !"
          />
          <label for="tag">(It can be saved without any name)</label>
          <Button
            icon="save.png"
            type="submit"
            text="Save music"
            style={{
              position: "relative",
              top: "1rem",
            }}
          ></Button>
        </form>
      </FormTag>
      <audio id="audio" controls src={url} />
      <Button
        icon="repeat.png"
        type="button"
        onClick={repeat}
        text="Code again"
        style={{
          position: "relative",
          top: "4rem",
        }}
      ></Button>
      {loading && <Spinner />}
    </AudioWrapper>
  );
}

const AudioWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  audio {
    position: relative;
    bottom: 15.5rem;
  }

  .title {
    font-size: 5rem;
  }
`;

const FormTag = styled.div`
  form {
    display: flex;
    flex-direction: column;
    position: relative;
    top: 6em;

    label {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.7);
      padding: 1rem;
    }

    input.title-writer {
      width: 30em;
      height: 3.5em;
      font-size: 1.5rem;

      color: rgba(204, 253, 2);
      border: 2px solid rgba(204, 253, 2);
      background-color: rgba(255, 255, 255, 0.2);
      text-align: center;
    }

    input::placeholder {
      color: rgba(204, 253, 2, 0.3);
    }
  }
`;
