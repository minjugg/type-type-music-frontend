import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  button {
    cursor: pointer;
    font-size: 40px;
    padding: 20px 50px;
    transition: 0.3s;
    border: none;
    background: #fff;
    margin: 10px;
  }

  button:hover {
    background: #1a73e8;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  .main-background {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgb(70,75,90);
    color: #fff;
  }
`;

export default GlobalStyles;
