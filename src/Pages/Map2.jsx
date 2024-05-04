import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// 사운드
import { Howl } from "howler";
import useEffectSound from "../utils/EffectSound";
import bgm from "../sources/sound/Map2/map2_bgm.mp3";

// 이미지
import loading1 from "../sources/images/plate.gif";

import bgImage from "../sources/images/Map/map2/map2.webp";

import get0Diary from "../sources/images/Map/dateFormat.svg";
import get1Diary from "../sources/images/Map/get1Diary.svg";
import get2Diary from "../sources/images/Map/get2Diary.svg";
import get3Diary from "../sources/images/Map/get3Diary.svg";

import clickImage from "../sources/images/Map/click.png";
import letterImage from "../sources/images/Map/map2/letter.png";
import boy1Image from "../sources/images/Map/map2/boy1.png";
import boy2Image from "../sources/images/Map/map2/boy2.png";
import milkBoxBorderImage from "../sources/images/Map/map2/milkBoxBorder.png";
import milkImage from "../sources/images/Map/map2/milk.png";
import cartBorderImage from "../sources/images/Map/map2/cartBorder.png";
import plateImage from "../sources/images/Map/map2/plate.png";
import speakerSoundImage from "../sources/images/Map/map2/speakerSound.png";

import girlImg from "../sources/images/Map/girl/girl.png";
import boyImg from "../sources/images/Map/boy/boy.png";
// 로티
import Lottie from "react-lottie";
import girlLottie from "../sources/lottie/girl.json";
import boyLottie from "../sources/lottie/boy.json";

export default function Map2() {
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
  const canvasHeight = windowSize.height;
  const ratio = canvasHeight / 1024;
  const val = 5000 * ratio;

  const character = [
    (188 / CW) * val,
    (498 / CH) * canvasHeight,
    (330 / CW) * val,
    (392 / CH) * canvasHeight,
  ];

  const [letterStatus, setLetterStatus] = useState(false);
  const letterSize = {
    w: (403 / CW) * val,
    h: (366 / CH) * canvasHeight,
  };
  const letterCoor = {
    x: (1731 / CW) * val,
    y: (318 / CH) * canvasHeight,
  };

  const [milkStatus, setmilkStatus] = useState(false);
  const milkBoxBorderSize = {
    w: (416 / CW) * val,
    h: (362 / CH) * canvasHeight,
  };
  const milkBoxBorderCoor = {
    x: (2814 / CW) * val,
    y: (540 / CH) * canvasHeight,
  };
  const milkCoor = { x: (3001 / CW) * val, y: (358 / CH) * canvasHeight };
  const milkSize = { w: (214 / CW) * val, h: (186 / CH) * canvasHeight };

  const [plateStatus, setPlateStatus] = useState(false);
  const cartBorderSize = { w: (778 / CW) * val, h: (615 / CH) * canvasHeight };
  const cartBorderCoor = { x: (3335 / CW) * val, y: (327 / CH) * canvasHeight };
  const plateSize = { w: (550 / CW) * val, h: (436 / CH) * canvasHeight };
  const plateCoor = (3437 / CW) * val;

  const boy1Size = { w: (341 / CW) * val, h: (472 / CH) * canvasHeight };
  const boy2Size = { w: (343 / CW) * val, h: (450 / CH) * canvasHeight };
  const boysStartPoint = (404 / CH) * canvasHeight;

  const clickSize = { w: (102 / CW) * val, h: (32 / CH) * canvasHeight };
  const clickCoor1 = { x: (2974 / CW) * val, y: (522 / CH) * canvasHeight };
  const clickCoor2 = { x: (3673 / CW) * val, y: (349 / CH) * canvasHeight };

  const canvasRef = useRef(null);

  const [background, setBackground] = useState(0);
  const [showBorder, setShowBorder] = useState(true);
  // 배경 그리기
  const drawBg = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const bg = new Image();
    bg.src = bgImage;

    bg.onload = () => {
      context.drawImage(bg, background, 0, val, canvasHeight);
    };

    // 편지 말풍선 그리기
    const letter = new Image();
    letter.src = letterImage;
    if (letterStatus) {
      letter.onload = () => {
        context.drawImage(
          letter,
          background + letterCoor.x,
          letterCoor.y,
          letterSize.w,
          letterSize.h
        );
      };
    }
    // 우유 말풍선 그리기
    const milk = new Image();
    milk.src = milkImage;
    if (milkStatus) {
      milk.onload = () => {
        context.drawImage(
          milk,
          background + milkCoor.x,
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
          background + plateCoor,
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
          background + clickCoor1.x,
          clickCoor1.y,
          clickSize.w,
          clickSize.h
        );
      }
      if (!plateStatus) {
        context.drawImage(
          click,
          background + clickCoor2.x,
          clickCoor2.y,
          clickSize.w,
          clickSize.h
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
          background + milkBoxBorderCoor.x,
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
          background + cartBorderCoor.x,
          cartBorderCoor.y,
          cartBorderSize.w,
          cartBorderSize.h
        );
      }
    };
  };

  const [boysAnimation, setBoysAnimation] = useState(true);
  const [boy1Coor, setBoy1Coor] = useState({ x: 2000, y: 404 });
  const [boy2Coor, setBoy2Coor] = useState({ x: 2775, y: 404 });

  // 뛰어가는 남자아이들 그리기
  const drawBoys = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const boy1mg = new Image();
    boy1mg.src = boy1Image;

    const boy2Img = new Image();
    boy2Img.src = boy2Image;

    boy1mg.onload = () => {
      if (background < (-1595 / 5000) * val) {
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

  // 캔버스 클릭 감지
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let x = e.clientX - context.canvas.offsetLeft;
    let y = e.clientY - context.canvas.offsetTop;

    //   우유상자 클릭 확인
    if (
      x >= background + milkBoxBorderCoor.x &&
      y >= milkBoxBorderCoor.y &&
      x <= background + milkBoxBorderCoor.x + milkBoxBorderSize.w &&
      y <= milkBoxBorderCoor.y + milkBoxBorderSize.h
    ) {
      setmilkStatus(true);
    }

    //   급식차 클릭 확인
    if (
      x >= background + cartBorderCoor.x &&
      y >= cartBorderCoor.y &&
      x <= background + (cartBorderCoor.x + cartBorderSize.w) &&
      y <= cartBorderCoor.y + cartBorderSize.h
    ) {
      setPlateStatus(true);
    }
  };

  // 편지 말풍선 보이기
  useEffect(() => {
    if (background < (-1000 / 5000) * val) {
      setLetterStatus(true);
    }
  }, [background]);

  useEffect(() => {
    if (showBorder) {
      setInterval(() => {
        setShowBorder((prev) => !prev);
      }, 500);
    }
  }, [showBorder]);

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
    drawBorder();
    if (boysAnimation) {
      drawBoys();
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
        navigator("/puzzle");
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
