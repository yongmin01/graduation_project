import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { throttle } from "lodash";
// import Lottie from "lottie-react";
import loadingLottie from "../sources/lottie/testlottie.json";

import bgImage from "../sources/images/Map/map2/map2.webp";
import clickImage from "../sources/images/Map/click.png";
import dateFormatImg from "../sources/images/Map/dateFormat.png";
import characterImage from "../sources/images/Map/girl/girl.png";
import loading1 from "../sources/images/plate.gif";
import boy1Image from "../sources/images/Map/map2/boy1.png";
import boy2Image from "../sources/images/Map/map2/boy2.png";
import milkBoxImage from "../sources/images/Map/map2/milkBox.png";
import milkBoxBorderImage from "../sources/images/Map/map2/milkBoxBorder.png";
import milkImage from "../sources/images/Map/map2/milk.png";
import cartImage from "../sources/images/Map/map2/cart.png";
import cartBorderImage from "../sources/images/Map/map2/cartBorder.png";
import plateImage from "../sources/images/Map/map2/plate.png";
import speakerSoundImage from "../sources/images/Map/map2/speakerSound.png";

import CharacterMoveArr from "../utils/CharacterMoveArr";
const FRAMES_LENGTH = 40;
const CW = 5000;
const CH = 1024;

export default function Map2({ sex }) {
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
  });

  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const requestAnimationRef = useRef(null);

  const navigator = useNavigate();

  const [round, setRound] = useState(false);
  const [pressedKey, setPressedKey] = useState(null);
  const [stop, setStop] = useState(false);

  const [background, setBackground] = useState({ x: 0, y: 0 });
  const bg = new Image();
  bg.src = bgImage;

  const [characterFrame, setCharacterFrame] = useState(0);

  const [showBorder, setShowBorder] = useState(true);

  const [loading, setLoading] = useState(false);

  const [boysAnimation, setBoysAnimation] = useState(true);
  const [boy1Coor, setBoy1Coor] = useState({ x: 2000, y: 404 });
  const [boy2Coor, setBoy2Coor] = useState({ x: 2775, y: 404 });

  const [milkStatus, setmilkStatus] = useState(false);

  // 계산 줄이기용 변수
  const bgWidth = bg.width;
  const bgHeight = bg.height;
  const canvasWidth = windowSize.width;
  const canvasHeight = windowSize.height;
  const ratio = canvasHeight / bgHeight;
  const val = bgWidth * ratio;

  const character = [
    (288 / CW) * val,
    (498 / CH) * canvasHeight,
    (330 / CW) * val,
    (392 / CH) * canvasHeight,
  ];
  const characterSex = sex;

  const [characterMove, setCharacterMove] = useState(0);
  const handleAnimation = () => {
    setCharacterMove(2);
  };

  const milkBoxBorderSize = {
    w: (416 / CW) * val,
    h: (362 / CH) * canvasHeight,
  };
  const milkBoxBorderCoor = {
    x: (2814 / CW) * val,
    y: (540 / CH) * canvasHeight,
  };

  const [plateStatus, setPlateStatus] = useState(false);

  const cartBorderSize = { w: (778 / CW) * val, h: (615 / CH) * canvasHeight };
  const cartBorderCoor = { x: (3335 / CW) * val, y: (327 / CH) * canvasHeight };

  const milkCoor = { x: (3001 / CW) * val, y: (358 / CH) * canvasHeight };
  const milkSize = { w: (214 / CW) * val, h: (186 / CH) * canvasHeight };
  const plateSize = { w: (550 / CW) * val, h: (436 / CH) * canvasHeight };
  const plateCoor = (3437 / CW) * val;
  const boy1Size = { w: (341 / CW) * val, h: (472 / CH) * canvasHeight };
  const boy2Size = { w: (343 / CW) * val, h: (450 / CH) * canvasHeight };
  const boysStartPoint = (404 / CH) * canvasHeight;

  const clickSize = { w: (102 / CW) * val, h: (32 / CH) * canvasHeight };
  const clickCoor1 = { x: (2974 / CW) * val, y: (522 / CH) * canvasHeight };
  const clickCoor2 = { x: (3673 / CW) * val, y: (349 / CH) * canvasHeight };

  // canvas가 정의되었다면 애니메이션 그리기
  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.focus();
    canvasRef.current.addEventListener("keydown", (e) => {
      e.preventDefault();
      setPressedKey(e.key);
    });
    canvasRef.current.addEventListener("keyup", () => setPressedKey(null));
    requestAnimationRef.current = requestAnimationFrame(render);

    // 클릭 감지
    const handleCanvasClick = (e) => {
      const canvas = canvasRef2.current;
      const context = canvas.getContext("2d");
      let x = e.clientX - context.canvas.offsetLeft;
      let y = e.clientY - context.canvas.offsetTop;

      //   우유상자 클릭 확인
      if (
        x >= background.x + milkBoxBorderCoor.x &&
        y >= milkBoxBorderCoor.y &&
        x <= background.x + milkBoxBorderCoor.x + milkBoxBorderSize.w &&
        y <= milkBoxBorderCoor.y + milkBoxBorderSize.h
      ) {
        setmilkStatus(true);
      }

      //   급식차 클릭 확인
      if (
        x >= background.x + cartBorderCoor.x &&
        y >= cartBorderCoor.y &&
        x <= background.x + (cartBorderCoor.x + cartBorderSize.w) &&
        y <= cartBorderCoor.y + cartBorderSize.h
      ) {
        setPlateStatus(true);
      }
    };
    canvasRef2.current.addEventListener("click", handleCanvasClick);
    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
      // canvasRef.current.removeEventListener("click", handleCanvasClick);
    };
  });

  // 게임 화면 라우팅
  useEffect(() => {
    if (background.x <= -(val - windowSize.width)) {
      setStop(true);
      setCharacterMove(1);
    }
  }, [background]);
  useEffect(() => {
    if (characterMove === 2) {
      navigator("/puzzle");
    }
  }, [characterMove]);

  useEffect(() => {
    if (round) {
      cancelAnimationFrame(requestAnimationRef.current);

      setLoading(true);
      setInterval(() => {
        navigator("/speech");
      }, 5000);
    }
  }, [round]);

  useEffect(() => {
    if (showBorder) {
      setInterval(() => {
        setShowBorder((prev) => !prev);
      }, 500);
    }
  }, [showBorder]);

  // 렌더링 함수
  const render = () => {
    if (!canvasRef.current) return;
    setCharacterFrame((prev) => (prev < FRAMES_LENGTH ? prev + 1 : 0));
    drawBg();
    drawBorder();
    if (boysAnimation) {
      drawBoys();
    }
    if (!characterMove) {
      drawCharacter();
    }
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
    bg.src = bgImage;

    bg.onload = () => {
      context.drawImage(bg, background.x, 0, val, canvasHeight);
    };

    // 우유 말풍선 그리기
    const milk = new Image();
    milk.src = milkImage;
    if (milkStatus) {
      milk.onload = () => {
        context.drawImage(
          milk,
          background.x + milkCoor.x,
          milkCoor.y,
          milkSize.w,
          milkSize.h
        );
      };
    }

    // 급식 말풍선 그리기
    const plate = new Image();
    plate.src = plateImage;
    if (plateStatus) {
      plate.onload = () => {
        context.drawImage(
          plate,
          background.x + plateCoor,
          0,
          plateSize.w,
          plateSize.h
        );
      };
    }

    const click = new Image();
    click.src = clickImage;

    click.onload = () => {
      if (!milkStatus) {
        context.drawImage(
          click,
          background.x + clickCoor1.x,
          clickCoor1.y,
          clickSize.w,
          clickSize.h
        );
      }
      if (!plateStatus) {
        context.drawImage(
          click,
          background.x + clickCoor2.x,
          clickCoor2.y,
          clickSize.w,
          clickSize.h
        );
      }
    };
  };

  // 테두리 그리기
  const drawBorder = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // 우유 박스 테두리 그리기
    const milkBoxBorder = new Image();
    milkBoxBorder.src = milkBoxBorderImage;
    if (!milkStatus && showBorder) {
      milkBoxBorder.onload = () => {
        context.drawImage(
          milkBoxBorder,
          background.x + milkBoxBorderCoor.x,
          milkBoxBorderCoor.y,
          milkBoxBorderSize.w,
          milkBoxBorderSize.h
        );
      };
    }

    // 급식차 테두리 그리기
    const cartBorder = new Image();
    cartBorder.src = cartBorderImage;
    cartBorder.onload = () => {
      if (!plateStatus && showBorder) {
        context.drawImage(
          cartBorder,
          background.x + cartBorderCoor.x,
          cartBorderCoor.y,
          cartBorderSize.w,
          cartBorderSize.h
        );
      }
    };
  };

  // 캐릭터 그리기
  const drawCharacter = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const characterImg = new Image();
    if (pressedKey !== null) {
      characterImg.src = CharacterMoveArr[characterFrame];
    } else {
      characterImg.src = characterImage;
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

  // 뛰어가는 남자아이들 그리기
  const drawBoys = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const boy1mg = new Image();
    boy1mg.src = boy1Image;

    const boy2Img = new Image();
    boy2Img.src = boy2Image;

    boy1mg.onload = () => {
      if (background.x < (-1595 / 5000) * val) {
        setStop(true);
        context.drawImage(
          boy1mg,
          boy1Coor.x,
          boysStartPoint,
          boy1Size.w,
          boy1Size.h
        );
        context.drawImage(
          boy2Img,
          boy2Coor.x,
          boysStartPoint,
          boy2Size.w,
          boy2Size.h
        );

        if (boy2Coor.x + boy2Size.w <= 0) {
          setStop(false);
          setBoysAnimation(false);
        }
        setBoy1Coor({ ...boy1Coor, x: boy1Coor.x - 6 });
        setBoy2Coor({ ...boy2Coor, x: boy2Coor.x - 7 });
      }
    };
  };

  // 캐릭터 이동
  const v = 5;
  const handleMove = () => {
    switch (pressedKey) {
      case "ArrowLeft":
        if (background.x < 0) {
          if (stop === true) {
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

  return (
    <>
      {loading ? (
        <Loading>
          <LoadingImg src={loading1} />
        </Loading>
      ) : (
        <MapContainer>
          {pressedKey ? null : <Date src={dateFormatImg} />}
          {characterMove === 1 ? (
            <Character
              src={CharacterMoveArr[characterFrame]}
              width={character[2]}
              onAnimationEnd={handleAnimation}
            />
          ) : null}
          <CanvasContainer>
            <Canvas
              ref={canvasRef}
              width={windowSize.width}
              height={windowSize.height}
              tabIndex={0}
            ></Canvas>
            <Canvas
              ref={canvasRef2}
              width={windowSize.width}
              height={windowSize.height}
              tabIndex={0}
            ></Canvas>
          </CanvasContainer>
          {/* <Lottie animationData={loadingLottie} /> */}
        </MapContainer>
      )}
    </>
  );
}

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
const Date = styled.img`
  width: 50vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
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
const Character = styled.img`
  position: absolute;
  bottom: 13vh;
  left: 20vw;
  z-index: 100;
  animation: ${translate} 2.5s linear forwards;
  animation-delay: 2s;
`;
const CanvasContainer = styled.div`
  position: relative;
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
