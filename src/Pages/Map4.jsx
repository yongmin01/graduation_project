import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import bgImage from "../sources/images/Map/map4/map4.png";
import dateFormatImg from "../sources/images/Map/dateFormat.png";
import characterImage from "../sources/images/Map/girl.png";
import loading1 from "../sources/images/plate.gif";
import boy1Image from "../sources/images/Map/map4/boy1.png";
import boy2Image from "../sources/images/Map/map4/boy2.png";
import milkBoxImage from "../sources/images/Map/map4/milkBox.png";
import milkBoxBorderImage from "../sources/images/Map/map4/milkBoxBorder.png";
import milkImage from "../sources/images/Map/map4/milk.png";
import cartImage from "../sources/images/Map/map4/cart.png";
import cartBorderImage from "../sources/images/Map/map4/cartBorder.png";
import plateImage from "../sources/images/Map/map4/plate.png";
import speakerSoundImage from "../sources/images/Map/map4/speakerSound.png";
import doorImage from "../sources/images/Map/map4/door.png";

export default function Map2() {
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

  const [pressedKey, setPressedKey] = useState(null);
  const [stop, setStop] = useState(false);

  const [background, setBackground] = useState({ x: 0, y: 0 });
  const [character, setCharacter] = useState({ x: 500, y: 1000 });
  const [round, setRound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [boy1, setBoy1] = useState({ x: 2000, y: 404 });
  const [boy2, setBoy2] = useState({ x: 2775, y: 404 });
  const [boysAnimation, setBoysAnimation] = useState(true);
  const [milkStatus, setmilkStatus] = useState(false);
  const [plateStatus, setPlateStatus] = useState(false);
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
      let x = e.clientX - context.canvas.offsetLeft;
      let y = e.clientY - context.canvas.offsetTop;

      //   우유상자 클릭 확인
      const milkBox = new Image();
      milkBox.src = milkBoxImage;
      if (
        x >=
          background.x +
            (2830 / 5000) * bg.width * (canvasRef.current.height / bg.height) &&
        y >= background.y + (560 / 1024) * canvasRef.current.height &&
        x <=
          background.x +
            (2830 / 5000) * bg.width * (canvasRef.current.height / bg.height) +
            (milkBox.width / 5000) *
              bg.width *
              (canvasRef.current.height / bg.height) &&
        y <=
          background.y +
            (560 / 1024) * canvasRef.current.height +
            (milkBox.height / 1024) * canvasRef.current.height
      ) {
        setmilkStatus(true);
      }

      //   급식차 클릭 확인
      const mealCart = new Image();
      mealCart.src = cartImage;
      if (
        x >=
          background.x +
            (3390 / 5000) * bg.width * (canvasRef.current.height / bg.height) &&
        y >= background.y + (382 / 1024) * canvasRef.current.height &&
        x <=
          background.x +
            (3390 / 5000) * bg.width * (canvasRef.current.height / bg.height) +
            (mealCart.width / 5000) *
              bg.width *
              (canvasRef.current.height / bg.height) &&
        y <=
          background.y +
            (382 / 1024) * canvasRef.current.height +
            (mealCart.height / 1024) * canvasRef.current.height
      ) {
        setPlateStatus(true);
      }
      // 문 클릭 확인
      const door = new Image();
      door.src = doorImage;
      if (
        x >=
          background.x +
            (4511 / 5000) * bg.width * (canvasRef.current.height / bg.height) &&
        y >= background.y + (122 / 1024) * canvasRef.current.height &&
        x <=
          background.x +
            (4511 / 5000) * bg.width * (canvasRef.current.height / bg.height) +
            (door.width / 5000) *
              bg.width *
              (canvasRef.current.height / bg.height) &&
        y <=
          background.y +
            (122 / 1024) * canvasRef.current.height +
            (door.height / 1024) * canvasRef.current.height
      ) {
        setRound(true);
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
    if (round) {
      cancelAnimationFrame(requestAnimationRef.current);

      setLoading(true);
      setInterval(() => {
        navigator("/speech");
      }, 5000);
    }
  }, [round]);

  useEffect(() => {
    console.log(background.x);
  }, [background]);
  // 렌더링 함수
  const render = () => {
    if (!canvasRef.current) return;
    drawBg();
    if (boysAnimation) {
      drawBoys();
    }
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

    // 우유박스 그리기
    const milkBox = new Image();
    milkBox.src = milkBoxImage;

    milkBox.onload = () => {
      context.drawImage(
        milkBox,
        background.x +
          (2830 / 5000) * bg.width * (canvasRef.current.height / bg.height),
        background.y + (560 / 1024) * canvasRef.current.height,
        (milkBox.width / 5000) *
          bg.width *
          (canvasRef.current.height / bg.height),
        (milkBox.height / 1024) * canvasRef.current.height
      );
    };

    // 우유 말풍선 그리기
    const milk = new Image();
    milk.src = milkImage;
    if (milkStatus) {
      milk.onload = () => {
        context.drawImage(
          milk,
          background.x +
            (3001 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (358 / 1024) * canvasRef.current.height,
          (milk.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (milk.height / 1024) * canvasRef.current.height
        );
      };
    }

    // 우유 박스 테두리 그리기
    const milkBoxBorder = new Image();
    milkBoxBorder.src = milkBoxBorderImage;
    if (!milkStatus) {
      milkBoxBorder.onload = () => {
        context.drawImage(
          milkBoxBorder,
          background.x +
            (2814 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (540 / 1024) * canvasRef.current.height,
          (milkBoxBorder.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (milkBoxBorder.height / 1024) * canvasRef.current.height
        );
      };
    }

    // 급식차 그리기
    const cart = new Image();
    cart.src = cartImage;

    cart.onload = () => {
      context.drawImage(
        cart,
        background.x +
          (3390 / 5000) * bg.width * (canvasRef.current.height / bg.height),
        background.y + (382 / 1024) * canvasRef.current.height,
        (cart.width / 5000) * bg.width * (canvasRef.current.height / bg.height),
        (cart.height / 1024) * canvasRef.current.height
      );
    };
    // 급식차 테두리 그리기
    const cartBorder = new Image();
    cartBorder.src = cartBorderImage;
    if (!plateStatus) {
      cartBorder.onload = () => {
        context.drawImage(
          cartBorder,
          background.x +
            (3335 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (327 / 1024) * canvasRef.current.height,
          (cartBorder.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (cartBorder.height / 1024) * canvasRef.current.height
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
          background.x +
            (3437 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          0,
          (plate.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (plate.height / 1024) * canvasRef.current.height
        );
      };
    }

    // 집 그리기
    const door = new Image();
    door.src = doorImage;

    door.onload = () => {
      context.drawImage(
        door,
        background.x +
          (4511 / 5000) * bg.width * (canvasRef.current.height / bg.height),
        background.y + (122 / 1024) * canvasRef.current.height,
        (door.width / 5000) * bg.width * (canvasRef.current.height / bg.height),
        (door.height / 1024) * canvasRef.current.height
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

  const drawBoys = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const boy1mg = new Image();
    boy1mg.src = boy1Image;

    const boy2Img = new Image();
    boy2Img.src = boy2Image;

    const test = new Image();
    test.src = loading1;

    boy1mg.onload = () => {
      if (
        background.x <
        (-1595 / 5000) * bg.width * (canvasRef.current.height / bg.height)
      ) {
        setStop(true);
        context.drawImage(
          boy1mg,
          boy1.x,
          background.y + (404 / 1024) * canvasRef.current.height,
          (boy1mg.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (boy1mg.height / 1024) * canvasRef.current.height
        );
        context.drawImage(
          boy2Img,
          boy2.x,
          background.y + (404 / 1024) * canvasRef.current.height,
          (boy2Img.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (boy2Img.height / 1024) * canvasRef.current.height
        );

        if (
          boy2.x +
            (boy2Img.width / 5000) *
              bg.width *
              (canvasRef.current.height / bg.height) <=
          0
        ) {
          setStop(false);
          setBoysAnimation(false);
        }
        setBoy1({ ...boy1, x: boy1.x - 6 });
        setBoy2({ ...boy2, x: boy2.x - 7 });
      }
    };
  };

  const handleMove = () => {
    switch (pressedKey) {
      case "ArrowLeft":
        if (background.x < 0) {
          if (stop === true) {
            setBackground({ ...background });
          } else {
            setBackground({ ...background, x: background.x + 5 });
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
            setBackground({ ...background, x: background.x - 5 });
          }
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
