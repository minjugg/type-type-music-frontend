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
    const currentAudio = audioRefs.current[i];

    if (currentAudio.paused) {
      currentAudio.play();
    } else {
      currentAudio.pause();
    }
  }

  const handleNavbarButton = () => {
    resetMusic();
    resetIndex();
    navigate(`/users/${currentUser}/code`);
  };

  return (
    <>
      <Header>
        <Title>
          <span className="user-name">{currentUser}</span>
          <span className="sub-title">Music Library</span>
        </Title>
        <NavBar>
          <img
            className="code-editor"
            src="/images/button/code_neon.png"
            alt="play more code"
            onClick={handleNavbarButton}
          />
          <div
            className="main-page"
            onClick={() => navigate(`/users/${currentUser}`)}
          >
            ☗
          </div>
          <div className="FAQ" onClick={() => navigate("/about")}>
            FAQ
          </div>
        </NavBar>
        {Array.isArray(audios) && audios.length > 0 && (
          <NavBarDescription>
            ✱ Click on the tape's name to listen
          </NavBarDescription>
        )}
      </Header>
      <AudioContainer>
        <AudioTapeWrapper>
          {Array.isArray(audios) && audios.length > 0 ? (
            audios?.map((audio, i) => {
              return (
                <SingleAudioTape key={audio.storageUrl}>
                  <Tag onClick={() => toggleAudio(i)}>{audio?.tag}</Tag>
                  <Options>
                    <LikeButton onClick={() => toggleLikes(audio)}>
                      {audio.isLiked ? <>♥</> : <>♡</>}
                    </LikeButton>
                    <DeleteButton onClick={() => deleteAudio(audio)}>
                      ✗
                    </DeleteButton>
                  </Options>
                  <audio
                    src={audio.storageUrl}
                    type="audio/mpeg"
                    ref={(element) => {
                      audioRefs.current[i] = element;
                    }}
                  />
                </SingleAudioTape>
              );
            })
          ) : (
            <EmptyMessage>No music has been made yet.</EmptyMessage>
          )}
        </AudioTapeWrapper>
      </AudioContainer>
    </>
  );
}

const Header = styled.nav`
  position: absolute;
  top: 5%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10%;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  font-family: Helvetica, sans-serif;
  position: absolute;
  top: 0;
  right: 5%;
  left: 80%;
  height: 100%;
  margin-left: 1rem;
  font-size: 2.5rem;
  text-align: center;
  align-items: center;
  transition: transform 0.3s;

  img.code-editor {
    height: 50%;
    transition: transform 0.3s;
    margin-right: 3rem;
  }

  img.code-editor:hover {
    transform: scale(1.2);
    cursor: pointer;
  }

  div.main-page {
    transition: transform 0.3s;
    margin-right: 3rem;
  }

  div.main-page:hover {
    transform: scale(1.2);
    cursor: pointer;
  }

  div.FAQ {
    transition: transform 0.3s;
  }

  div.FAQ:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Title = styled.nav`
  display: flex;
  justify-content: center;
  font-family: Helvetica, sans-serif;
  font-size: 4rem;
  align-items: center;
  margin-bottom: 1rem;

  .sub-title {
    color: #9261f9;
    font-size: 5rem;
  }
`;

const NavBarDescription = styled.div`
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
`;

const AudioContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  width: 50%;
  height: 60%;
  align-items: center;
  border: 3px solid #9261f9;
  border-radius: 0.4rem;
  background-color: #9161f93f;
`;

const AudioTapeWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  width: 100%;
  height: 80%;
  border: 3px solid #9261f9;
  overflow: scroll;
`;

const SingleAudioTape = styled.div`
  display: flex;
  position: relative;
  width: 10%;
  height: 69%;
  flex-direction: column;
  align-items: center;
  margin: auto 0.3rem;
  padding: 3rem 1rem;
  background-color: #9261f9;
  border-radius: 0.4rem;
  border: 0.8rem solid rgba(198, 198, 198, 0.9);
  transition: transform 0.3s;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const Tag = styled.div`
  position: relative;
  text-align: left;
  margin-right: 1rem;
  top: 5.5rem;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  width: 15rem;
  height: 2.5rem;
  overflow: hidden;
`;

const Options = styled.div`
  position: relative;
  top: 50%;
  display: flex;
  flex-direction: column;
  text-align: center;
  transform: scale(2);
  cursor: pointer;
  font-size: 1.3rem;
  z-index: 1;
`;

const LikeButton = styled.div`
  padding: 0.3rem;
  border-radius: 0.15rem;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const DeleteButton = styled.div`
  padding: 0.3rem;
  border-radius: 0.15rem;

  &:hover {
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
