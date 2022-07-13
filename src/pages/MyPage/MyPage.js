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
            {Array.isArray(musics) ? (
              musics?.map((audio) => {
                return (
                  <div className="audio">
                    <Audio>
                      <audio controls>
                        <source
                          src={audio.storageUrl}
                          type="audio/mpeg"
                        ></source>
                      </audio>
                      <button
                        type="button"
                        className="likes"
                        onClick={() => toggleLikes(audio)}
                      >
                        {audio.isLiked ? "♥" : "♡"}
                      </button>
                    </Audio>
                  </div>
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
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 5vh;
  padding: 0;
  margin: 0;
  background-color: black;
  color: white;

  a {
    padding: 17px 30px;
    transition: 0.3s;
    color: #fff;
  }

  a:hover {
    color: #6893cc;
  }

  .logo {
    flex: 30%;
    padding-left: 5%;
  }
`;

const MusicContainer = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  background-color: gray;
  height: 100vh;
  width: 15vw;
`;

const RightContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;

  .audio {
    padding: 50px;
    border: 1px solid black;
  }
`;

const Audio = styled.div`
  display: flex;
`;
