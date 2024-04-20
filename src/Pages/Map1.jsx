import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import bgImage2 from "../sources/images/Map/map1/greenBg.webp";
import bgImage3 from "../sources/images/Map/map1/redBg.webp";
import characterImage from "../sources/images/Map/girl/girl.png";
import characterImage2 from "../sources/images/Map/boy/boy.png";
import dateFormatImg from "../sources/images/Map/dateFormat.png";
import smog1Img from "../sources/images/Map/map1/smog1.png";
import smog2Img from "../sources/images/Map/map1/smog2.png";
import carImg from "../sources/images/Map/map1/car.png";
import notesImg from "../sources/images/Map/map1/notes.png";
import loading1 from "../sources/images/MP3.gif";

import Lottie from "react-lottie";
import girlLottie from "../sources/lottie/girl.json";
import boyLottie from "../sources/lottie/boy.json";

import { CharacterMoveArrGirl } from "../utils/CharacterMoveArr";
import { CharacterMoveArrBoy } from "../utils/CharacterMoveArr";
const FRAMES_LENGTH = 40;
const CW = 5000;
const CH = 1024;

export default function Map1() {
  // 캔버스 크기 관련
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const resizeHandler = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      // 중복 이벤트 방지용 클린업
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const canvasRef = useRef(null);
  const requestAnimationRef = useRef(null);

  const navigator = useNavigate();

  const [background, setBackground] = useState({ x: 0, y: 0 });
  const bg = new Image();
  bg.src = bgImage2;

  // 계산 줄이기용 변수
  const bgWidth = bg.width;
  const bgHeight = bg.height;
  const canvasWidth = windowSize.width;
  const canvasHeight = windowSize.height;
  const ratio = canvasHeight / bgHeight;
  const val = bgWidth * ratio;

  const [characterFrame, setCharacterFrame] = useState(0);
  const characterSex = JSON.parse(localStorage.getItem("character"));

  let characterLottie = null;
  if (characterSex === "girl") characterLottie = girlLottie;
  else characterLottie = boyLottie;

  let characterinMap = null;
  if (characterSex === "girl") {
    characterinMap = characterImage;
  } else if (characterSex === "boy") {
    characterinMap = characterImage2;
  }
  const character = [
    (188 / CW) * val,
    (498 / CH) * canvasHeight,
    (330 / CW) * val,
    (392 / CH) * canvasHeight,
  ];

  const lottieOptions = {
    loop: true, // 반복재생
    autoplay: false, // 자동재생
    animationData: characterLottie, // 로띠 파일
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [characterMoveX, setCharacterMoveX] = useState();
  const characterEndX = 188 / CW;
  const [characterMove, setCharacterMove] = useState(0);

  const [trafficLightStatus, setTrafficLightStatus] = useState("red");

  const [carCoor, setCarCoor] = useState({ x: 1600, y: 468 });
  const carCoorX = 2602 / CW;
  const car = new Image();
  car.src = carImg;
  const carSize = { w: car.width / CW, h: car.height / CH };

  const [loading, setLoading] = useState(false);
  // 캐릭터 이동 관련 state
  const [pressedKey, setPressedKey] = useState(null);
  const [stop, setStop] = useState(false);
  const [smogPos, setSmogPos] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.focus();
  }, []);

  useEffect(() => {
    requestAnimationRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
    };
  }, [requestAnimationRef.current]);

  const keyDown = (e) => {
    e.preventDefault();
    setPressedKey(e.key);
  };
  const keyUp = () => {
    setPressedKey(null);
  };
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let x = e.clientX - context.canvas.offsetLeft;
    let y = e.clientY - context.canvas.offsetTop;
  };

  // 게임 화면 라우팅
  useEffect(() => {
    if (background.x <= -(val - windowSize.width)) {
      setStop(true);
      setCharacterMove(1);
    }
  }, [background]);

  useEffect(() => {
    if (characterMove === 2) {
      cancelAnimationFrame(requestAnimationRef.current);
      setLoading(true);

      setTimeout(() => {
        navigator("/music");
      }, 3000);
    }
  }, [characterMove]);

  // 렌더링 함수
  const render = () => {
    // navigator 실행되면 canvasRef.current가 null이 되므로 이때는 함수 종료
    if (!canvasRef.current) return;
    setCharacterFrame((prev) => (prev < FRAMES_LENGTH ? prev + 1 : 0));
    drawBg();

    // if (!characterMove) {
    //   drawCharacter();
    // }
    drawCar();
    setSmogPos(background.x);
    if (characterMove !== 1) {
      handleMove();
    }
    requestAnimationRef.current = requestAnimationFrame(render);
  };

  // 배경 그리기
  const drawBg = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const bg = new Image();
    if (trafficLightStatus === "green") {
      bg.src = bgImage2;
    } else {
      bg.src = bgImage3;
    }

    bg.onload = () => {
      context.drawImage(bg, background.x, background.y, val, canvasHeight);
    };

    // 스피커 음표 애니메이션
    const notesImage = new Image();
    notesImage.src = notesImg;
  };

  // 캐릭터 그리기
  const drawCharacter = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const characterImg = new Image();
    if (pressedKey !== null) {
      if (characterSex === "girl") {
        characterImg.src = CharacterMoveArrGirl[characterFrame];
      } else {
        characterImg.src = CharacterMoveArrBoy[characterFrame];
      }
    } else {
      if (characterSex === "girl") {
        characterImg.src = characterImage;
      } else {
        characterImg.src = characterImage2;
      }
    }

    characterImg.onload = () => {
      context.drawImage(
        characterImg,
        character[0],
        character[1],
        character[2],
        character[3]
      );
    };
  };

  // 차 그리기
  const drawCar = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const carImage = new Image();
    carImage.src = carImg;

    carImage.onload = () => {
      if (background.x < (-1500 / CW) * val) {
        setStop(true);
        context.drawImage(
          carImage,
          background.x + carCoorX * val,
          carCoor.y,
          carSize.w * val,
          carSize.h * canvasHeight
        );
        if (carCoor.y > canvas.height) {
          setTrafficLightStatus("green");

          setStop(false);
        }
        setCarCoor({ ...carCoor, y: carCoor.y + 2 });
      } else {
        context.drawImage(
          carImage,
          background.x + carCoorX * val,
          (carCoor.y / CH) * canvasHeight,
          carSize.w * val,
          carSize.h * canvasHeight
        );
      }
    };
  };

  // 캐릭터 이동
  const v = 5;
  const handleMove = () => {
    switch (pressedKey) {
      case "ArrowLeft":
        if (background.x < 0) {
          if (stop) {
            setBackground({ ...background });
          } else {
            setBackground({ ...background, x: background.x + v });
          }
        }
        return;
      case "ArrowRight":
        if (background.x + val > canvasRef.current.width) {
          if (stop) {
            setBackground({ ...background });
          } else {
            setBackground({ ...background, x: background.x - v });
          }
        } else {
          setStop(true);
        }
        return;
    }
  };
  const handleAnimation = () => {
    setCharacterMove(2);
  };
  return (
    <>
      {loading ? (
        <Loading>
          <LoadingImg src={loading1} />
        </Loading>
      ) : (
        // <MapContainer>
        <MapContainer>
          {pressedKey ? null : <Date src={dateFormatImg} />}
          {characterMove === 1 ? (
            <CharacterAtEnd
              src={characterinMap}
              width={character[2]}
              onAnimationEnd={handleAnimation}
            />
          ) : null}
          {pressedKey && characterMove !== 1 ? (
            <LottieAnimation
              options={lottieOptions}
              width={character[2]}
              height={character[3]}
              isStopped={false}
              ariaLabel={""}
              ariaRole={"img"}
              style={{
                position: "absolute",
                bottom: "13vh",
                left: "13vw",
                zIndex: "200",
              }}
            />
          ) : characterMove !== 1 ? (
            <Character
              src={characterinMap}
              width={character[2]}
              onAnimationEnd={handleAnimation}
            />
          ) : null}

          <Canvas
            ref={canvasRef}
            width={windowSize.width}
            height={windowSize.height}
            tabIndex={0}
            onKeyDown={keyDown}
            onKeyUp={keyUp}
            onClick={handleCanvasClick}
          />
        </MapContainer>
      )}
    </>
  );
}

const MapContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const Date = styled.img`
  width: 50vw;
  position: absolute;
  top: 0;
  left: 0;
  /* z-index: 100; */
`;
const translate = keyframes`
  0%{
    transform:  translateX(0px);
    opacity: 100%;
  }
  50%{
    transform:  translateX(750px);
    opacity: 100%;
  }
  100% {
    transform:  translateX(800px);
    opacity: 0;
  }
  
`;
const CharacterAtEnd = styled.img`
  position: absolute;
  bottom: 13vh;
  left: 13vw;
  z-index: 150;
  animation: ${translate} 2.5s linear forwards;
  animation-delay: 2s;
`;
const Character = styled.img`
  position: absolute;
  bottom: 13vh;
  left: 13vw;
  z-index: 150;
`;
const LottieAnimation = styled(Lottie)`
  position: absolute;
  bottom: 13vh;
  left: 13vw;
  z-index: 150;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  overflow-y: hidden;
`;
const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const LoadingImg = styled.img`
  width: 100%;
`;
