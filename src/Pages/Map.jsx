import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import backgroundImg from "../sources/images/map.png";
import characterImg from "../sources/images/girl.png";
import dateFormatImg from "../sources/images/dateFormat.png";
import carImg from "../sources/images/car.png";
import goWomanImg from "../sources/images/녹색어머니 출발.png";
import stopWomanImg from "../sources/images/녹색어머니 멈춤.png";
import greenlightImg from "../sources/images/초록불.png";
import redlightImg from "../sources/images/빨간불.png";

export default function Map({ gameStart, round }) {
  const canvasRef = useRef(null);
  const requestAnimationRef = useRef(null);
  const navigator = useNavigate();

  const [background, setBackground] = useState({ x: 0, y: 0 });
  const [character, setCharacter] = useState({ x: 500, y: 950 });
  const [traficLight, setTraficLight] = useState({ x: 3966, y: 870 });
  const [light, setLight] = useState({ x: 2540, y: 720, r: 0 });
  const [car, setCar] = useState({ x: 1600, y: 600 });

  // 캐릭터 이동 관련 state
  const [pressedKey, setPressedKey] = useState(null);
  const [stop, setStop] = useState(false);
  const [lightStatus, setLgithStatus] = useState("red");

  const bgImage = new Image();
  bgImage.src = backgroundImg;

  // 캐릭터 이동 속도
  const v = 10;

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.focus();
    canvasRef.current.addEventListener("keydown", (e) => {
      e.preventDefault();
      setPressedKey(e.key);
    });
    canvasRef.current.addEventListener("keyup", () => setPressedKey(null));
    requestAnimationRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
    };
  });

  const render = () => {
    // navigator 실행되면 canvasRef.current가 null이 되므로 이때는 함수 종료
    if (!canvasRef.current) return;
    drawBackground();
    drawTraficLight();
    drawWoman();
    drawCharacter();
    // drawLight();
    drawCar();
    handleMove();
    requestAnimationRef.current = requestAnimationFrame(render);
  };

  const drawBackground = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const bgImage = new Image();
    bgImage.src = backgroundImg;
    const ratio = bgImage.width / bgImage.height;

    bgImage.onload = () => {
      context.drawImage(
        bgImage,
        background.x,
        background.y,
        canvas.height * ratio,
        canvas.height
      );
    };
    handleMove();
  };

  const drawCharacter = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const characterImage = new Image();
    characterImage.src = characterImg;

    const dateFormat = new Image();
    dateFormat.src = dateFormatImg;

    characterImage.onload = () => {
      context.drawImage(
        characterImage,
        character.x,
        character.y,
        characterImage.width / 1.5,
        characterImage.height / 1.5
      );
    };
    dateFormat.onload = () => {
      context.drawImage(dateFormat, 0, 0, dateFormat.width, dateFormat.height);
    };
    handleMove();
  };

  const drawLight = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (background.x < -700) {
      context.beginPath();
      context.arc(light.x, light.y, light.r, 0, Math.PI * 2);
      context.stroke();
      context.fill();
      if (light.r < 50) {
        light.r += 2;
      }
      context.fillStyle = "yellow";
    }
  };

  const drawTraficLight = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const redLight = new Image();
    if (lightStatus === "red") {
      redLight.src = redlightImg;
    } else if (lightStatus === "green") {
      redLight.src = greenlightImg;
    }

    redLight.onload = () => {
      context.drawImage(
        redLight,
        traficLight.x,
        traficLight.y,
        redLight.width,
        redLight.height
      );
    };
  };

  const drawWoman = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const woman = new Image();
    if (lightStatus === "red") {
      woman.src = stopWomanImg;
    } else if (lightStatus === "green") {
      woman.src = goWomanImg;
    }

    woman.onload = () => {
      context.drawImage(
        woman,
        traficLight.x + 1200,
        traficLight.y + 50,
        woman.width,
        woman.height
      );
    };
  };
  const drawCar = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const carImage = new Image();
    carImage.src = carImg;

    carImage.onload = () => {
      if (background.x < -2700) {
        setStop(true);
        context.drawImage(
          carImage,
          car.x,
          car.y,
          carImage.width,
          carImage.height
        );
        if (car.y > canvas.height) {
          setStop(false);
          setLgithStatus("green");
        }
        setCar({ ...car, y: car.y + 3 });
      }
    };
  };
  useEffect(() => {
    if (
      background.x <
        -(
          canvasRef.current.height * (bgImage.width / bgImage.height) -
          canvasRef.current.width
        ) &&
      canvasRef.current
    ) {
      cancelAnimationFrame(requestAnimationRef.current);
      moveToGame();
      setInterval(() => {
        navigator("/music");
      }, 5000);
    }
  }, [background]);
  const moveToGame = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillRect(0, 0, canvas.width, canvas.height);
  };
  const handleMove = () => {
    switch (pressedKey) {
      case "ArrowLeft":
        if (background.x < 0) {
          if (stop === true) {
            setCharacter({ ...character });
            setBackground({ ...background });
            setLight({ ...light });
            setTraficLight({ ...traficLight });
          } else {
            setCharacter({ ...character });
            setBackground({ ...background, x: background.x + v });
            setLight({ ...light, x: light.x + v });
            setTraficLight({ ...traficLight, x: traficLight.x + v });
          }
        }
        return;
      case "ArrowRight":
        if (
          background.x >
          -(
            canvasRef.current.height * (bgImage.width / bgImage.height) -
            canvasRef.current.width
          )
        ) {
          if (stop === true) {
            setCharacter({ ...character });
            setBackground({ ...background });
            setLight({ ...light });
            setTraficLight({ ...traficLight });
          } else {
            setCharacter({ ...character });
            setBackground({ ...background, x: background.x - v });
            // setLight({ ...light, x: light.x - v });
            setTraficLight({ ...traficLight, x: traficLight.x - v });
          }
        } else {
          setStop(true);
        }
        return;
    }
  };
  return (
    <Canvas
      ref={canvasRef}
      width={window.innerWidth * 2}
      height={window.innerHeight * 2}
      // onKeyDown={handleMove}
      tabIndex={0}
    />
  );
}
const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background-color: brown;
  overflow-y: hidden;
`;
