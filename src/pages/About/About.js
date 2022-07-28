import React from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../../components/Logout";
import styled from "styled-components";

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <Logo
        src="/images/assets/logo_neon.png"
        alt="logo"
        onClick={() => navigate("/")}
      />
      <Logout />
      <AboutWrapper>
        <div className="title">FAQ</div>
        <ul>
          <li>
            <span className="question">
              1. 처음 아이디어를 생각하게 된 계기?
            </span>
            <span className="answer">
              코딩을 하면서 컴퓨터 화면 속에 있는 코드들이 화면에 틀어박혀 있는
              듯한 느낌을 받은 적이 있습니다. 그러다 문득 코드들이 살아 움직여서
              음악이 되어 들어보는 상상을 하게 되었습니다 코드를, 컴퓨터
              코드로만 볼 필요가 없다고 생각이 들자 이 둘은 공통점이 있다고
              생각했습니다. 개발자가 짠 코드를 정해진 규칙으로 컴퓨터가 읽으면서
              내려가듯이, 음악도 작곡가가 적은 코드에 따라 연주가 되기
              때문입니다!
            </span>
          </li>
          <li>
            <span className="question">2. 노래는 어떻게 만들어지나요 ?</span>
            <span className="answer">
              우선, 하나의 단어는 악보에서 한 마디를 차지합니다! 작성한 코드 중
              알파벳으로 구성된 단어들만 뽑아서, 그 영단어의 가장 앞에 위치한
              알파벳을 기준으로 음악을 생성합니다. 그리고 각 알파벳마다 정해진
              화음코드(예를 들어 A코드, C코드 등)가 있습니다. 이 화음코드 내부에
              존재하는 음들만을 가지고 랜덤하게 해당 마디의 멜로디를 생성합니다.
              <div className="example">
                <ul className="example-box">
                  <li>* 영단어 import에서 "i" 추출</li>
                  <li>* "i"에 해당하는 코드톤 G코드</li>
                  <li>* G코드에 해당하는 음들인 솔, 시, 레로만 마디 구성</li>
                  <li>* 어떤 마디는 솔, 시, 시 연주</li>
                  <li>* 어떤 마디는 시, 레 연주됨</li>
                </ul>
              </div>
            </span>
          </li>
          <li>
            <span className="question">3. 어떤 악기들이 사용되나요 ?</span>
            <span className="answer">
              작성 코드 길이에 따라 2가지 비트의 드럼 중 한가지가 연주됩니다.
              그리고 주멜로디는 컴퓨터에 내장된 일렉트로닉 사운드의 악기로
              연주가 됩니다.
            </span>
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
  background-color: rgba(255, 255, 255, 0.1);
  padding: 3rem 0rem;
  height: 80%;
  overflow: scroll;

  .title {
    font-size: 5rem;
    display: flex;
    justify-content: center;
    font-family: Helvetica, sans-serif;
  }

  ul > li {
    margin: 3rem;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    line-height: 2.5rem;

    .question {
      font-size: 1.7rem;
    }

    .answer {
      color: #fff;
      margin-top: 0.7rem;
    }

    .example {
      border: 1px solid #ccfd02;
      margin: 1rem auto;
      background-color: rgba(0, 0, 0, 0.2);
    }

    .example-box > li {
      font-size: 1.5rem;
      line-height: 1.5rem;
    }
  }
`;

const Logo = styled.img`
  width: 2%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 5rem;
  transition: transform 0.3s;
  z-index: 1;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;
