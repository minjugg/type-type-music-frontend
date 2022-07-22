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
      <FormTag>
        <div className="title"># Name your music</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="tag">✱ You can save without typing anything</label>
          <input
            ref={inputRef}
            type="text"
            id="tag"
            name="tag"
            placeholder="Try typing something like... Rock 'n' Roll !"
          />
          <div className="save-button">
            <Button icon="save.png" type="submit" text="Save"></Button>
          </div>
        </form>
      </FormTag>
      <AudioOptions>
        <div className="audio-control-options">
          <audio id="audio" controls src={url} />
          <div className="repeat-button">
            <Button
              icon="repeat.png"
              type="button"
              onClick={repeat}
              text="Code again"
            ></Button>
          </div>
        </div>
      </AudioOptions>
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

  .extra-message {
    position: relative;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const FormTag = styled.div`
  font-size: 50px;
  text-align: center;
  margin-bottom: 150px;

  input {
    position: relative;
    width: 650px;
    height: 60px;
    top: 160px;
    font-size: 25px;
    padding-left: 20px;
    color: rgba(204, 253, 2);
    border: 2px solid rgba(204, 253, 2);
    background-color: rgba(255, 255, 255, 0.2);
  }

  input::placeholder {
    color: rgba(204, 253, 2, 0.3);
  }

  div.save-button {
    position: relative;
    top: 310px;
  }

  label {
    position: relative;
    top: 150px;
    right: 180px;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const AudioOptions = styled.div`
  audio {
    position: relative;
    bottom: 250px;
  }

  div.repeat-button {
    position: relative;
    bottom: 50px;
  }
`;
