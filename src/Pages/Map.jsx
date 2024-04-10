import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { throttle } from "lodash";

// import bgImage from "../sources/images/Map/map1/map1.webp";
import bgImage2 from "../sources/images/Map/map1/greenBg.webp";
import bgImage3 from "../sources/images/Map/map1/redBg.webp";

import characterImageSh from "../sources/images/Map/girl/girlShadow2.png";

import characterImage from "../sources/images/Map/girl/girl.png";
import dateFormatImg from "../sources/images/Map/dateFormat.png";
import smog1Img from "../sources/images/Map/map1/smog1.png";
import smog2Img from "../sources/images/Map/map1/smog2.png";
import carImg from "../sources/images/Map/map1/car.png";
import goWomanImg from "../sources/images/Map/map1/goWoman.png";
import stopWomanImg from "../sources/images/Map/map1/stopWoman.png";
import greenlightImg from "../sources/images/Map/map1/greenLight.png";
import redlightImg from "../sources/images/Map/map1/redLight.png";
import speakerImage from "../sources/images/Map/map1/speaker.png";
import notesImg from "../sources/images/Map/map1/notes.png";
import loading1 from "../sources/images/MP3.gif";

import CharacterMoveArr from "../utils/CharacterMoveArr";
const FRAMES_LENGTH = 40;
const CW = 5000;
const CH = 1024;

