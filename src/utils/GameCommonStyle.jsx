import React from "react";
import styled from "styled-components";
import Bg from "../sources/images/bg.png";

export default function GameCommonStyle() {
  return <GameBgStyle />;
}
const GameBgStyle = styled.div`
  background-color: #ffedb3;
  background-image: url(${Bg});
  background-size: 94% 91%;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;

  font-family: "SangSangShinb7";
`;
