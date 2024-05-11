import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// 사운드
import { Howl } from "howler";
import useEffectSound from "../utils/EffectSound";
import bgm from "../sources/sound/Map4/map4_bgm.mp3";

// 이미지
import loading1 from "../sources/images/icettaeng.gif";

import frameBgImage from "../sources/images/Map/map4/frameBg.webp";
import panelBgImage from "../sources/images/Map/map4/panelBg.webp";

import get0Diary from "../sources/images/Map/dateFormat.svg";
import get1Diary from "../sources/images/Map/get1Diary.svg";
import get2Diary from "../sources/images/Map/get2Diary.svg";
import get3Diary from "../sources/images/Map/get3Diary.svg";

import clickImage from "../sources/images/Map/click.png";
import frameBorderImage from "../sources/images/Map/map4/frameBorder.png";
import nintendoBorderImage from "../sources/images/Map/map4/nintendoBorder.png";
import speechbubbleImage from "../sources/images/Map/map4/game.png";
import noteBorderImage from "../sources/images/Map/map4/noteBorder.png";
import practiceNoteImage from "../sources/images/Map/map4/practiceNote.png";

import girlImg from "../sources/images/Map/girl/girl.png";
import boyImg from "../sources/images/Map/boy/boy.png";
// 로티
import Lottie from "react-lottie";
import girlLottie from "../sources/lottie/girl.json";
import boyLottie from "../sources/lottie/boy.json";

