import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Howl } from "howler";
import useEffectSound from "../utils/EffectSound";
import bgm from "../sources/sound/Map2/map2_bgm.mp3";

import bgImage from "../sources/images/Map/map2/map2.webp";
import clickImage from "../sources/images/Map/click.png";
import get0Diary from "../sources/images/Map/dateFormat.svg";
import get1Diary from "../sources/images/Map/get1Diary.svg";
import get2Diary from "../sources/images/Map/get2Diary.svg";
import get3Diary from "../sources/images/Map/get3Diary.svg";

import characterImage from "../sources/images/Map/girl/girl.png";
import characterImage2 from "../sources/images/Map/boy/boy.png";
import loading1 from "../sources/images/plate.gif";
import boy1Image from "../sources/images/Map/map2/boy1.png";
import boy2Image from "../sources/images/Map/map2/boy2.png";
import milkBoxBorderImage from "../sources/images/Map/map2/milkBoxBorder.png";
import milkImage from "../sources/images/Map/map2/milk.png";
import cartBorderImage from "../sources/images/Map/map2/cartBorder.png";
import plateImage from "../sources/images/Map/map2/plate.png";
import speakerSoundImage from "../sources/images/Map/map2/speakerSound.png";

import { CharacterMoveArrGirl } from "../utils/CharacterMoveArr";
import { CharacterMoveArrBoy } from "../utils/CharacterMoveArr";

import Lottie from "react-lottie";
import girlLottie from "../sources/lottie/girl.json";
import boyLottie from "../sources/lottie/boy.json";

const FRAMES_LENGTH = 40;
const CW = 5000;
const CH = 1024;

export default function Map2() {
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
  const canvasRef2 = useRef(null);
  const requestAnimationRef = useRef(null);

  const navigator = useNavigate();

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
        navigator("/puzzle");
      }, 3000);
    }
  }, [characterMove]);

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
    // setCharacterFrame((prev) => (prev < FRAMES_LENGTH ? prev + 1 : 0));
    drawBg();
    drawBorder();
    if (boysAnimation) {
      drawBoys();
    }
    // if (!characterMove) {
    //   drawCharacter();
    // }
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

  // 사운드
  const sound = new Howl({
    // 2. sound라는 상수에 new Howl 생성자 생성하고 원하는 옵션을 추가한다.
    src: [bgm],
    // 2-1. 사용할 배경음 src에 추가
    loop: true,
    // 2-2. 반복재생값 true로 설정 (반복재생 on)
    volume: 0.3,
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
          ></Canvas>
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
