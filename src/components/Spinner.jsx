import React from "react";
import styled from "styled-components";

export default function Spinner() {
  return (
    <SpinnerContainer>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </SpinnerContainer>
  );
}

const SpinnerContainer = styled.div`
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 45%;
    transform: translate(-50%, -50%);

    width: 50px;
    height: 50px;
    border: 10px solid #ccfd02;
    border-top: 10px solid #383636;
    border-radius: 50%;
    animation: spinner 1s linear infinite;
  }
`;
