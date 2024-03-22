import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import bgImage from "../sources/images/Map/map3/map3.png";
import dateFormatImg from "../sources/images/Map/dateFormat.png";
import characterImage from "../sources/images/Map/girl.png";
import loading1 from "../sources/images/icettaeng.gif";
import chickManBorderImage from "../sources/images/Map/map3/chickManBorder.png";
import chickImage from "../sources/images/Map/map3/chick.png";
import moneyImage from "../sources/images/Map/map3/money.png";
import lampOffImage from "../sources/images/Map/map3/lampOff.png";
import lampOnImage from "../sources/images/Map/map3/lampOn.png";
import shopImage from "../sources/images/Map/map3/shop.png";
import shopBorderImage from "../sources/images/Map/map3/shopBorder.png";
import sugarSnackImage from "../sources/images/Map/map3/sugarSnack.png";
import busImage from "../sources/images/Map/map3/bus.png";
import snack1Image from "../sources/images/Map/map3/snack1.png";
import snack2Image from "../sources/images/Map/map3/snack2.png";
import houseImage from "../sources/images/Map/map3/house.png";

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
  const [background, setBackground] = useState({ x: 0, y: 0 });
  const [character, setCharacter] = useState({ x: 500, y: 1000 });
  const [round, setRound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lamp1Status, setLamp1Status] = useState(false);
  const [lamp2Status, setLamp2Status] = useState(false);
  const [chickStatus, setChickStatus] = useState(false);
  const [sugarSnackStatus, setSugarSnackStatus] = useState(false);
  const [bus, setBus] = useState({ x: 3143, y: 374 });
  const [busAnimation, setBusAnimation] = useState(true);
  const [snackStatus, setSnackStatus] = useState(false);
  const [stop, setStop] = useState(false);
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

      // 병아리 아저씨 클릭 확인
      const chickMan = new Image();
      chickMan.src = chickManBorderImage;
      if (
        x >=
          background.x +
            (687 / 5000) * bg.width * (canvasRef.current.height / bg.height) &&
        y >= background.y + (396 / 1024) * canvasRef.current.height &&
        x <=
          background.x +
            (687 / 5000) * bg.width * (canvasRef.current.height / bg.height) +
            (chickMan.width / 5000) *
              bg.width *
              (canvasRef.current.height / bg.height) &&
        y <=
          background.y +
            (396 / 1024) * canvasRef.current.height +
            (chickMan.height / 1024) * canvasRef.current.height
      ) {
        setChickStatus(true);
      }

      // 포장마차 클릭 확인
      const shop = new Image();
      shop.src = shopImage;
      if (
        x >=
          background.x +
            (1643 / 5000) * bg.width * (canvasRef.current.height / bg.height) &&
        y >= background.y + (264 / 1024) * canvasRef.current.height &&
        x <=
          background.x +
            (1643 / 5000) * bg.width * (canvasRef.current.height / bg.height) +
            (shop.width / 5000) *
              bg.width *
              (canvasRef.current.height / bg.height) &&
        y <=
          background.y +
            (264 / 1024) * canvasRef.current.height +
            (shop.height / 1024) * canvasRef.current.height
      ) {
        setSnackStatus(true);
      }
      // 집 클릭 확인
      const house = new Image();
      house.src = houseImage;
      if (
        x >=
          background.x +
            (4542 / 5000) * bg.width * (canvasRef.current.height / bg.height) &&
        y >= background.y + (410 / 1024) * canvasRef.current.height &&
        x <=
          background.x +
            (4542 / 5000) * bg.width * (canvasRef.current.height / bg.height) +
            (house.width / 5000) *
              bg.width *
              (canvasRef.current.height / bg.height) &&
        y <=
          background.y +
            (410 / 1024) * canvasRef.current.height +
            (house.height / 1024) * canvasRef.current.height
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

  // 램프 켜기
  useEffect(() => {
    if (
      background.x <
      (-200 / 5000) * bg.width * (canvasRef.current.height / bg.height)
    ) {
      setLamp1Status(true);
    }
    if (
      background.x <
      (-3000 / 5000) * bg.width * (canvasRef.current.height / bg.height)
    ) {
      setLamp2Status(true);
    }
  }, [background]);

  // 달고나 보이기
  useEffect(() => {
    if (
      background.x <
      (-1300 / 5000) * bg.width * (canvasRef.current.height / bg.height)
    ) {
      setSugarSnackStatus(true);
    }
  }, [background]);

  // 렌더링 함수
  const render = () => {
    if (!canvasRef.current) return;
    drawBg();
    if (busAnimation) {
      drawBus();
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

    // 램프 그리기
    let lamp1 = lampOn(lamp1Status);
    let lamp2 = lampOn(lamp2Status);
    lamp1.onload = () => {
      context.drawImage(
        lamp1,
        background.x +
          (1156 / 5000) * bg.width * (canvasRef.current.height / bg.height),
        background.y + (276 / 1024) * canvasRef.current.height,
        (lamp1.width / 5000) *
          bg.width *
          (canvasRef.current.height / bg.height),
        (lamp1.height / 1024) * canvasRef.current.height
      );
    };
    lamp2.onload = () => {
      context.drawImage(
        lamp2,
        background.x +
          (3573 / 5000) * bg.width * (canvasRef.current.height / bg.height),
        background.y + (282 / 1024) * canvasRef.current.height,
        (lamp2.width / 5000) *
          bg.width *
          (canvasRef.current.height / bg.height),
        (lamp2.height / 1024) * canvasRef.current.height
      );
    };

    // 병아리 아저씨 테두리 그리기
    const chickManBorder = new Image();
    chickManBorder.src = chickManBorderImage;
    if (!chickStatus) {
      chickManBorder.onload = () => {
        context.drawImage(
          chickManBorder,
          background.x +
            (687 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (396 / 1024) * canvasRef.current.height,
          (chickManBorder.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (chickManBorder.height / 1024) * canvasRef.current.height
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
          background.x +
            (874 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (276 / 1024) * canvasRef.current.height,
          (money.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (money.height / 1024) * canvasRef.current.height
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
          background.x +
            (916 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (548 / 1024) * canvasRef.current.height,
          (chick.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (chick.height / 1024) * canvasRef.current.height
        );
      }
    };
    // 포장마차 그리기
    const shop = new Image();
    shop.src = shopImage;

    shop.onload = () => {
      context.drawImage(
        shop,
        background.x +
          (1643 / 5000) * bg.width * (canvasRef.current.height / bg.height),
        background.y + (288 / 1024) * canvasRef.current.height,
        (shop.width / 5000) * bg.width * (canvasRef.current.height / bg.height),
        (shop.height / 1024) * canvasRef.current.height
      );
    };

    // 포장마차 테두리 그리기
    const shopBorder = new Image();
    shopBorder.src = shopBorderImage;
    if (!snackStatus) {
      shopBorder.onload = () => {
        context.drawImage(
          shopBorder,
          background.x +
            (1643 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (288 / 1024) * canvasRef.current.height,
          (shopBorder.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (shopBorder.height / 1024) * canvasRef.current.height
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
          background.x +
            (1591 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (20 / 1024) * canvasRef.current.height,
          (snack1.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (snack1.height / 1024) * canvasRef.current.height
        );
      };
      snack2.onload = () => {
        context.drawImage(
          snack2,
          background.x +
            (1916 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (52 / 1024) * canvasRef.current.height,
          (snack2.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (snack2.height / 1024) * canvasRef.current.height
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
          background.x +
            (2230 / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (312 / 1024) * canvasRef.current.height,
          (sugarSnack.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (sugarSnack.height / 1024) * canvasRef.current.height
        );
      }
    };

    // 집 그리기
    const house = new Image();
    house.src = houseImage;

    house.onload = () => {
      context.drawImage(
        house,
        background.x +
          (4542 / 5000) * bg.width * (canvasRef.current.height / bg.height),
        background.y + (410 / 1024) * canvasRef.current.height,
        (house.width / 5000) *
          bg.width *
          (canvasRef.current.height / bg.height),
        (house.height / 1024) * canvasRef.current.height
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

  const lampOn = (lampStatus) => {
    const lamp = new Image();
    if (lampStatus) lamp.src = lampOnImage;
    else lamp.src = lampOffImage;
    return lamp;
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

  const drawBus = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const busImg = new Image();
    busImg.src = busImage;

    busImg.onload = () => {
      if (
        background.x <
        (-2000 / 5000) * bg.width * (canvasRef.current.height / bg.height)
      ) {
        setStop(true);
        context.drawImage(
          busImg,
          background.x +
            (bus.x / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (bus.y / 1024) * canvasRef.current.height,
          (busImg.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (busImg.height / 1024) * canvasRef.current.height
        );

        if (
          background.x +
            (bus.x / 5000) * bg.width * (canvasRef.current.height / bg.height) >
          canvas.width
        ) {
          console.log("fkasjd");
          setBusAnimation(false);
          setStop(false);
        }
        setBus({ ...bus, x: bus.x + 5 });
      } else {
        context.drawImage(
          busImg,
          background.x +
            (bus.x / 5000) * bg.width * (canvasRef.current.height / bg.height),
          background.y + (bus.y / 1024) * canvasRef.current.height,
          (busImg.width / 5000) *
            bg.width *
            (canvasRef.current.height / bg.height),
          (busImg.height / 1024) * canvasRef.current.height
        );
      }
    };
  };
  const handleMove = () => {
    switch (pressedKey) {
      case "ArrowLeft":
        if (background.x < 0) {
          if (stop) {
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
