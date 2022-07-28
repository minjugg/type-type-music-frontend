import React from "react";
import styled from "styled-components";

export default function SpeakerLayout(props) {
  return (
    <BackgroundSpeaker>
      <Speakers>
        <img
          className="left-speaker"
          src={`/images/assets/${props.image}`}
          alt="neon speaker"
        />
        <img
          className="right-speaker"
          src={`/images/assets/${props.image}`}
          alt="neon speaker"
        />
      </Speakers>
    </BackgroundSpeaker>
  );
}

const BackgroundSpeaker = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .left-speaker {
    margin-right: 30rem;
  }
`;

const Speakers = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
