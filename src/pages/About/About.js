import React from "react";
import LogoutButton from "../../components/LogoutButton";
import styled from "styled-components";

export default function About() {
  return (
    <>
      <LogoutButton />
      <AboutWrapper>
        <div className="title">FAQ</div>
        <ul>
          <li>
            <div>1. 이 사이트가 왜 탄생하게 되었는가 ?</div>
            <div>어쩌다</div>
          </li>
          <li>
            <div>2. 노래는 어떻게 만들어지나요 ?</div>
            <div>어쩌다</div>
          </li>
          <li>
            <div>3. 누가 만들었는지 궁금하시나요 ?</div>
            <div>어쩌다</div>
          </li>
          <li>
            <div>4. 어떤 악기들이 사용되나요 ?</div>
            <div>어쩌다</div>
          </li>
        </ul>
      </AboutWrapper>
    </>
  );
}

const AboutWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .title {
    font-size: 50px;
  }

  ul > li {
    margin: 30px;
    font-size: 30px;
  }
`;
