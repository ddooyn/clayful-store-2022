import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Montserrat', sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    border: none;
    background: none;
    color: inherit;
    cursor: pointer;
  }
  img {
    vertical-align: top;
  }
`;

export default GlobalStyles;
