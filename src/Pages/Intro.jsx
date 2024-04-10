import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

export default function Intro() {
  const intro = useRef();

  const playIntro = () => {
    if (intro.current) {
      intro.current.play();
    }
  };
  const navigator = useNavigate();
  const goToTutorial = () => {
    setInterval(() => {
      navigator("/tutorial");
    }, 1000);
  };
  return (
    <Wrapper>
      <IntroVideo>
        <Video ref={intro} onClick={playIntro} onEnded={goToTutorial}>
          <source src="/videos/introWtitle.mp4" type="video/mp4" />
        </Video>
      </IntroVideo>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const IntroVideo = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
