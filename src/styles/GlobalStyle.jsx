import { createGlobalStyle } from "styled-components";
import SangSangShinb7 from "../sources/font/SSShinb7.ttf";
import Gaegu from "../sources/font/J개구쟁이-Medium.otf";
import UhbeeJung from "../sources/font/UhBee jung.ttf";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-use-select: none;
    user-select: none;
}

*:focus {
    outline: 0;
}

canvas {
      margin: 0;
      padding: 0;
}

html, body {
    font-family: "Helvetica", "Arial", sans-serif;
    font-size: 60px;
    line-height: 1.5;
    margin: 0;
    
}

button {
      cursor: pointer;
}
img {
 -webkit-user-drag: none;
 -khtml-user-drag: none;
 -moz-user-drag: none;
 -o-user-drag: none;

}
  @font-face {
        font-family: 'SangSangShinb7';
        src: url(${SangSangShinb7}) format('woff');
  }

  @font-face {
        font-family: 'Gaegu';
        src: url(${Gaegu}) format('woff');
  }
  @font-face {
      font-family: 'UhBeejung';
      src: url(${UhbeeJung}) format('woff');
      font-weight: normal;
      font-style: normal;
}
  @font-face {
      font-family: 'UhBeejungBold';
      src: url(${UhbeeJung}) format('woff');
      font-weight: bold;
      font-style: normal;
}

`;
export default GlobalStyle;
