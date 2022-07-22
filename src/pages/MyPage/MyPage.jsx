import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { tokenState, userState } from "../../states/user";
import { codeIndexState, musicState } from "../../states/music";
import styled from "styled-components";
import axios from "axios";

export default function MyPage() {
  const token = useRecoilValue(tokenState);
  const currentUser = useRecoilValue(userState);
  const [audios, setAudios] = useState(null);
  const [click, setClick] = useState(true);
  const navigate = useNavigate();

  const resetMusic = useResetRecoilState(musicState);
  const resetIndex = useResetRecoilState(codeIndexState);

  const apiEndpoint = `${process.env.REACT_APP_SERVER_URL}/users/${currentUser}`;

  const fetchMusicData = async () => {
    const { data } = await axios.get(apiEndpoint + "/records", {
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
        Authorization: `Bearer ${token}`,
      },
    });

    setAudios(data);
  };

  const toggleLikes = async (audio) => {
    await axios.patch(
      apiEndpoint + `/records/${audio._id}`,
      { isLiked: audio.isLiked },
      {
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setClick(!click);
  };

  const deleteAudio = async (audio) => {
    await axios.delete(apiEndpoint + `/records/${audio._id}`, {
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
        Authorization: `Bearer ${token}`,
      },
    });

    setClick(!click);
  };

  useEffect(() => {
    fetchMusicData(token);
  }, [click]);

  const audioRefs = useRef([]);

  function toggleAudio(i) {
    if (audioRefs.current[i].paused) {
      audioRefs.current[i].play();
    } else {
      audioRefs.current[i].pause();
    }
  }

  const handleNavbarButton = () => {
    resetMusic();
    resetIndex();
    navigate(`/users/${currentUser}/code`);
  };

  return (
    <div>
      <NavBar>
        <div className="navbar-context">
          <img
            className="left-code"
            src="/images/button/code_neon.png"
            alt="play more code"
            onClick={handleNavbarButton}
          />
          <div className="title">
            {currentUser}
            <span className="default">Music Library</span>
          </div>
          {Array.isArray(audios) && audios.length > 0 && (
            <span className="description"> ✱ Click on the tape to listen</span>
          )}
          <img
            className="right-code"
            src="/images/button/code_neon.png"
            alt="play more code"
            onClick={handleNavbarButton}
          />
          {/* <div className="FAQ" onClick={() => navigate("/about")}>
            FAQ
          </div> */}
        </div>
      </NavBar>
      <AudioContainer>
        <AudioSlot>
          {Array.isArray(audios) && audios.length > 0 ? (
            audios?.map((audio, i) => {
              return (
                <Audio key={audio.storageUrl}>
                  <AudioTag onClick={() => toggleAudio(i)}>
                    <span>#</span>
                    <span>{audio?.tag}</span>
                  </AudioTag>
                  <Options>
                    <div className="likes" onClick={() => toggleLikes(audio)}>
                      {audio.isLiked ? <>♥</> : <>♡</>}
                    </div>
                    <div className="delete" onClick={() => deleteAudio(audio)}>
                      ✗
                    </div>
                  </Options>
                  <audio
                    src={audio.storageUrl}
                    type="audio/mpeg"
                    ref={(element) => {
                      audioRefs.current[i] = element;
                    }}
                  ></audio>
                </Audio>
              );
            })
          ) : (
            <EmptyMessage>No music has been made yet.</EmptyMessage>
          )}
        </AudioSlot>
      </AudioContainer>
    </div>
  );
}

const NavBar = styled.nav`
  position: absolute;
  width: 100vw;
  display: flex;
  align-items: center;
  top: 8%;
  font-family: Helvetica, sans-serif;

  .navbar-context {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    right: 5px;
    transform: scale(0.7);
  }

  .title {
    display: flex;
    flex-direction: row;
    font-size: 100px;
    position: relative;

    .default {
      color: #9261f9;
    }
  }

  .description {
    font-size: 2rem;
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translate(-50%);
    color: rgba(255, 255, 255, 0.8);
  }

  .left-code {
    position: relative;
    right: 10%;
    width: 100px;
    height: 80px;
    transition: transform 0.5s;
  }

  .left-code:hover {
    transform: scale(1.2);
  }

  .right-code {
    position: relative;
    left: 10%;
    width: 100px;
    height: 80px;
    transition: transform 0.5s;
  }

  .right-code:hover {
    transform: scale(1.2);
  }
`;

const AudioContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  align-items: center;
  width: 70%;
  height: 60%;
  border: 3px solid #9261f9;
  border-radius: 10px;
`;

const AudioSlot = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  width: 100%;
  height: 90%;
  border: 3px solid #9261f9;
  border-radius: 5px;
  overflow: scroll;
`;

const Audio = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 40vh;
  width: 5%;
  left: 0;
  margin: auto 3px;
  padding: 50px 10px;
  background-color: #9261f9;
  border-radius: 4px;
  border: 10px solid rgba(198, 198, 198, 0.9);
  transition: transform 0.3s;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const AudioTag = styled.div`
  position: relative;
  text-align: left;
  margin-right: 10px;
  top: 66px;
  right: 4px;
  font-size: 1.5em;
  font-weight: bold;
  cursor: pointer;
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  width: 230px;
  height: 45px;
  overflow: hidden;

  span {
    margin-right: 10px;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transform: scale(2);
  text-align: center;

  position: relative;
  top: 200px;
  color: #202025;

  .likes {
    padding: 3px;
    border-radius: 2px;
    justify-content: center;
    margin-bottom: 10px;
    color: #ccfd02;
  }

  .likes:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .delete {
    padding: 5px;
    border-radius: 2px;
    color: #ccfd02;
  }

  .delete:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const EmptyMessage = styled.div`
  position: absolute;
  font-size: 1.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Helvetica, sans-serif;
`;
