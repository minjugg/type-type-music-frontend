import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  font-family: Helvetica, sans-serif;

  @font-face {
    font-family: Helvetica;
    src: url(/fonts/HelveticaNeue-Condensed.otf);
  }

  body {
    width: 100vw;
    height: 100vh;
    background-color: #202025;
    color: #CCFD02;
    font-family: Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
    font-size: 30px;
    width: 400px;
    height: 60px;
    transition: 0.3s;
    border: 1px solid #9261f9;
    background-color: #FFFFFF;
    border-radius: 7px;
    font-family: Helvetica, sans-serif;
  }

  button:hover {
    background-color: #9261f9;
  }

  a {
    color: #000;
    text-decoration: none;
  }
`;

export default GlobalStyles;
