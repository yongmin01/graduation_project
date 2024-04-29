import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Howl } from "howler";
import useEffectSound from "../utils/EffectSound";
import bgm from "../sources/sound/Map4/map4_bgm.mp3";

import frameBgImage from "../sources/images/Map/map4/frameBg.webp";
import panelBgImage from "../sources/images/Map/map4/panelBg.webp";

import get0Diary from "../sources/images/Map/dateFormat.svg";
import get1Diary from "../sources/images/Map/get1Diary.svg";
import get2Diary from "../sources/images/Map/get2Diary.svg";
import get3Diary from "../sources/images/Map/get3Diary.svg";

import clickImage from "../sources/images/Map/click.png";
import dateFormatImg from "../sources/images/Map/dateFormat.svg";
import characterImage from "../sources/images/Map/girl/girl.png";
import characterImage2 from "../sources/images/Map/boy/boy.png";
import frameBorderImage from "../sources/images/Map/map4/frameBorder.png";
import nintendoBorderImage from "../sources/images/Map/map4/nintendoBorder.png";
import speechbubbleImage from "../sources/images/Map/map4/game.png";
import noteBorderImage from "../sources/images/Map/map4/noteBorder.png";
import practiceNoteImage from "../sources/images/Map/map4/practiceNote.png";

import { CharacterMoveArrGirl } from "../utils/CharacterMoveArr";
import { CharacterMoveArrBoy } from "../utils/CharacterMoveArr";

import Lottie from "react-lottie";
import girlLottie from "../sources/lottie/girl.json";
import boyLottie from "../sources/lottie/boy.json";

const FRAMES_LENGTH = 40;
const CW = 5000;
const CH = 1024;

export default function Map4() {
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
  const requestAnimationRef = useRef(null);

  const navigator = useNavigate();

  const [pressedKey, setPressedKey] = useState(null);
  const [stop, setStop] = useState(false);

  const [background, setBackground] = useState({ x: 0, y: 0 });
  const bg = new Image();
  bg.src = frameBgImage;

  const [showBorder, setShowBorder] = useState(true);

  const [loading, setLoading] = useState(false);

  const characterCoor = { x: 188 / CW, y: 498 / CH };

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
  const [characterMove, setCharacterMove] = useState(0);
  const handleAnimation = () => {
    setCharacterMove(2);
  };

  const [frameStatus, setFrameStatus] = useState(true);
  const frameBorderSize = {
    x: (428 / CW) * val,
    y: (342 / CH) * canvasHeight,
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
    y: (284 / CH) * canvasHeight,
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
  const clickCoor1 = { x: (2048 / CW) * val, y: (583 / CH) * canvasHeight };
  const clickCoor2 = { x: (2816 / CW) * val, y: (260 / CH) * canvasHeight };

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

    // 액자 클릭 확인
    if (
      x >= background.x + frameBorderCoor.x &&
      y >= frameBorderCoor.y &&
      x <= background.x + (frameBorderCoor.x + frameBorderSize.w) &&
      y <= frameBorderCoor.y + frameBorderSize.h
    ) {
      alert("frame clicked");
      setFrameStatus(false);
    }
    // 닌텐도 클릭 확인
    if (
      x >= background.x + nintendoBorderCoor.x &&
      y >= nintendoBorderCoor.y &&
      x <= background.x + (nintendoBorderCoor.x + nintendoBorderSize.w) &&
      y <= nintendoBorderCoor.y + nintendoBorderSize.h
    ) {
      setNintendoStatus(true);
    }
    // 악보 클릭 확인
    if (
      x >= background.x + noteBorderCoor.x &&
      y >= noteBorderCoor.y &&
      x <= background.x + (noteBorderCoor.x + noteBorderSize.w) &&
      y <= noteBorderCoor.y + noteBorderSize.h
    ) {
      setNoteStatus(true);
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

      // setLoading(true);
      setTimeout(() => {
        navigator("/npc4");
      }, 1000);
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
    if (frameStatus) {
      bg.src = frameBgImage;
    } else {
      bg.src = panelBgImage;
    }

    bg.onload = () => {
      context.drawImage(bg, background.x, background.y, val, canvasHeight);
    };

    // 게임 말풍선 그리기
    const gamesppechbubble = new Image();
    gamesppechbubble.src = speechbubbleImage;

    if (nintendoStatus) {
      gamesppechbubble.onload = () => {
        context.drawImage(
          gamesppechbubble,
          background.x + gameSpeechBubbleCoor.x,
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
          background.x + practiceNoteCoor.x,
          practiceNoteCoor.y,
          practiceNoteSize.w,
          practiceNoteSize.h
        );
      };
    }

    const click = new Image();
    click.src = clickImage;

    click.onload = () => {
      if (!nintendoStatus) {
        context.drawImage(
          click,
          background.x + clickCoor1.x,
          clickCoor1.y,
          clickSize.w,
          clickSize.h
        );
      }
      if (!noteStatus) {
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

    // 액자 테두리 그리기
    const frameBorder = new Image();
    frameBorder.src = frameBorderImage;
    frameBorder.onload = () => {
      if (frameStatus && showBorder) {
        context.drawImage(
          frameBorder,
          background.x + frameBorderCoor.x,
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
      if (!nintendoStatus && showBorder) {
        context.drawImage(
          nintendoBorder,
          background.x + nintendoBorderCoor.x,
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
      if (!noteStatus && showBorder) {
        context.drawImage(
          noteBorder,
          background.x + noteBorderCoor.x,
          noteBorderCoor.y,
          noteBorderSize.w,
          noteBorderSize.h
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

  // 캐릭터 이동
  const v = 3;
  const handleMove = () => {
    switch (pressedKey) {
      case "ArrowLeft":
        if (background.x < 0) {
          setBackground({ ...background, x: background.x + v });
        }
        return;
      case "ArrowRight":
        if (
          background.x + bg.width * (canvasRef.current.height / bg.height) >
          canvasRef.current.width
        ) {
          setBackground({ ...background, x: background.x - v });
        } else {
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
    volume: 0.5,
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
      {
        // loading ? (
        //   <Loading>
        //     <LoadingImg src={loading1} />
        //   </Loading>
        // ) :
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
      }
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
    transform:  translateX(250px);
    opacity: 100%;
  }
  100% {
    transform:  translateX(300px);
    opacity: 0;
  }
  
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
