import React from "react";
import styled from "styled-components";
import Bg from "../sources/images/Game/bg.png";

export default function GameCommonStyle({ color }) {
  return <GameBgStyle color={color} />;
}
const GameBgStyle = styled.div`
  display: relative;
  background-color: ${(props) => props.color};
  background-image: url(${Bg});
  background-size: 94vw 91vh;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
`;
