import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import bgImage from "../sources/images/Map/map2/map2.png";
import characterImage from "../sources/images/Map/girl.png";
import frameImage from "../sources/images/Map/map2/frame.png";
import panelImage from "../sources/images/Map/map2/electricPanel.png";
import controllerImage from "../sources/images/Map/map2/controller.png";
import noteImage from "../sources/images/Map/map2/note.png";
import practiceNoteImage from "../sources/images/Map/map2/practiceNote.png";
import loading1 from "../sources/images/MP3.gif";
export default function Map2() {
  // 캔버스 크기 관련
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth * 2,
    height: window.innerHeight * 2,
  });
  const resizeHandler = useCallback(() => {
    setWindowSize({
      width: window.innerWidth * 2,
      height: window.innerHeight * 2,
    });
  }, []);
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      // 중복 이벤트 방지용 클린업
      window.removeEventListener("resize", resizeHandler);
    };
  });

  const [pressedKey, setPressedKey] = useState(null);
  const [background, setBackground] = useState({ x: 0, y: 0 });
  const [character, setCharacter] = useState({ x: 500, y: 1000 });
  const [loading, setLoading] = useState(false);
  const [panel, setPanel] = useState(false);
  const [noteClicked, setNoteClicked] = useState(false);
  const navigator = useNavigate();
  const canvasRef = useRef(null);
  const requestAnimationRef = useRef(null);
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
      let x = (e.clientX - context.canvas.offsetLeft) * 2;
      let y = (e.clientY - context.canvas.offsetTop) * 2;
      const frame = new Image();
      frame.src = frameImage;

      const note = new Image();
      note.src = noteImage;
      // 액자 클릭 확인
      if (
        x >=
          background.x +
            (281 / 5000) * bg.width * (canvasRef.current.height / bg.height) &&
        y >= background.y + (134 / 1024) * canvasRef.current.height &&
        x <=
          background.x +
            (281 / 5000) * bg.width * (canvasRef.current.height / bg.height) +
            (frame.width / 5000) *
              bg.width *
              (canvasRef.current.height / bg.height) &&
        y <=
          background.y +
            (134 / 1024) * canvasRef.current.height +
            (frame.height / 1024) * canvasRef.current.height
      ) {
        setPanel(true);
      }
      // 악보 클릭 확인
      if (
        x >=
          background.x +
            (2733 / 5000) * bg.width * (canvasRef.current.height / bg.height) &&
        x <=
          background.x +
            (2733 / 5000) * bg.width * (canvasRef.current.height / bg.height) +
            (note.width / 5000) *
              bg.width *
              (canvasRef.current.height / bg.height) &&
        y >= background.y + (276 / 1024) * canvasRef.current.height &&
        y <=
          background.y +
            (276 / 1024) * canvasRef.current.height +
            (note.height / 1024) * canvasRef.current.height
      ) {
        setNoteClicked(true);
      }
    };
    canvasRef.current.addEventListener("click", handleCanvasClick);
    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
      canvasRef.current.removeEventListener("click", handleCanvasClick);
    };
  });

  // 렌더링 함수
  const render = () => {
    if (!canvasRef.current) return;
    drawBg();
    drawCharacter();
    handleMove();
    requestAnimationRef.current = requestAnimationFrame(render);
  };

  // 배경 그리기
  const bg = new Image();
  bg.src = bgImage;

  const drawBg = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const bg = new Image();
    bg.src = bgImage;

    bg.onload = () => {
      context.drawImage(
        bg,
        background.x,
        background.y,
        bg.width * (canvasRef.current.height / bg.height),
        canvasRef.current.height
      );
    };

    // 액자 그리기
    let frame = framepanel();
    frame.onload = () => {
      context.drawImage(
        frame,
        background.x +
          (281 / 5000) * bg.width * (canvasRef.current.height / bg.height),
        background.y + (134 / 1024) * canvasRef.current.height,
        (frame.width / 5000) *
          bg.width *
          (canvasRef.current.height / bg.height),
        (frame.height / 1024) * canvasRef.current.height
      );
    };

    // 리모컨 그리기
    const controller = new Image();
    controller.src = controllerImage;
    controller.onClick = () => {
      console.log("controller clicked");
    };
    controller.onload = () => {
      context.drawImage(
        controller,
        background.x +
          (4484 / 5000) * bg.width * (canvasRef.current.height / bg.height),
        background.y + (724 / 1024) * canvasRef.current.height,
        (controller.width / 5000) *
          bg.width *
          (canvasRef.current.height / bg.height),
        (controller.height / 1024) * canvasRef.current.height
      );
    };

    // 악보 그리기
    const note = new Image();
    note.src = noteImage;
    note.onload = () => {
      context.drawImage(
        note,
        background.x +
          (2733 / 5000) * bg.width * (canvasRef.current.height / bg.height),
        background.y + (276 / 1024) * canvasRef.current.height,
        (note.width / 5000) * bg.width * (canvasRef.current.height / bg.height),
        (note.height / 1024) * canvasRef.current.height
      );
    };

    // 악보 확대 말풍선 그리기
    const practiceNote = new Image();
    practiceNote.src = practiceNoteImage;
    if (noteClicked) {
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
  };

  const framepanel = () => {
    const framepanel = new Image();
    if (panel) framepanel.src = panelImage;
    else framepanel.src = frameImage;
    return framepanel;
  };

  // 캐릭터 그리기
  const drawCharacter = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const characterImg = new Image();
    characterImg.src = characterImage;

    characterImg.onload = () => {
      context.drawImage(
        characterImg,
        character.x,
        character.y,
        characterImg.width * 1.1,
        characterImg.height * 1.1
      );
    };
  };

  const handleMove = () => {
    switch (pressedKey) {
      case "ArrowLeft":
        if (background.x < 0) {
          setBackground({ ...background, x: background.x + 10 });
        }
        return;
      case "ArrowRight":
        if (
          background.x + bg.width * (canvasRef.current.height / bg.height) >
          canvasRef.current.width
        ) {
          setBackground({ ...background, x: background.x - 10 });
        } else {
        }
        return;
    }
  };
  useEffect(() => {
    if (
      background.x <
        -(
          bg.width * (canvasRef.current.height / bg.height) -
          windowSize.width
        ) &&
      canvasRef.current
    ) {
      cancelAnimationFrame(requestAnimationRef.current);
      setLoading(true);
      setInterval(() => {
        navigator("/speech");
      }, 5000);
    }
  }, [background]);
  return (
    <>
      {loading ? (
        <Loading>
          <LoadingImg src={loading1} />
        </Loading>
      ) : (
        <Canvas
          ref={canvasRef}
          width={windowSize.width}
          height={windowSize.height}
          tabIndex={0}
        ></Canvas>
      )}
    </>
  );
}

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
