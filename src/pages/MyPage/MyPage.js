import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState, userState } from "../../states/user";
import styled from "styled-components";

export default function MyPage() {
  const token = useRecoilValue(tokenState);
  const currentUser = useRecoilValue(userState);
  const [musics, setMusic] = useState(null);
  const [click, setClick] = useState(true);

  const apiEndpoint = `${process.env.REACT_APP_SERVER_URL}/users/${currentUser}`;

  const fetchMusicData = async () => {
    const music = await axios.get(apiEndpoint + "/records", {
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
        Authorization: `Bearer ${token}`,
      },
    });

    setMusic(music.data);
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
        <LeftContainer>Sort</LeftContainer>
        <RightContainer>
          <div className="right-main">
            {Array.isArray(musics) && musics.length > 0 ? (
              musics?.map((audio) => {
                return (
                  <Audio key={audio.storageUrl}>
                    <audio controls>
                      <source src={audio.storageUrl} type="audio/mpeg"></source>
                    </audio>
                    <div className="options">
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

const LeftContainer = styled.div`
  background-color: gray;
  height: 100%;
  width: 15vw;
  text-align: center;
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
