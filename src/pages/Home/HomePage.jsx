import React from "react";
import LoginButton from "./LoginButton";
import styled from "styled-components";
import SpeakerLayout from "../../components/SpeakerLayout";

export default function HomePage() {
  return (
    <Background>
      <Content>
        <h1 className="title">TYPE TYPE MUSIC</h1>
        <h3 className="sub-title">How does your code sound ?</h3>
        <LoginButton />
      </Content>
      <SpeakerLayout image="speaker_neon.png" />
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

const Content = styled.div`
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
