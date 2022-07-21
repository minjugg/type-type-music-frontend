import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState, userState } from "../../states/user";
import styled from "styled-components";

export default function MyPage() {
  const token = useRecoilValue(tokenState);
  const currentUser = useRecoilValue(userState);
  const [audios, setAudios] = useState(null);
  const [click, setClick] = useState(true);

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

  return (
    <div>
      <NavBar>
        <div className="logo">
          <Link to="/">LOGO</Link>
        </div>
        <div className="nav-bar-context">
          <Link to={`/users/${currentUser}/code`}>Play more code</Link>
          <Link to="/about">FAQ</Link>
        </div>
      </NavBar>
      <MusicContainer>
        <RightContainer>
          <div className="right-main">
            {Array.isArray(audios) && audios.length > 0 ? (
              audios?.map((audio, i) => {
                return (
                  <Audio key={audio.storageUrl}>
                    <div className="audio-player">
                      <div className="icon-container">
                        💾
                        <audio
                          src={audio.storageUrl}
                          type="audio/mpeg"
                          ref={(element) => {
                            audioRefs.current[i] = element;
                          }}
                        ></audio>
                        <div className="controls">
                          <button
                            className="player-button"
                            onClick={() => toggleAudio(i)}
                          >
                            PLAY
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="options">
                      <div className="tag">{audio?.tag}</div>
                      <div className="likes" onClick={() => toggleLikes(audio)}>
                        {audio.isLiked ? <>♥</> : <>♡</>}
                      </div>
                      <div
                        className="delete"
                        onClick={() => deleteAudio(audio)}
                      >
                        DEL
                      </div>
                    </div>
                  </Audio>
                );
              })
            ) : (
              <div>No music made yet.</div>
            )}
          </div>
        </RightContainer>
      </MusicContainer>
    </div>
  );
}

const NavBar = styled.nav`
  position: relative;
  overflow: hidden;
  background-color: black;
  color: white;

  a {
    float: left;
    text-align: center;
    padding: 17px 50px;
    font-size: 30px;
    color: #fff;
  }

  a:hover {
    color: #6893cc;
  }

  .nav-bar-context {
    float: right;
  }
`;

const MusicContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: rgb(70, 75, 90);
  color: #fff;
  height: 100vh;
  overflow: scroll;
`;

const RightContainer = styled.div`
  width: 100%;
  margin: 30px;
`;

const Audio = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  margin: 30px;

  .options {
    display: float;
    margin: 50px;
  }

  .options:hover {
    cursor: pointer;
  }

  .likes {
    margin-left: 100px;
    margin-right: 100px;
    transform: scale(2);
  }

  .likes:hover {
    color: gray;
  }

  .delete:hover {
    color: gray;
  }
`;
