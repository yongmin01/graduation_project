import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// 사운드
import { Howl } from "howler";
import useEffectSound from "../utils/EffectSound";
import bgm from "../sources/sound/Map1/map1_bgm.mp3";
import hornSound from "../sources/sound/Map1/hornSound.mp3";

// 이미지
import loading1 from "../sources/images/MP3.gif";

import noSmogBg from "../sources/images/Map/map1/map.webp";
import greenBg from "../sources/images/Map/map1/greenBg.webp";
import redBg from "../sources/images/Map/map1/redBg.webp";

import dateFormatImg from "../sources/images/Map/dateFormat.svg";

import clickImage from "../sources/images/Map/click.png";
import carImg from "../sources/images/Map/map1/car.png";

import shopKidsImg from "../sources/images/Map/map1/shopKids.webp";
import telephoneImg from "../sources/images/Map/map1/1541.webp";
import telephoneBorderImg from "../sources/images/Map/map1/telephoneBorder.png";

import girlImg from "../sources/images/Map/girl/girl.png";
import boyImg from "../sources/images/Map/boy/boy.png";

// 로티
import Lottie from "react-lottie";
import girlLottie from "../sources/lottie/girl.json";
import boyLottie from "../sources/lottie/boy.json";
import smogLottie from "../sources/lottie/smog.json";

