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
    overflow: hidden;
    background-color: #202025;
    color: #CCFD02;
    font-family: Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
    font-size: 3rem;
    width: 30rem;
    height: 8rem;
    transition: 0.3s;
    background-color: #FFFFFF;
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
