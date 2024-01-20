import { createGlobalStyle } from "styled-components";
import SangSangShinb7 from "../sources/font/SSShinb7.ttf";
import GangwonEduAll from "../sources/font/강원교육모두 LIGHT.ttf";
import Gaegu from "../sources/font/J개구쟁이-Medium.otf";
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    
}

html, body {
    font-family: "Helvetica", "Arial", sans-serif;
    font-size: 60px;
    line-height: 1.5;
}
button {
      cursor: pointer;
}
  @font-face {
        font-family: 'SangSangShinb7';
        src: url(${SangSangShinb7}) format('truetype');
  }
  @font-face {
        font-family: 'GangwonEduAll';
        src: url(${GangwonEduAll}) format('truetype');
  }
  @font-face {
        font-family: 'Gaegu';
        src: url(${Gaegu}) format('opentype');
  }
`;
export default GlobalStyle;
