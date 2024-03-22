import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import bgImage from "../sources/images/Map/map1/map1.png";
import characterImage from "../sources/images/Map/girl.png";
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

export default function Map({}) {
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
  const canvas2Ref = useRef(null);
  const requestAnimationRef = useRef(null);
  const navigator = useNavigate();

  const [background, setBackground] = useState({ x: 0, y: 0 });
  const [character, setCharacter] = useState({ x: 500, y: 950 });
  const [round, setRound] = useState(false);
  const [smogStop, setSmogStop] = useState(false);
  const [trafficLightStatus, setTrafficLightStatus] = useState("red");
  const [womanYPos, setWomanYPos] = useState(448);
  const [car, setCar] = useState({ x: 1600, y: 468 });
  const [loading, setLoading] = useState(false);
  // 캐릭터 이동 관련 state
  const [pressedKey, setPressedKey] = useState(null);
  const [stop, setStop] = useState(false);
  const [lightStatus, setLgithStatus] = useState("red");
  const [smogPos, setSmogPos] = useState(0);
  const bg = new Image();
  bg.src = bgImage;

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

      // 리모컨 클릭 확인
      const speaker = new Image();
      speaker.src = speakerImage;
      if (
        x >=
          background.x +
            (4693 / 5000) * bg.width * (canvasRef.current.height / bg.height) &&
        x <=
          background.x +
            (4693 / 5000) * bg.width * (canvasRef.current.height / bg.height) +
            (speaker.width / 5000) *
              bg.width *
              (canvasRef.current.height / bg.height) &&
        y >= background.y + (486 / 1024) * canvasRef.current.height &&
        y <=
          background.y +
            (486 / 1024) * canvasRef.current.height +
            (speaker.height / 1024) * canvasRef.current.height
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
      setInterval(() => {
        navigator("/music");
      }, 5000);
    }
  }, [round]);

  // 렌더링 함수
  const render = () => {
    // navigator 실행되면 canvasRef.current가 null이 되므로 이때는 함수 종료
    if (!canvasRef.current) return;
    drawBg();
    // drawSmog();
    drawCharacter();
    drawCar();
    setSmogPos(background.x);
    handleMove();
    requestAnimationRef.current = requestAnimationFrame(render);
  };

  // 배경 그리기
  const drawBg = () => {
    const bg = new Image();
    bg.src = bgImage;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    bg.onload = () => {
      context.drawImage(
        bg,
        background.x,
        background.y,
        bg.width * (canvasRef.current.height / bg.height),
        canvasRef.current.height
      );
    };

    // 연기 그리기
    // const smog1 = new Image();
    // smog1.src = smog1Img;

    // smog1.onload = () => {
    //   context.drawImage(
    //     smog1,
    //     background.x +
    //       (298 / 5000) * bg.width * (canvasRef.current.height / bg.height),
    //     background.y + (320 / 1024) * canvasRef.current.height,
    //     (smog1.width / 5000) *
    //       bg.width *
    //       (canvasRef.current.height / bg.height),
    //     (smog1.height / 1024) * canvasRef.current.height
    //   );
    // };

    // const smog2 = new Image();
    // smog2.src = smog2Img;

    // smog2.onload = () => {
    //   context.drawImage(
    //     smog2,
    //     background.x +
    //       (238 / 5000) * bg.width * (canvasRef.current.height / bg.height),
    //     background.y + (282 / 1024) * canvasRef.current.height,
    //     (smog2.width / 5000) *
    //       bg.width *
    //       (canvasRef.current.height / bg.height),
    //     (smog2.height / 1024) * canvasRef.current.height
    //   );
    // };

    // 신호등 그리기
    let trafficLight = trafficLightHandler();

    trafficLight.onload = () => {
      context.drawImage(
        trafficLight,
        background.x +
          (2366 / 5000) * bg.width * (canvasRef.current.height / bg.height),
        background.y + (370 / 1024) * canvasRef.current.height,
        (trafficLight.width / 5000) *
          bg.width *
          (canvasRef.current.height / bg.height),
        (trafficLight.height / 1024) * canvasRef.current.height
      );
    };

    // 녹색어머니 그리기
    let woman = womanHandler();
    woman.onload = () => {
      context.drawImage(
        woman,
        background.x +
          (3004 / 5000) * bg.width * (canvasRef.current.height / bg.height),
        background.y + (womanYPos / 1024) * canvasRef.current.height,
        (woman.width / 5000) *
          bg.width *
          (canvasRef.current.height / bg.height),
        (woman.height / 1024) * canvasRef.current.height
      );
    };

    // 날짜 그리기
    const date = new Image();
    date.src = dateFormatImg;
    if (!pressedKey) {
      date.onload = () => {
        context.drawImage(
          date,
          0,
          0,
          (date.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (date.height / 1024) * canvasRef.current.height
        );
      };
    }

    // 스피커 음표 애니메이션
    const notesImage = new Image();
    notesImage.src = notesImg;
  };

  const trafficLightHandler = () => {
    const trafficLight = new Image();
    if (trafficLightStatus === "green") trafficLight.src = greenlightImg;
    else trafficLight.src = redlightImg;
    return trafficLight;
  };

  const womanHandler = () => {
    const woman = new Image();
    if (womanYPos === 414) {
      woman.src = goWomanImg;
    } else woman.src = stopWomanImg;

    return woman;
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
        (300 / 5000) * bg.width * (canvasRef.current.height / bg.height),
        (500 / 1024) * canvasRef.current.height,
        (characterImg.width / 5000) *
          bg.width *
          (canvasRef.current.height / bg.height),
        (characterImg.height / 1024) * canvasRef.current.height
      );
    };
  };

  const drawCar = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const carImage = new Image();
    carImage.src = carImg;

    carImage.onload = () => {
      if (
        background.x <
        (-1500 / 5000) * bg.width * (canvasRef.current.height / bg.height)
      ) {
        setStop(true);
        context.drawImage(
          carImage,
          background.x +
            (2602 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          car.y,
          (carImage.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (carImage.height / 1024) * canvasRef.current.height
        );
        if (car.y > canvas.height) {
          setTrafficLightStatus("green");
          setWomanYPos(414);
          setStop(false);
        }
        setCar({ ...car, y: car.y + 2 });
      } else {
        context.drawImage(
          carImage,
          background.x +
            (2602 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (car.y / 1024) * canvasRef.current.height,
          (carImage.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (carImage.height / 1024) * canvasRef.current.height
        );
      }
    };
  };

  const [smogAni, setSmogAni] = useState(true);
  useEffect(() => {
    drawSmog();
  }, [smogAni]);
  const drawSmog = () => {
    const canvass = canvas2Ref.current;
    const contextt = canvass.getContext("2d");
    const smog1 = new Image();
    smog1.src = smog1Img;

    smog1.onload = () => {
      setTimeout(() => {
        contextt.drawImage(
          smog1,
          background.x + (298 / 5000) * bg.width * (canvass.height / bg.height),
          (320 / 1024) * canvass.height,
          (smog1.width / 5000) * bg.width * (canvass.height / bg.height),
          (smog1.height / 1024) * canvass.height
        );
      }, 500);
    };

    const smog2 = new Image();
    smog2.src = smog2Img;

    smog2.onload = () => {
      setTimeout(() => {
        contextt.drawImage(
          smog2,
          background.x + (238 / 5000) * bg.width * (canvass.height / bg.height),
          (282 / 1024) * canvass.height,
          (smog2.width / 5000) * bg.width * (canvass.height / bg.height),
          (smog2.height / 1024) * canvass.height
        );
      }, 1000);
    };
    setTimeout(() => {
      contextt.clearRect(0, 0, canvass.width, canvass.height);
      setSmogAni((current) => !current);
    }, 1500);
  };

  // 캐릭터 이동 속도
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
        if (
          background.x + bg.width * (canvasRef.current.height / bg.height) >
          canvasRef.current.width
        ) {
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
        <CanvasContainer>
          <Canvas
            ref={canvasRef}
            width={windowSize.width}
            height={windowSize.height}
            tabIndex={0}
          />
          <Canvas
            ref={canvas2Ref}
            width={windowSize.width}
            height={windowSize.height}
          />
        </CanvasContainer>
      )}
    </>
  );
}
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
