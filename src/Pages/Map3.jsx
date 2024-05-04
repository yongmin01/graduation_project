import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// 사운드
import { Howl } from "howler";
import useEffectSound from "../utils/EffectSound";
import bgm from "../sources/sound/Map3/map3_bgm.mp3";
import chickSound from "../sources/sound/Map3/chickSound.mp3";

// 이미지
import loading1 from "../sources/images/icettaeng.gif";

import bgImage from "../sources/images/Map/map3/map3.webp";
import leftLightOnBg from "../sources/images/Map/map3/leftLightOnBg.webp";
import rightLightOnBg from "../sources/images/Map/map3/rightLightOnBg.webp";

import get0Diary from "../sources/images/Map/dateFormat.svg";
import get1Diary from "../sources/images/Map/get1Diary.svg";
import get2Diary from "../sources/images/Map/get2Diary.svg";
import get3Diary from "../sources/images/Map/get3Diary.svg";

import clickImage from "../sources/images/Map/click.png";
import chickManBorderImage from "../sources/images/Map/map3/chickManBorder.png";
import chickImage from "../sources/images/Map/map3/chick.png";
import moneyImage from "../sources/images/Map/map3/money.png";

import shopBorderImage from "../sources/images/Map/map3/shopBorder.png";
import snack1Image from "../sources/images/Map/map3/snack1.png";
import snack2Image from "../sources/images/Map/map3/snack2.png";
import sugarSnackImage from "../sources/images/Map/map3/sugarSnack.png";
import busImage from "../sources/images/Map/map3/bus.png";

import girlImg from "../sources/images/Map/girl/girl.png";
import boyImg from "../sources/images/Map/boy/boy.png";
// 로티
import Lottie from "react-lottie";
import girlLottie from "../sources/lottie/girl.json";
import boyLottie from "../sources/lottie/boy.json";

export default function Map3() {
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
  const [getTotalDiary, setGetTotalDiary] = useState(get0Diary);
  const totalDiary = JSON.parse(localStorage.getItem("totalDiary"));

  useEffect(() => {
    if (totalDiary === 0) {
      setGetTotalDiary(get0Diary);
    } else if (totalDiary === 1) {
      setGetTotalDiary(get1Diary);
    } else if (totalDiary === 2) {
      setGetTotalDiary(get2Diary);
    } else setGetTotalDiary(get3Diary);
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

  // 계산 줄이기용 변수
  const CW = 5000;
  const CH = 1024;
  const canvasWidth = windowSize.width;
  const canvasHeight = windowSize.height;
  const ratio = canvasHeight / 1024;
  const val = 5000 * ratio;

  const character = [
    (188 / CW) * val,
    (498 / CH) * canvasHeight,
    (330 / CW) * val,
    (392 / CH) * canvasHeight,
  ];

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

  const clickSize = { w: (102 / CW) * val, h: (32 / CH) * canvasHeight };
  const clickCoor1 = { x: (797 / CW) * val, y: (386 / CH) * canvasHeight };
  const clickCoor2 = { x: (1814 / CW) * val, y: (260 / CH) * canvasHeight };

  const canvasRef = useRef(null);

  const [background, setBackground] = useState(0);
  const [showBorder, setShowBorder] = useState(true);
  const [streetLightStatus, setStreetLightStatus] = useState(0);
  const [busAnimation, setBusAnimation] = useState(true);
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
      context.drawImage(bg, background, 0, val, canvasHeight);
    };

    const click = new Image();
    click.src = clickImage;

    click.onload = () => {
      if (!chickStatus) {
        context.drawImage(
          click,
          background + clickCoor1.x,
          clickCoor1.y,
          clickSize.w,
          clickSize.h
        );
      }
      if (!snackStatus) {
        context.drawImage(
          click,
          background + clickCoor2.x,
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
          background + chicksManBorderCoor.x,
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
          background + moneyCoor.x,
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
          background + chicksCoor.x,
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
          background + shopBorderCoor.x,
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
          background + snack1Coor.x,
          snack1Coor.y,
          snack1Size.w,
          snack1Size.h
        );
      };
      snack2.onload = () => {
        context.drawImage(
          snack2,
          background + snack2Coor.x,
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
          background + sugarSnackCoor.x,
          sugarSnackCoor.y,
          sugarSnackSize.w,
          sugarSnackSize.h
        );
      }
    };
  };

  // 캐릭터 이동
  const [pressedKey, setPressedKey] = useState(null);
  const [stop, setStop] = useState(false);

  const keyDown = (e) => {
    e.preventDefault();
    setPressedKey(e.key);
  };
  const keyUp = () => {
    setPressedKey(null);
  };

  const v = 5;
  const handleMove = () => {
    switch (pressedKey) {
      case "ArrowLeft":
        if (background < 0) {
          if (stop) {
            setBackground(background);
          } else {
            setBackground(background + v);
          }
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

    // 병아리 아저씨 클릭 확인
    if (
      x >= background + chicksManBorderCoor.x &&
      y >= chicksManBorderCoor.y &&
      x <= background + (chicksManBorderCoor.x + chicksManBorderSize.w) &&
      y <= chicksManBorderCoor.y + chicksManBorderSize.h
    ) {
      setChickStatus(true);
    }

    // 포장마차 클릭 확인
    if (
      x >= background + shopBorderCoor.x &&
      y >= shopBorderCoor.y &&
      x <= background + shopBorderCoor.x + shopBorderSize.w &&
      y <= shopBorderCoor.y + shopBorderSize.h
    ) {
      setSnackStatus(true);
    }
  };

  // 램프 켜기
  useEffect(() => {
    if (background < (-200 / 5000) * val) {
      setStreetLightStatus(1);
    }
    if (background < (-2600 / 5000) * val) {
      setStreetLightStatus(2);
    }
  }, [background]);

  // 달고나 보이기
  useEffect(() => {
    if (background < (-1300 / 5000) * val) {
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
  const drawBus = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const busImg = new Image();
    busImg.src = busImage;

    busImg.onload = () => {
      if (background < (-2000 / 5000) * val) {
        setStop(true);
        context.drawImage(
          busImg,
          background + busCoorX,
          busCoorY,
          busSize.w,
          busSize.h
        );

        if (background + busCoorX > canvasWidth) {
          setBusAnimation(false);
          setStop(false);
        }
        setBusCoorX(busCoorX + 5);
      } else {
        context.drawImage(
          busImg,
          background + busCoorX,
          busCoorY,
          busSize.w,
          busSize.h
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
    if (!canvasRef.current) return;
    drawBg();
    if (busAnimation) {
      drawBus();
    }
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
        navigator("/speech");
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
    volume: 0.1,
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

  const chickEffect = useEffectSound(chickSound, 1);
  useEffect(() => {
    if (chickStatus === true) {
      chickEffect.play();
      setTimeout(() => {
        chickEffect.pause();
      }, 1500);
    }
  }, [chickStatus]);

  return (
    <>
      {loading ? (
        <Loading>
          <LoadingImg src={loading1} />
        </Loading>
      ) : (
        <MapContainer>
          {pressedKey ? null : <Date src={getTotalDiary} />}
          {characterMove === 1 ? (
            <CharacterAtEnd
              src={characterImg}
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
const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background-color: brown;
  overflow-y: hidden;
`;

const translate = keyframes`
  0%{
    transform:  translateX(0px);
    opacity: 100%;
  }
  50%{
    transform:  translateX(650px);
    opacity: 100%;
  }
  100% {
    transform:  translateX(700px);
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