export default function Map4() {
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
    if (totalDiary.length === 1) {
      setGetTotalDiary(get0Diary);
    } else if (totalDiary.length === 2) {
      setGetTotalDiary(get1Diary);
    } else if (totalDiary.length === 3) {
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
  const [ratio, setRatio] = useState(canvasHeight / 1024);
  const [val, setVal] = useState(5000 * ratio);

  const character = [
    (162 / CW) * val,
    (474 / CH) * canvasHeight,
    (368 / CW) * val,
    (442 / CH) * canvasHeight,
  ];

  const [frameStatus, setFrameStatus] = useState(true);
  const frameBorderSize = {
    w: (428 / CW) * val,
    h: (342 / CH) * canvasHeight,
  };
  const frameBorderCoor = {
    x: (257 / CW) * val,
    y: (142 / CH) * canvasHeight,
  };

  const [nintendoStatus, setNintendoStatus] = useState(false);
  const nintendoBorderSize = {
    w: (246 / CW) * val,
    h: (246 / CH) * canvasHeight,
  };
  const nintendoBorderCoor = {
    x: (1963 / CW) * val,
    y: (599 / CH) * canvasHeight,
  };

  const gameSpeechBubbleSize = {
    w: (638 / CW) * val,
    h: (608 / CH) * canvasHeight,
  };
  const gameSpeechBubbleCoor = {
    x: (1813 / CW) * val,
    y: (28 / CH) * canvasHeight,
  };

  const [noteStatus, setNoteStatus] = useState(false);
  const noteBorderSize = {
    w: (314 / CW) * val,
    h: (168 / CH) * canvasHeight,
  };
  const noteBorderCoor = {
    x: (2718 / CW) * val,
    y: (278 / CH) * canvasHeight,
  };

  const practiceNoteSize = {
    w: (642 / CW) * val,
    h: (442 / CH) * canvasHeight,
  };
  const practiceNoteCoor = {
    x: (3015 / CW) * val,
    y: (22 / CH) * canvasHeight,
  };

  const clickSize = { w: (102 / CW) * val, h: (32 / CH) * canvasHeight };
  const clickCoor0 = { x: (438 / CW) * val, y: (110 / CH) * canvasHeight };
  const clickCoor1 = { x: (2048 / CW) * val, y: (583 / CH) * canvasHeight };
  const clickCoor2 = { x: (2816 / CW) * val, y: (260 / CH) * canvasHeight };

  const canvasRef = useRef(null);

  const [background, setBackground] = useState(0);

  // 배경 그리기
  const drawBg = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const bg = new Image();
    if (frameStatus) {
      bg.src = frameBgImage;
    } else {
      bg.src = panelBgImage;
    }

    bg.onload = () => {
      context.drawImage(bg, background, 0, val, canvasHeight);
    };

    const click = new Image();
    click.src = clickImage;

    click.onload = () => {
      if (frameStatus) {
        context.drawImage(
          click,
          background + clickCoor0.x,
          clickCoor0.y,
          clickSize.w,
          clickSize.h
        );
      }
      if (!nintendoStatus) {
        context.drawImage(
          click,
          background + clickCoor1.x,
          clickCoor1.y,
          clickSize.w,
          clickSize.h
        );
      }
      if (!noteStatus) {
        context.drawImage(
          click,
          background + clickCoor2.x,
          clickCoor2.y,
          clickSize.w,
          clickSize.h
        );
      }
    };
    // 게임 말풍선 그리기
    const gamesppechbubble = new Image();
    gamesppechbubble.src = speechbubbleImage;

    if (nintendoStatus) {
      gamesppechbubble.onload = () => {
        context.drawImage(
          gamesppechbubble,
          background + gameSpeechBubbleCoor.x,
          gameSpeechBubbleCoor.y,
          gameSpeechBubbleSize.w,
          gameSpeechBubbleSize.h
        );
      };
    }

    // 악보 확대 말풍선 그리기
    const practiceNote = new Image();
    practiceNote.src = practiceNoteImage;
    if (noteStatus) {
      practiceNote.onload = () => {
        context.drawImage(
          practiceNote,
          background + practiceNoteCoor.x,
          practiceNoteCoor.y,
          practiceNoteSize.w,
          practiceNoteSize.h
        );
      };
    }
    // 액자 테두리 그리기
    const frameBorder = new Image();
    frameBorder.src = frameBorderImage;
    frameBorder.onload = () => {
      if (frameStatus) {
        context.drawImage(
          frameBorder,
          background + frameBorderCoor.x,
          frameBorderCoor.y,
          frameBorderSize.w,
          frameBorderSize.h
        );
      }
    };

    // 닌텐도 테두리 그리기
    const nintendoBorder = new Image();
    nintendoBorder.src = nintendoBorderImage;
    nintendoBorder.onload = () => {
      if (!nintendoStatus) {
        context.drawImage(
          nintendoBorder,
          background + nintendoBorderCoor.x,
          nintendoBorderCoor.y,
          nintendoBorderSize.w,
          nintendoBorderSize.h
        );
      }
    };

    // 악보 테두리 그리기
    const noteBorder = new Image();
    noteBorder.src = noteBorderImage;
    noteBorder.onload = () => {
      if (!noteStatus) {
        context.drawImage(
          noteBorder,
          background + noteBorderCoor.x,
          noteBorderCoor.y,
          noteBorderSize.w,
          noteBorderSize.h
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

    // 액자 클릭 확인
    if (
      x >= background + frameBorderCoor.x &&
      y >= frameBorderCoor.y &&
      x <= background + (frameBorderCoor.x + frameBorderSize.w) &&
      y <= frameBorderCoor.y + frameBorderSize.h
    ) {
      setFrameStatus(false);
    }
    // 닌텐도 클릭 확인
    if (
      x >= background + nintendoBorderCoor.x &&
      y >= nintendoBorderCoor.y &&
      x <= background + (nintendoBorderCoor.x + nintendoBorderSize.w) &&
      y <= nintendoBorderCoor.y + nintendoBorderSize.h
    ) {
      setNintendoStatus(true);
    }
    // 악보 클릭 확인
    if (
      x >= background + noteBorderCoor.x &&
      y >= noteBorderCoor.y &&
      x <= background + (noteBorderCoor.x + noteBorderSize.w) &&
      y <= noteBorderCoor.y + noteBorderSize.h
    ) {
      setNoteStatus(true);
    }
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
      setTimeout(() => {
        navigator("/npc4");
      }, 1000);
    }
  }, [characterMove]);

  // 사운드
  const sound = new Howl({
    // 2. sound라는 상수에 new Howl 생성자 생성하고 원하는 옵션을 추가한다.
    src: [bgm],
    // 2-1. 사용할 배경음 src에 추가
    loop: true,
    // 2-2. 반복재생값 true로 설정 (반복재생 on)
    volume: 0.6,
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
    <MapContainer>
      {pressedKey ? null : <Date src={getTotalDiary} />}
      {characterMove === 1 ? (
        <CharacterAtEnd
          src={characterImg}
          width={character[2]}
          onAnimationEnd={handleAnimation}
        />
      ) : null}
      {pressedKey && characterMove === 0 ? (
        <LottieWrapper>
          <Lottie
            options={lottieOptions}
            width={character[2]}
            isStopped={false}
            ariaLabel={""}
            ariaRole={"img"}
          />
        </LottieWrapper>
      ) : characterMove === 0 ? (
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
    transform:  translateX(450px);
    opacity: 100%;
  }
  100% {
    transform:  translateX(500px);
    opacity: 0;
  }
`;
const LottieWrapper = styled.div`
  position: absolute;
  top: 46.2vh;
  left: 36vw;
  z-index: 200;
`;
const Character = styled.img`
  position: absolute;
  top: 46.2vh;
  left: 36vw;
  z-index: 150;
`;
const CharacterAtEnd = styled.img`
  position: absolute;
  top: 46.2vh;
  left: 36vw;
  z-index: 150;
  animation: ${translate} 2.5s linear forwards;
  animation-delay: 2s;
`;
const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
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
