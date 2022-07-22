import React from "react";
import LoginButton from "./LoginButton";
import styled from "styled-components";

export default function Home() {
  return (
    <WelcomePage>
      <Speaker>
        <img
          className="left-speaker"
          src="/images/assets/speaker_neon.png"
          alt="neon speaker"
        />
        <img
          className="right-speaker"
          src="/images/assets/speaker_neon.png"
          alt="neon speaker"
        />
      </Speaker>
      <div className="title">TYPE TYPE MUSIC</div>
      <div className="sub-title">How does your code sound ?</div>
      <LoginButton />
    </WelcomePage>
  );
}

const WelcomePage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  div.title {
    font-size: 100px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  div.title:hover {
  }

  div.sub-title {
    font-size: 40px;
    margin-bottom: 30px;
    color: #9261f9;
  }
`;

const Speaker = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .left-speaker {
    position: relative;
    right: 300px;
  }

  .right-speaker {
    position: relative;
    left: 300px;
  }
`;
