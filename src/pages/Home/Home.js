import React from "react";
import Login from "./Login";
import styled from "styled-components";

export default function Home() {
  return (
    <div className="main-background">
      <WelcomePage>
        <div className="main">
          <div className="title">TYPE TYPE MUSIC</div>
          <div className="sub-title">How does your code sound?</div>
        </div>
        <Login />
      </WelcomePage>
    </div>
  );
}

const WelcomePage = styled.div`
  text-align: center;

  .main {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 100px;
    margin-bottom: 30px;
    font-weight: bold;
  }

  .sub-title {
    font-size: 40px;
    margin-bottom: 30px;
  }
`;
