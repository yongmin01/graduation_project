import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import bgImage from "../sources/images/Map/map3/map3.webp";
import leftLightOnBg from "../sources/images/Map/map3/leftLightOnBg.webp";
import rightLightOnBg from "../sources/images/Map/map3/rightLightOnBg.webp";
import clickImage from "../sources/images/Map/click.png";
import dateFormatImg from "../sources/images/Map/dateFormat.png";
import characterImage from "../sources/images/Map/girl/girl.png";
import loading1 from "../sources/images/icettaeng.gif";
import chickManBorderImage from "../sources/images/Map/map3/chickManBorder.png";
import chickImage from "../sources/images/Map/map3/chick.png";
import moneyImage from "../sources/images/Map/map3/money.png";
import lampOffImage from "../sources/images/Map/map3/lampOff.png";
import lampOnImage from "../sources/images/Map/map3/lampOn.png";
import shopImage from "../sources/images/Map/map3/shop.png";
import shopBorderImage from "../sources/images/Map/map3/shopBorder.png";
import sugarSnackImage from "../sources/images/Map/map3/sugarSnack.png";
import busImage from "../sources/images/Map/map3/bus.png";
import snack1Image from "../sources/images/Map/map3/snack1.png";
import snack2Image from "../sources/images/Map/map3/snack2.png";
import houseImage from "../sources/images/Map/map3/house.png";

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

  const [streetLightStatus, setStreetLightStatus] = useState(0);

  const [busAnimation, setBusAnimation] = useState(true);

  // 계산 줄이기용 변수
  const bgWidth = bg.width;
  const bgHeight = bg.height;
  const canvasWidth = windowSize.width;
  const canvasHeight = windowSize.height;
  const ratio = canvasHeight / bgHeight;
  const val = bgWidth * ratio;

  const character = [
    (418 / CW) * val,
    (498 / CH) * canvasHeight,
    (330 / CW) * val,
    (392 / CH) * canvasHeight,
  ];
  const characterSex = sex;

  const [characterMove, setCharacterMove] = useState(0);
  const handleAnimation = () => {
    setCharacterMove(2);
  };

  const [chickStatus, setChickStatus] = useState(false);
  const chicksManBorderSize = {
    w: (252 / CW) * val,
    h: (330 / CH) * canvasHeight,
  };
  const chicksManBorderCoor = {
    x: (687 / CW) * val,
    y: (396 / CH) * canvasHeight,
  };
  const chicksSize = {
    w: (214 / CW) * val,
    h: (172 / CH) * canvasHeight,
  };
  const chicksCoor = {
    x: (918 / CW) * val,
    y: (548 / CH) * canvasHeight,
  };

  const moneySize = {
    w: (228 / CW) * val,
    h: (176 / CH) * canvasHeight,
  };
  const moneyCoor = {
    x: (874 / CW) * val,
    y: (256 / CH) * canvasHeight,
  };

  const [snackStatus, setSnackStatus] = useState(false);
  const shopBorderSize = {
    w: (436 / CW) * val,
    h: (424 / CH) * canvasHeight,
  };
  const shopBorderCoor = {
    x: (1644 / CW) * val,
    y: (288 / CH) * canvasHeight,
  };

  const snack1Size = {
    w: (274 / CW) * val,
    h: (306 / CH) * canvasHeight,
  };
  const snack1Coor = {
    x: (1591 / CW) * val,
    y: (20 / CH) * canvasHeight,
  };

  const snack2Size = {
    w: (232 / CW) * val,
    h: (260 / CH) * canvasHeight,
  };
  const snack2Coor = {
    x: (1916 / CW) * val,
    y: (52 / CH) * canvasHeight,
  };

  const [sugarSnackStatus, setSugarSnackStatus] = useState(false);
  const sugarSnackSize = {
    w: (223 / CW) * val,
    h: (188 / CH) * canvasHeight,
  };
  const sugarSnackCoor = {
    x: (2230 / CW) * val,
    y: (312 / CH) * canvasHeight,
  };
  const [busCoorX, setBusCoorX] = useState((3143 / CW) * val);
  const busCoorY = (374 / CH) * canvasHeight;
  const busSize = {
    w: (450 / CW) * val,
    h: (352 / CH) * canvasHeight,
  };

  const houseSize = {
    w: (438 / CW) * val,
    h: (430 / CH) * canvasHeight,
  };
  const houseCoor = {
    x: (4542 / CW) * val,
    y: (410 / CH) * canvasHeight,
  };

  const clickSize = { w: (102 / CW) * val, h: (32 / CH) * canvasHeight };
  const clickCoor1 = { x: (797 / CW) * val, y: (386 / CH) * canvasHeight };
  const clickCoor2 = { x: (1814 / CW) * val, y: (260 / CH) * canvasHeight };

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
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      let x = e.clientX - context.canvas.offsetLeft;
      let y = e.clientY - context.canvas.offsetTop;

      // 병아리 아저씨 클릭 확인
      const chickMan = new Image();
      chickMan.src = chickManBorderImage;
      if (
        x >= background.x + chicksManBorderCoor.x &&
        y >= chicksManBorderCoor.y &&
        x <= background.x + (chicksManBorderCoor.x + chicksManBorderSize.w) &&
        y <= chicksManBorderCoor.y + chicksManBorderSize.h
      ) {
        setChickStatus(true);
      }

      // 포장마차 클릭 확인
      const shop = new Image();
      shop.src = shopImage;
      if (
        x >= background.x + shopBorderCoor.x &&
        y >= shopBorderCoor.y &&
        x <= background.x + shopBorderCoor.x + shopBorderSize.w &&
        y <= shopBorderCoor.y + shopBorderSize.h
      ) {
        setSnackStatus(true);
      }
      // 집 클릭 확인
      const house = new Image();
      house.src = houseImage;
      if (
        x >= background.x + houseCoor.x &&
        y >= houseCoor.y &&
        x <= background.x + houseCoor.x + houseSize.w &&
        y <= houseCoor.y + houseSize.h
      ) {
        setRound(true);
      }
    };
    canvasRef.current.addEventListener("click", handleCanvasClick);
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
        navigator("/puzzle");
      }, 5000);
    }
  }, [round]);

  // 램프 켜기
  useEffect(() => {
    if (background.x < (-200 / 5000) * val) {
      setStreetLightStatus(1);
    }
    if (background.x < (-2600 / 5000) * val) {
      setStreetLightStatus(2);
    }
  }, [background]);

  // 달고나 보이기
  useEffect(() => {
    if (background.x < (-1300 / 5000) * val) {
      setSugarSnackStatus(true);
    }
  }, [background]);

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
    if (busAnimation) {
      drawBus();
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
    if (streetLightStatus === 0) {
      bg.src = bgImage;
    } else if (streetLightStatus === 1) {
      bg.src = leftLightOnBg;
    } else {
      bg.src = rightLightOnBg;
    }

    bg.onload = () => {
      context.drawImage(bg, background.x, 0, val, canvasHeight);
    };

    const click = new Image();
    click.src = clickImage;

    click.onload = () => {
      if (!chickStatus) {
        context.drawImage(
          click,
          background.x + clickCoor1.x,
          clickCoor1.y,
          clickSize.w,
          clickSize.h
        );
      }
      if (!snackStatus) {
        context.drawImage(
          click,
          background.x + clickCoor2.x,
          clickCoor2.y,
          clickSize.w,
          clickSize.h
        );
      }
    };

    // 병아리 아저씨 테두리 그리기
    const chickManBorder = new Image();
    chickManBorder.src = chickManBorderImage;
    if (!chickStatus && showBorder) {
      chickManBorder.onload = () => {
        context.drawImage(
          chickManBorder,
          background.x + chicksManBorderCoor.x,
          chicksManBorderCoor.y,
          chicksManBorderSize.w,
          chicksManBorderSize.h
        );
      };
    }
    // 돈 그리기
    const money = new Image();
    money.src = moneyImage;

    money.onload = () => {
      if (chickStatus) {
        context.drawImage(
          money,
          background.x + moneyCoor.x,
          moneyCoor.y,
          moneySize.w,
          moneySize.h
        );
      }
    };

    // 병아리 그리기
    const chick = new Image();
    chick.src = chickImage;

    chick.onload = () => {
      if (chickStatus) {
        context.drawImage(
          chick,
          background.x + chicksCoor.x,
          chicksCoor.y,
          chicksSize.w,
          chicksSize.h
        );
      }
    };

    // 포장마차 테두리 그리기
    const shopBorder = new Image();
    shopBorder.src = shopBorderImage;
    if (!snackStatus && showBorder) {
      shopBorder.onload = () => {
        context.drawImage(
          shopBorder,
          background.x + shopBorderCoor.x,
          shopBorderCoor.y,
          shopBorderSize.w,
          shopBorderSize.h
        );
      };
    }

    // 간식 그리기
    const snack1 = new Image();
    snack1.src = snack1Image;
    const snack2 = new Image();
    snack2.src = snack2Image;
    if (snackStatus) {
      snack1.onload = () => {
        context.drawImage(
          snack1,
          background.x + snack1Coor.x,
          snack1Coor.y,
          snack1Size.w,
          snack1Size.h
        );
      };
      snack2.onload = () => {
        context.drawImage(
          snack2,
          background.x + snack2Coor.x,
          snack2Coor.y,
          snack2Size.w,
          snack2Size.h
        );
      };
    }

    // 달고나 그리기
    const sugarSnack = new Image();
    sugarSnack.src = sugarSnackImage;

    sugarSnack.onload = () => {
      if (sugarSnackStatus) {
        context.drawImage(
          sugarSnack,
          background.x + sugarSnackCoor.x,
          sugarSnackCoor.y,
          sugarSnackSize.w,
          sugarSnackSize.h
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

  const drawBus = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const busImg = new Image();
    busImg.src = busImage;

    busImg.onload = () => {
      if (background.x < (-2000 / 5000) * val) {
        setStop(true);
        context.drawImage(
          busImg,
          background.x + busCoorX,
          busCoorY,
          busSize.w,
          busSize.h
        );

        if (background.x + busCoorX > canvasWidth) {
          setBusAnimation(false);
          setStop(false);
        }
        setBusCoorX(busCoorX + 5);
      } else {
        context.drawImage(
          busImg,
          background.x + busCoorX,
          busCoorY,
          busSize.w,
          busSize.h
        );
      }
    };
  };

  // 캐릭터 이동
  const v = 3;
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
          </CanvasContainer>
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
  left: 29vw;
  z-index: 100;
  animation: ${translate} 2.5s linear forwards;
  animation-delay: 2s;
`;
const CanvasContainer = styled.div`
  position: relative;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background-color: brown;
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
