import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { errorState } from "../states/music";

export default function Error(props) {
  const [error, setError] = useRecoilState(errorState);

  return (
    <>
      {error && (
        <ErrorBox>
          <Message>{props.message}</Message>
          <ExitButton onClick={() => setError(false)}>✗</ExitButton>
        </ErrorBox>
      )}
    </>
  );
}

const ErrorBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 20vh;
  background-color: #9161f9;
  border: 3px solid #ccfd02;
  border-radius: 2.5rem;
  box-shadow: 0.7rem 0.7rem 0.3rem #ccfd02;
`;

const Message = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;
  width: 90%;
  line-height: 2rem;
`;

const ExitButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1.2rem;
  font-size: 2rem;

  &:hover {
    cursor: pointer;
  }
`;
