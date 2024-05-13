import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// 사운드
import { Howl } from "howler";
import useEffectSound from "../utils/EffectSound";
import bgm from "../sources/sound/Map4/map4_bgm.mp3";
import marioSound from "../sources/sound/Map4/marioSound.mp3";
import clickSound from "../sources/sound/clickSound.mp3";

// 이미지
import loading1 from "../sources/images/icettaeng.gif";

import frameBgImage from "../sources/images/Map/map4/frameBg.webp";
import panelBgImage from "../sources/images/Map/map4/panelBg.webp";

import dateFormatImg from "../sources/images/Map/dateFormat4.svg";
import diaryImg from "../sources/images/diary.svg";
import diaryXImg from "../sources/images/diaryX.svg";

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
  const [diaries, setDiaries] = useState([]);
  const totalDiary = JSON.parse(localStorage.getItem("totalDiary"));
  useEffect(() => {
    const temp = [];
    if (totalDiary) {
      for (let i = 1; i < totalDiary.length; i++) {
        if (totalDiary[i]) {
          console.log("pushed O");
          temp.push(diaryImg);
        } else {
          console.log("pushsedX");
          temp.push(diaryXImg);
        }
      }
      setDiaries(temp);
    }
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
  // const soundStop = () => sound.unload();

  useEffect(() => {
    const sound = new Howl({
      src: [bgm],
      loop: true,
      volume: 0.6,
      preload: true,
    });
    sound.play();
    sound.on("play", () => {});
    return () => {
      sound.unload();
    };
  }, []);

  // const marioEffect = useEffectSound(marioSound, 1);
  useEffect(() => {
    const marioEffect = new Howl({
      src: [marioSound],
      volume: 1,
    });
    if (nintendoStatus) {
      marioEffect.play();
    }
    return () => {
      marioEffect.unload();
    };
  }, [nintendoStatus]);

  // const clickEffect = useEffectSound(clickSound, 1);
  useEffect(() => {
    const clickEffect = new Howl({
      src: [clickSound],
      volume: 1,
    });
    if (!frameStatus) {
      clickEffect.play();
    }
    return () => {
      clickEffect.unload();
    };
  }, [frameStatus]);
  useEffect(() => {
    const clickEffect = new Howl({
      src: [clickSound],
      volume: 1,
    });
    if (noteStatus) {
      clickEffect.play();
    }
    return () => {
      clickEffect.unload();
    };
  }, [noteStatus]);

  return (
    <MapContainer>
      {pressedKey ? null : (
        <Date>
          <img src={dateFormatImg} style={{ height: "11vh" }} />
          <Diaries>
            {diaries.map((diary, index) => (
              <Diary key={index} src={diary} />
            ))}
          </Diaries>
        </Date>
      )}
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
const Date = styled.div`
  width: min-content;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
`;
const Diaries = styled.div`
  position: absolute;
  left: 56%;
  display: flex;
  gap: 0.5vw;
  margin-top: 0.7%;
`;
const Diary = styled.img`
  height: 8vh;
  height: ${({ src }) => (src === "diaryXImg" ? "9.1vh" : "8vh")};
  z-index: 20;
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
