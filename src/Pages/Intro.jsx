import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

export default function Intro() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("intro");
  const intro = useRef();
  const title = useRef();

  const playTitle = () => {
    setCurrentVideo("title");
  };
  useEffect(() => {
    if (currentVideo === "title") {
      if (title.current) {
        title.current.play();
      }
    }
  }, [currentVideo]);
  const playIntro = () => {
    if (intro.current) {
      intro.current.play();
    }
  };
  const navigator = useNavigate();
  const goToTutorial = () => {
    setVideoEnded(true);
    setInterval(() => {
      navigator("/tutorial");
    }, 3000);
  };
  return (
    <Wrapper>
      <IntroVideo darken={videoEnded}>
        <Video ref={intro} onClick={playIntro} onEnded={goToTutorial}>
          <source src="/videos/introWtitle.mp4" type="video/mp4" />
        </Video>
      </IntroVideo>
    </Wrapper>
  );
}

const darkenAnimation = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
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
  transition: background-color 1s ease; /* 어두워지는 트랜지션 효과 */
  animation: ${({ darken }) =>
    darken &&
    css`
      ${darkenAnimation} 1s forwards
    `};
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
