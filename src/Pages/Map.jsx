import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backgroundImg from "../sources/images/map.jpeg";
import characterImg from "../sources/images/playerDown.png";
export default function Map({ gameStart }) {
  const canvasRef = useRef(null);
  const [background, setBackground] = useState({ x: 0, y: 0 });
  const [character, setCharacter] = useState({ x: 200, y: 200 });
  const navigator = useNavigate();
  useEffect(() => {
    drawBackground();

    drawCharacter();
  }, [character, background]);

  const drawBackground = () => {
    const canvasCur = canvasRef.current;
    const context = canvasCur.getContext("2d");

    const bgImage = new Image();
    bgImage.src = backgroundImg;
    const ratio = bgImage.width / bgImage.height;
    console.log(canvasCur.height * ratio - canvasCur.width);
    bgImage.onload = () => {
      context.drawImage(
        bgImage,
        background.x,
        background.y,
        canvasCur.height * ratio,
        canvasCur.height
      );
    };
  };

  const drawCharacter = () => {
    const canvasCur = canvasRef.current;
    const context = canvasCur.getContext("2d");

    const characterImage = new Image();
    characterImage.src = characterImg;

    characterImage.onload = () => {
      context?.drawImage(
        characterImage,
        0,
        0,
        characterImage.width / 4,
        characterImage.height,
        400,
        1000,
        (characterImage.width / 4) * 3,
        characterImage.height * 3
      );
    };
  };
  const handleMove = (e) => {
    if (e.key === "ArrowLeft") {
      if (background.x < 0) {
        console.log(background.x, canvasRef.current.width);
        setCharacter({ ...character, x: character.x - 40 });
        setBackground({ ...background, x: background.x + 40 });
      }
    } else if (e.key === "ArrowRight") {
      if (background.x > -1878) {
        setCharacter({ ...character, x: character.x + 40 });
        setBackground({ ...background, x: background.x - 40 });
      } else {
        navigator("/music");
      }
    }
  };
  return (
    <Canvas
      ref={canvasRef}
      width={window.innerWidth * 2}
      height={window.innerHeight * 2}
      onKeyDown={handleMove}
      tabIndex={0}
    />
  );
}
const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background-color: brown;
`;
