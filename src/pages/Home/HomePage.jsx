import React from "react";
import LoginButton from "./LoginButton";
import styled from "styled-components";
import SpeakerLayout from "../../components/SpeakerLayout";

export default function Home() {
  return (
    <Background>
      <SpeakerLayout image="speaker_neon.png" />
      {/* <Speaker src="/images/assets/speaker_neon.png" alt="neon speaker" /> */}
      <Title>
        <h1 className="title">TYPE TYPE MUSIC</h1>
        <h3 className="sub-title">How does your code sound ?</h3>
        <LoginButton />
      </Title>
      {/* <Speaker src="/images/assets/speaker_neon.png" alt="neon speaker" /> */}
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Speaker = styled.img`
  width: 30em;
  margin: 1rem;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  h1.title {
    font-size: 8rem;
    font-weight: 400;
  }

  h3.sub-title {
    font-size: 3rem;
    margin: 2rem;
    color: #9261f9;
  }
`;