export default function Map1() {
  // 캔버스 크기 세팅
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

  // 일기장 개수 세팅
  useEffect(() => {
    localStorage.setItem("totalDiary", JSON.stringify([0]));
  }, []);

  // 캐릭터 성별 세팅
  const characterSex = JSON.parse(localStorage.getItem("character"));

  let characterLottie = null;
  if (characterSex === "girl") characterLottie = girlLottie;
  else characterLottie = boyLottie;

  let characterImg = null;
  if (characterSex === "girl") {
    characterImg = girlImg;
  } else if (characterSex === "boy") {
    characterImg = boyImg;
  }
  const lottieOptions = {
    loop: true, // 반복재생
    autoplay: false, // 자동재생
    animationData: characterLottie, // 로띠 파일
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const smogImg = {
    loop: true, // 반복재생
    autoplay: true, // 자동재생
    animationData: smogLottie, // 로띠 파일
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // 계산 줄이기용 변수
  const CW = 5000;
  const CH = 1024;
  const canvasHeight = windowSize.height;
  const [ratio, setRatio] = useState(canvasHeight / 1024);
  const [val, setVal] = useState(5000 * ratio);

  const character = [
    (162 / CW) * val,
    (474 / CH) * canvasHeight,
    (368 / CW) * val,
    (442 / CH) * canvasHeight,
  ];

  const [smogStatus, setSmogStatus] = useState(true);
  const smog = [
    (238 / CW) * val,
    (282 / CH) * canvasHeight,
    (800 / CW) * val,
    (200 / CH) * canvasHeight,
  ];

  const [shopKidsStatus, setShopKidsStatus] = useState(false);
  const shopKidsSize = {
    w: (372 / CW) * val,
    h: (386 / CH) * canvasHeight,
  };
  const shopKidsCoor = {
    x: (1352 / CW) * val,
    y: (226 / CH) * canvasHeight,
  };

  const [telephoneStatus, setTelephoneStatus] = useState(false);
  const telephoneBorderSize = {
    w: (448 / CW) * val,
    h: (470 / CH) * canvasHeight,
  };
  const telephoneBorderCoor = {
    x: (3489 / CW) * val,
    y: (287 / CH) * canvasHeight,
  };
  const telephoneBubbleSize = {
    w: (336 / CW) * val,
    h: (188 / CH) * canvasHeight,
  };
  const telephoneBubbleCoor = {
    x: (3506 / CW) * val,
    y: (147 / CH) * canvasHeight,
  };
  const clickSize = { w: (102 / CW) * val, h: (32 / CH) * canvasHeight };
  const clickCoor1 = { x: (3649 / CW) * val, y: (282 / CH) * canvasHeight };

  const canvasRef = useRef(null);

  const [background, setBackground] = useState(0);
  const [trafficLightStatus, setTrafficLightStatus] = useState("red");

  // 배경 그리기
  const drawBg = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const bg = new Image();
    if (smogStatus) {
      bg.src = noSmogBg;
    } else if (trafficLightStatus === "green") {
      bg.src = greenBg;
    } else {
      bg.src = redBg;
    }

    bg.onload = () => {
      context.drawImage(bg, background, 0, val, canvasHeight);
    };

    // 문구점 아이들 그리기
    const shopKids = new Image();
    shopKids.src = shopKidsImg;

    shopKids.onload = () => {
      if (shopKidsStatus) {
        context.drawImage(
          shopKids,
          background + shopKidsCoor.x,
          shopKidsCoor.y,
          shopKidsSize.w,
          shopKidsSize.h
        );
      }
    };
    // 공중전화 말풍선 그리기
    const telephoneBubble = new Image();
    telephoneBubble.src = telephoneImg;

    telephoneBubble.onload = () => {
      if (telephoneStatus) {
        context.drawImage(
          telephoneBubble,
          background + telephoneBubbleCoor.x,
          telephoneBubbleCoor.y,
          telephoneBubbleSize.w,
          telephoneBubbleSize.h
        );
      }
    };

    const click = new Image();
    click.src = clickImage;

    click.onload = () => {
      if (!telephoneStatus) {
        context.drawImage(
          click,
          background + clickCoor1.x,
          clickCoor1.y,
          clickSize.w,
          clickSize.h
        );
      }
    };

    // 액자 테두리 그리기
    const telephoneBorder = new Image();
    telephoneBorder.src = telephoneBorderImg;
    telephoneBorder.onload = () => {
      if (!telephoneStatus) {
        context.drawImage(
          telephoneBorder,
          background + telephoneBorderCoor.x,
          telephoneBorderCoor.y,
          telephoneBorderSize.w,
          telephoneBorderSize.h
        );
      }
    };
  };

  // 캐릭터 이동
  const [pressedKey, setPressedKey] = useState(null);
  const [stop, setStop] = useState(false);

  const keyDown = (e) => {
    e.preventDefault();
    if (
      e.key === "a" ||
      e.key === "d" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    ) {
      setPressedKey(e.key);
    }
  };
  const keyUp = () => {
    setPressedKey(null);
  };

  const v = 5;
  const handleMove = () => {
    switch (pressedKey) {
      case "a":
        if (background < 0) {
          if (stop) {
            setBackground(background);
          } else {
            setBackground(background + v);
          }
        }
        return;
      case "ArrowLeft":
        if (background < 0) {
          if (stop) {
            setBackground(background);
          } else {
            setBackground(background + v);
          }
        }
        return;
      case "d":
        if (background + val > canvasRef.current.width) {
          if (stop) {
            setBackground(background);
          } else {
            setBackground(background - v);
          }
        } else {
          setStop(true);
        }
        return;
      case "ArrowRight":
        if (background + val > canvasRef.current.width) {
          if (stop) {
            setBackground(background);
          } else {
            setBackground(background - v);
          }
        } else {
          setStop(true);
        }
        return;
    }
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let x = e.clientX - context.canvas.offsetLeft;
    let y = e.clientY - context.canvas.offsetTop;

    // 공중전화 클릭 확인
    if (
      x >= background + telephoneBorderCoor.x &&
      y >= telephoneBorderCoor.y &&
      x <= background + (telephoneBorderCoor.x + telephoneBorderSize.w) &&
      y <= telephoneBorderCoor.y + telephoneBorderSize.h
    ) {
      setTelephoneStatus(true);
    }
  };

  // 문구점 아이들 보이기
  useEffect(() => {
    if (background < (-600 / 5000) * val) {
      setShopKidsStatus(true);
    }
  }, [background]);

  // 차 그리기
  const car = new Image();
  car.src = carImg;
  const carSize = { w: car.width / CW, h: car.height / CH };
  const [carCoor, setCarCoor] = useState({ x: 1600, y: 468 });
  const carCoorX = 2602 / CW;

  const drawCar = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const carImage = new Image();
    carImage.src = carImg;

    carImage.onload = () => {
      if (background < (-1500 / CW) * val) {
        setStop(true);
        context.drawImage(
          carImage,
          background + carCoorX * val,
          carCoor.y,
          carSize.w * val,
          carSize.h * canvasHeight
        );
        if (carCoor.y > canvas.height) {
          setTrafficLightStatus("green");
          // hornEffect.stop();
          setStop(false);
        }
        setCarCoor({ ...carCoor, y: carCoor.y + 3 });
      } else {
        context.drawImage(
          carImage,
          background + carCoorX * val,
          (carCoor.y / CH) * canvasHeight,
          carSize.w * val,
          carSize.h * canvasHeight
        );
      }
    };
  };

  // canvas가 정의되었다면 애니메이션 그리기
  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.focus();
  }, []);

  const requestAnimationRef = useRef(null);
  // 렌더링 함수
  const render = () => {
    // navigator 실행되면 canvasRef.current가 null이 되므로 이때는 함수 종료
    if (!canvasRef.current) return;
    drawBg();
    drawCar();
    if (characterMove !== 1) {
      handleMove();
    }
    requestAnimationRef.current = requestAnimationFrame(render);
  };

  // 애니메이션 실행
  useEffect(() => {
    requestAnimationRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
    };
  }, [render]);

  // 게임 화면 라우팅
  const [characterMove, setCharacterMove] = useState(0);
  const handleAnimation = () => {
    setCharacterMove(2);
  };
  const navigator = useNavigate();
  useEffect(() => {
    if (background < 0) setSmogStatus(false);
    if (background <= -(val - windowSize.width)) {
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

  const [loading, setLoading] = useState(false);

  // 사운드
  const sound = new Howl({
    // 2. sound라는 상수에 new Howl 생성자 생성하고 원하는 옵션을 추가한다.
    src: [bgm],
    // 2-1. 사용할 배경음 src에 추가
    loop: true,
    // 2-2. 반복재생값 true로 설정 (반복재생 on)
    volume: 0.4,
    // 2-3. 기본 볼륨은 0.1로 설정 (최소 0, 최대 1의 값을 가질 수 있다)
  });
  const soundStop = () => sound.stop();
  // 3. soundStop이라는 함수가 실행되면 sound가 멈추도록 설정한다.

  useEffect(() => {
    sound.play();
    // 4. 화면이 렌더링될 때 sound,play()를 통해 배경음악을 실행시킨다.
    sound.on("play", () => {});
    return soundStop;
    // 4-5. sound.on() 두번째 매개변수인 익명 함수의 리턴값은 soundStop으로 설정한다.
    // 4-6. loop을 true로 설정했기 때문에 soundStop이 실행될 일은 없을 듯.
  }, []);

  const hornEffect = useEffectSound(hornSound, 1);
  useEffect(() => {
    if (stop && characterMove !== 1) {
      hornEffect.play();
    }
  }, [stop]);

  return (
    <>
      {loading ? (
        <Loading>
          <LoadingImg src={loading1} />
        </Loading>
      ) : (
        <MapContainer>
          {pressedKey ? null : <Date src={dateFormatImg} />}
          {smogStatus ? (
            <Smog
              options={smogImg}
              width={smog[2]}
              height={smog[3]}
              isStopped={false}
              ariaLabel={""}
              ariaRole={"img"}
              style={{
                position: "absolute",
                top: "27.5vh",
                left: "0vw",
                zIndex: "200",
              }}
            />
          ) : null}
          {characterMove === 1 ? (
            <CharacterAtEnd
              src={characterImg}
              width={character[2]}
              onAnimationEnd={handleAnimation}
            />
          ) : null}
          {pressedKey && characterMove !== 1 ? (
            <LottieWrapper>
              <Lottie
                options={lottieOptions}
                width={character[2]}
                isStopped={false}
                ariaLabel={""}
                ariaRole={"img"}
              />
            </LottieWrapper>
          ) : characterMove !== 1 ? (
            <Character
              src={characterImg}
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
  z-index: 100;
`;
const Smog = styled(Lottie)`
  position: absolute;
  /* top: 27.5vh;
  left: 4.7vw; */
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
const LottieWrapper = styled.div`
  position: absolute;
  z-index: 200;
  top: 46.2vh;
  left: 11.2vw;
`;
const CharacterAtEnd = styled.img`
  position: absolute;
  top: 46.2vh;
  left: 11.2vw;
  z-index: 150;
  animation: ${translate} 2.5s linear forwards;
  animation-delay: 2s;
`;
const Character = styled.img`
  position: absolute;
  top: 46.2vh;
  left: 11.2vw;
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
