import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import bg from "../sources/images/Outro/outroBg.webp";
import cover from "../sources/images/Outro/diaryCover.png";

export default function Intro() {
  const introRef = useRef(null);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    if (!videoPlayed) {
      setVideoPlayed(true);
      if (introRef.current) {
        introRef.current.play();
      }
      introRef.current.addEventListener("ended", () => {
        navigate("/tutorial");
      });
    }
  };

  return (
    <Container videoPlayed={videoPlayed}>
      <DiaryDiv>
        <Diary src={cover} />
        <Btn onClick={handleStart}>시작하기</Btn>
      </DiaryDiv>

      <Video ref={introRef} videoPlayed={videoPlayed}>
        <source src="./videos/intro.mp4" type="video/mp4" />
        비디오 태그를 지원하지 않는 브라우저입니다.
      </Video>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: ${({ videoPlayed }) =>
    videoPlayed ? "none" : `url(${bg})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${({ videoPlayed }) => (videoPlayed ? "black" : "#89502d")};
`;

const DiaryDiv = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.5vh;
  margin: 0 auto;
  padding-top: 17vh;
`;
const Diary = styled.img`
  height: 55.9vh;
  margin-left: 3.5vw;
`;
const Btn = styled.button`
  width: 36.6vw;
  height: 9.5vh;
  border-radius: 30px;
  border: 3px solid #ffe250;
  background: #fff7cd;
  color: #7c4622;
  text-align: center;
  font-family: "UhBee jung";
  font-size: 3.8vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1vh;
`;

const Video = styled.video`
  width: 100vw;
  display: ${({ videoPlayed }) => (videoPlayed ? "flex" : "none")};
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
`;