export default function Map() {
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
  const [moveStart, setMoveStart] = useState(false);
  const [smogStop, setSmogStop] = useState(false);

  const [background, setBackground] = useState({ x: 0, y: 0 });
  const bg = new Image();
  bg.src = bgImage2;

  const [characterFrame, setCharacterFrame] = useState(0);
  const characterCoor = { x: 188 / CW, y: 498 / CH };

  const characterSize = {
    w: 330 / CW,
    h: 392 / CH,
  };

  const [trafficLightStatus, setTrafficLightStatus] = useState("red");
  const trafficLightCoor = { x: 2366 / CW, y: 370 / CH };
  const trafficLight = new Image();
  trafficLight.src = greenlightImg;
  const trafficLightSize = {
    w: trafficLight.width / CW,
    h: trafficLight.height / CH,
  };

  const [womanYPos, setWomanYPos] = useState(448);
  const womanCoor = 3004 / CW;
  const woman = new Image();
  woman.src = goWomanImg;
  const womanSize = { w: woman.width / CW, h: woman.height / CH };

  const [carCoor, setCarCoor] = useState({ x: 1600, y: 468 });
  const carCoorX = 2602 / CW;

  const carSize = { w: 272 / CW, h: 286 / CH };

  const speakerCoor = { x: 4693 / CW, y: 486 / CH };
  const speaker = new Image();
  speaker.src = speakerImage;
  const speakerSize = { w: speaker.width / CW, h: speaker.height / CH };
  const [loading, setLoading] = useState(false);
  // 캐릭터 이동 관련 state
  const [pressedKey, setPressedKey] = useState(null);
  const [stop, setStop] = useState(false);
  const [smogPos, setSmogPos] = useState(0);

  // 계산 줄이기용 변수
  const bgWidth = bg.width;
  const bgHeight = bg.height;
  const canvasWidth = windowSize.width;
  const canvasHeight = windowSize.height;
  const ratio = canvasHeight / bgHeight;
  const val = bgWidth * ratio;

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.focus();
    // throttle(() => {
    //   drawSmog();
    //   console.log("hi");
    // }, 2000);
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
      // const canvasHeight = canvas.height;
      // const ratio = canvasHeight / bgHeight;
      // const val = bgWidth * ratio;

      let x = e.clientX - context.canvas.offsetLeft;
      let y = e.clientY - context.canvas.offsetTop;

      console.log("마우스 클릭 위치 : ", x, y);
      // 스피커 클릭 확인

      if (
        x >= background.x + speakerCoor.x * val &&
        x <= background.x + speakerCoor.x * val + speakerSize.w * val &&
        y >= background.y + speakerCoor.y * canvasHeight &&
        y <=
          background.y +
            speakerCoor.y * canvasHeight +
            speakerSize.h * canvasHeight
      ) {
        setRound(true);
      }
    };
    canvasRef.current.addEventListener("click", handleCanvasClick);
    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
    };
  });

  // 게임 화면 라우팅
  useEffect(() => {
    if (round) {
      cancelAnimationFrame(requestAnimationRef.current);
      setLoading(true);
      setRound(false);
      setInterval(() => {
        navigator("/music");
      }, 1000);
    }
  }, [round]);

  // 렌더링 함수
  const render = () => {
    // navigator 실행되면 canvasRef.current가 null이 되므로 이때는 함수 종료
    if (!canvasRef.current) return;

    setCharacterFrame((prev) => (prev < FRAMES_LENGTH ? prev + 1 : 0));
    drawBg();
    // throttle(() => {
    //   drawSmog();
    // }, 2000);
    // drawCharacter();
    drawCar();
    setSmogPos(background.x);
    handleMove();
    requestAnimationRef.current = requestAnimationFrame(render);
  };

  // 배경 그리기
  const drawBg = () => {
    const bg = new Image();
    if (trafficLightStatus === "green") {
      bg.src = bgImage2;
    } else {
      bg.src = bgImage3;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    bg.onload = () => {
      context.drawImage(bg, background.x, background.y, val, canvasHeight);
    };

    // 신호등 그리기
    // let trafficLight = trafficLightHandler();

    // trafficLight.onload = () => {
    //   context.drawImage(
    //     trafficLight,
    //     background.x + trafficLightCoor.x * val,
    //     background.y + trafficLightCoor.y * canvasHeight,
    //     trafficLightSize.w * val,
    //     trafficLightSize.h * canvasHeight
    //   );
    // };

    // 녹색어머니 그리기
    // let woman = womanHandler();
    // woman.onload = () => {
    //   context.drawImage(
    //     woman,
    //     background.x + womanCoor * val,
    //     background.y + (womanYPos / CH) * canvasHeight,
    //     womanSize.w * val,
    //     womanSize.h * canvasHeight
    //   );
    // };

    // 스피커 그리기
    // const speaker = new Image();
    // speaker.src = speakerImage;

    // speaker.onload = () => {
    //   context.drawImage(
    //     speaker,
    //     background.x + speakerCoor.x * val,
    //     background.y + speakerCoor.y * canvasHeight,
    //     speakerSize.w * val,
    //     speakerSize.h * canvasHeight
    //   );
    // };
    // // 날짜 그리기
    // const date = new Image();
    // date.src = dateFormatImg;
    // if (!pressedKey) {
    //   date.onload = () => {
    //     context.drawImage(
    //       date,
    //       0,
    //       0,
    //       (date.width / CW) * val,
    //       (date.height / CH) * canvasHeight
    //     );
    //   };
    // }

    // 스피커 음표 애니메이션
    const notesImage = new Image();
    notesImage.src = notesImg;
  };

  // const trafficLightHandler = () => {
  //   const trafficLight = new Image();
  //   if (trafficLightStatus === "green") trafficLight.src = greenlightImg;
  //   else trafficLight.src = redlightImg;
  //   return trafficLight;
  // };

  // const womanHandler = () => {
  //   const woman = new Image();
  //   if (womanYPos === 414) {
  //     woman.src = goWomanImg;
  //   } else woman.src = stopWomanImg;

  //   return woman;
  // };

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
        characterCoor.x * val,
        characterCoor.y * canvasHeight,
        characterSize.w * val,
        characterSize.h * canvasHeight
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
          setWomanYPos(414);
          setStop(false);
        }
        setCarCoor({ ...carCoor, y: carCoor.y + 2 });
      } else {
        context.drawImage(
          carImage,
          background.x + carCoorX * val,
          background.y + (carCoor.y / CH) * canvasHeight,
          carSize.w * val,
          carSize.h * canvasHeight
        );
      }
    };
  };

  // 연기 그리기
  // const [smogAni, setSmogAni] = useState(true);
  // useEffect(() => {
  //   if (pressedKey !== null) {
  //     setMoveStart(true);
  //   }
  // }, [pressedKey]);
  // useEffect(() => {
  //   if (!moveStart) {
  //     drawSmog();
  //   }
  // }, [smogAni]);

  // const drawSmog = () => {
  //   const canvass = canvasRef2.current;
  //   const contextt = canvass.getContext("2d");
  //   const smog1 = new Image();
  //   smog1.src = smog1Img;

  //   smog1.onload = () => {
  //     setTimeout(() => {
  //       contextt.drawImage(
  //         smog1,
  //         background.x + (298 / CW) * bg.width * (canvass.height / bg.height),
  //         (320 / CH) * canvass.height,
  //         (smog1.width / CW) * bg.width * (canvass.height / bg.height),
  //         (smog1.height / CH) * canvass.height
  //       );
  //     }, 500);
  //   };

  //   const smog2 = new Image();
  //   smog2.src = smog2Img;

  //   smog2.onload = () => {
  //     setTimeout(() => {
  //       contextt.drawImage(
  //         smog2,
  //         background.x + (238 / CW) * bg.width * (canvass.height / bg.height),
  //         (282 / CH) * canvass.height,
  //         (smog2.width / CW) * bg.width * (canvass.height / bg.height),
  //         (smog2.height / CH) * canvass.height
  //       );
  //     }, 1000);
  //   };
  //   setTimeout(() => {
  //     contextt.clearRect(0, 0, canvass.width, canvass.height);
  //     setSmogAni((current) => !current);
  //   }, 1500);
  // };

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
  return (
    <>
      {loading ? (
        <Loading>
          <LoadingImg src={loading1} />
        </Loading>
      ) : (
        <MapContainer>
          {pressedKey ? null : <Date src={dateFormatImg} />}
          <Character
            src={characterImageSh}
            width={characterSize.w * val}
            style={{
              transform: `rotate(${pressedKey ? characterFrame * 0.5 : 0}deg)`,
            }}
          />
          <CanvasContainer>
            <Canvas
              ref={canvasRef}
              width={windowSize.width}
              height={windowSize.height}
              tabIndex={0}
            />
            {/* <Canvas
              ref={canvasRef2}
              width={windowSize.width}
              height={windowSize.height}
            /> */}
          </CanvasContainer>
        </MapContainer>
      )}
    </>
  );
}

const MapContainer = styled.div``;
const Date = styled.img`
  width: 50vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`;

const Character = styled.img`
  position: absolute;
  bottom: 13vh;
  left: 13vw;
  z-index: 100;
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
