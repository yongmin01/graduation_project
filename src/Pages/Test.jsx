import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import Lottie from "react-lottie";
import girlLottie from "../sources/lottie/girl.json";
import useEffectSound from "../utils/EffectSound";
import bgm from "../sources/sound/Map1/map1_bgm.mp3";
import hornSound from "../sources/sound/Map1/hornSound.mp3";
import bg from "../sources/images/Map/map1/afterGame.png";
import flower1 from "../sources/images/Game/flower_pink.svg";
import card from "../sources/images/Game/puzzleQuiz/back.webp";
export default function Test() {
  const [isFlipped, setIsFlipped] = useState(false);
  const lottieOptions = {
    loop: true, // 반복재생
    autoplay: false, // 자동재생
    animationData: girlLottie, // 로띠 파일
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const LottieAnimation = () => {
    return (
      <Lottie
        options={lottieOptions}
        width={200}
        height={200}
        isStopped={false}
        ariaLabel={""}
        ariaRole={"img"}
      />
    );
  };

  return (
    <Panel>
      <Front onClick={() => setIsFlipped(true)} isFlipped={isFlipped}>
        <img src={flower1} />
      </Front>
      <Back isFlipped={isFlipped}>
        <img src={card} />
      </Back>
    </Panel>
  );
}

const Panel = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 100px auto;
`;

const Front = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  transition: all 2s;
  backface-visibility: hidden;
  background-color: yellow;
  z-index: 2;
  transform-origin: left center;
  ${({ isFlipped }) =>
    isFlipped &&
    css`
      z-index: 1;
      transform: rotateY(-180deg);
    `}
`;

const Back = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  transition: all 2s;
  backface-visibility: hidden;
  z-index: 1;
  transform: rotateY(0deg);
  transform-origin: left center;
  ${({ isFlipped }) =>
    isFlipped &&
    css`
      z-index: 2;
      transform: rotateY(180deg);
    `}
`;

// .panel:hover .front {
//   z-index: 1;
//   transform: rotateY(180deg);
// }

// .panel:hover .back {
//   z-index: 2;
//   transform: rotateY(0deg);
// }
