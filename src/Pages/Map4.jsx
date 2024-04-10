import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import frameBgImage from "../sources/images/Map/map4/frameBg.webp";
import panelBgImage from "../sources/images/Map/map4/panelBg.webp";
import clickImage from "../sources/images/Map/click.png";
import dateFormatImg from "../sources/images/Map/dateFormat.png";
import characterImage from "../sources/images/Map/girl/girl.png";
import frameBorderImage from "../sources/images/Map/map4/frameBorder.png";
import nintendoBorderImage from "../sources/images/Map/map4/nintendoBorder.png";
import speechbubbleImage from "../sources/images/Map/map4/game.png";
import noteBorderImage from "../sources/images/Map/map4/noteBorder.png";
import practiceNoteImage from "../sources/images/Map/map4/practiceNote.png";
import loading1 from "../sources/images/MP3.gif";

import CharacterMoveArr from "../utils/CharacterMoveArr";
const FRAMES_LENGTH = 40;
const CW = 5000;
const CH = 1024;

export default function Map4({ sex }) {
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
  bg.src = frameBgImage;

  const [characterFrame, setCharacterFrame] = useState(0);

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

  const character = [
    (688 / CW) * val,
    (498 / CH) * canvasHeight,
    (330 / CW) * val,
    (392 / CH) * canvasHeight,
  ];
  const characterSex = sex;

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

  const [noteStatus, setNoteStatus] = useState(false);
  const noteBorderSize = {
    w: (314 / CW) * val,
    h: (168 / CH) * canvasHeight,
  };
  const noteBorderCoor = {
    x: (2718 / CW) * val,
    y: (284 / CH) * canvasHeight,
  };

  const clickSize = { w: (102 / CW) * val, h: (32 / CH) * canvasHeight };
  const clickCoor1 = { x: (2048 / CW) * val, y: (583 / CH) * canvasHeight };
  const clickCoor2 = { x: (2816 / CW) * val, y: (260 / CH) * canvasHeight };

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
      navigator("/npc3");
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
          background.x +
            (1813 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (28 / 1024) * canvasRef.current.height,
          (gamesppechbubble.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (gamesppechbubble.height / 1024) * canvasRef.current.height
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
          background.x +
            (3015 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (22 / 1024) * canvasRef.current.height,
          (practiceNote.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (practiceNote.height / 1024) * canvasRef.current.height
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
          <Canvas
            ref={canvasRef}
            width={windowSize.width}
            height={windowSize.height}
            tabIndex={0}
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
const Character = styled.img`
  position: absolute;
  bottom: 13vh;
  left: 47vw;
  z-index: 100;
  animation: ${translate} 2.5s linear forwards;
  animation-delay: 2s;
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
