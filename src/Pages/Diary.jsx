import React, { useEffect, useState, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import bg from "../sources/images/Outro/outroBg.webp";

import cover from "../sources/images/Outro/diaryCover.webp";
import pageBack from "../sources/images/Outro/pageBack.png";

import gPage1 from "../sources/images/Outro/gPage1.png";
import gPage2 from "../sources/images/Outro/gPage2.png";
import gPage3 from "../sources/images/Outro/gPage3.png";
import bPage1 from "../sources/images/Outro/bPage1.png";
import bPage2 from "../sources/images/Outro/bPage2.png";
import bPage3 from "../sources/images/Outro/bPage3.png";

import gPage1_dirt from "../sources/images/Outro/gPage1_dirt.png";
import gPage2_dirt from "../sources/images/Outro/gPage2_dirt.png";
import gPage3_dirt from "../sources/images/Outro/gPage3_dirt.png";
import bPage1_dirt from "../sources/images/Outro/bPage1_dirt.png";
import bPage2_dirt from "../sources/images/Outro/bPage2_dirt.png";
import bPage3_dirt from "../sources/images/Outro/bPage3_dirt.png";

// 사운드
import { Howl, Howler } from "howler";
import npc4Bgm from "../sources/sound/npc4Bgm.mp3";
import lastBgm from "../sources/sound/endingBgm.mp3";

export default function Diary() {
  const characterSex = JSON.parse(localStorage.getItem("character"));
  const result = JSON.parse(localStorage.getItem("totalDiary"));
  const videoRef = useRef();

  const [isMoved, setIsMoved] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [coverFlipped, setCoverFlipped] = useState(false);
  const [coverFlippedEnd, setCoverFlippedEnd] = useState(false);
  const [page0Back, setPage0Back] = useState(false);
  const [page1Back, setPage1Back] = useState(false);
  const [page2Back, setPage2Back] = useState(false);
  const [page3Back, setPage3Back] = useState(false);
  const [page4Back, setPage4Back] = useState(false);

  const [page1Flipped, setPage1Flipped] = useState(false);
  const [page2Flipped, setPage2Flipped] = useState(false);
  const [page3Flipped, setPage3Flipped] = useState(false);
  const [page4Flipped, setPage4Flipped] = useState(false);
  const [removeCover, setRemoveCover] = useState(false);

  const [npc4SoundStatus, setNpc4SoundStatus] = useState(true);

  // 페이지 넘기기 함수
  const handleCoverClick = () => {
    if (page3Flipped) {
      setPage4Flipped(true);
      setNpc4SoundStatus(false);
      setTimeout(() => {
        setRemoveCover(true);
      }, 2100);
    } else if (page2Flipped) {
      setPage3Flipped(true);
    } else if (page1Flipped) {
      setPage2Flipped(true);
    } else if (coverFlipped) {
      setPage1Flipped(true);
      console.log(videoRef.current.width);
    } else if (isMoved) {
      setCoverFlipped(true);
      setTimeout(() => {
        setCoverFlippedEnd(true);
      }, 500);
    } else {
      setIsMoved(true);
      setTimeout(() => {
        setShowCover(false);
      }, 500);
    }
  };

  // 넘기는 애니메이션 뒷장 보여주기
  useEffect(() => {
    if (coverFlipped) {
      setTimeout(() => {
        setPage0Back(true);
      }, 500);
    } else if (page1Flipped) {
      setTimeout(() => {
        setPage1Back(true);
      }, 500);
    } else if (page2Flipped) {
      setTimeout(() => {
        setPage2Back(true);
      }, 500);
    } else if (page3Flipped) {
      setTimeout(() => {
        setPage3Back(true);
      }, 500);
    } else if (page4Flipped) {
      setTimeout(() => {
        setPage4Back(true);
      }, 500);
    }
  }, [coverFlipped, page1Flipped, page2Flipped, page3Flipped, page4Flipped]);

  // 사운드

  useEffect(() => {
    const npc4Sound = new Howl({
      src: [npc4Bgm],
      loop: true,
      volume: 0.4,
      preload: true,
    });
    if (npc4SoundStatus) {
      npc4Sound.play();
      npc4Sound.seek(localStorage.getItem("bgmStartingTime") + 15000);
      console.log(
        "이어서 재생되는 시점 : ",
        localStorage.getItem("bgmStartingTime") + 300
      );
      npc4Sound.on("play", () => {});
    } else {
      Howler.stop();
    }
    return () => {
      npc4Sound.unload();
    };
  }, [npc4SoundStatus]);

  const lastBgmSound = new Howl({
    src: [lastBgm],
    loop: true,
    volume: 0.4,
    preload: true,
  });
  // 마지막 페이지 이동 및 확대 애니메이션 끝나면 영상 재생
  const startVideo = () => {
    if (videoRef.current) videoRef.current.play();
    return () => {
      lastBgmSound.unload();
    };
  };

  return (
    <>
      <Container removecover={removeCover}>
        <Cover
          src={cover}
          onClick={handleCoverClick}
          ismoved={isMoved}
          showcover={showCover}
        />
        <DiaryDiv>
          <LastPage
            coverflipped={coverFlippedEnd}
            beforepage={page3Flipped}
            isflipped={page4Flipped}
            afterpage={page4Flipped}
            pageslide={page4Flipped}
            removecover={removeCover}
            onClick={handleCoverClick}
            onAnimationEnd={startVideo}
          >
            <video ref={videoRef}>
              <source src="./videos/ending1.mp4" type="video/mp4" />
            </video>
          </LastPage>
          <Page
            coverflipped={coverFlippedEnd}
            beforepage={page2Flipped}
            isflipped={page3Flipped}
            afterpage={page4Flipped}
            onClick={handleCoverClick}
          >
            <Front
              src={
                characterSex === "girl"
                  ? result[3]
                    ? gPage3
                    : gPage3_dirt
                  : result[3]
                  ? bPage3
                  : bPage3_dirt
              }
            />
            <Back
              src={pageBack}
              isflipped={page3Back}
              afterpage={page4Flipped}
            />
          </Page>
          <Page
            coverflipped={coverFlippedEnd}
            beforepage={page1Flipped}
            isflipped={page2Flipped}
            afterpage={page3Flipped}
            onClick={handleCoverClick}
          >
            <Front
              src={
                characterSex === "girl"
                  ? result[2]
                    ? gPage2
                    : gPage2_dirt
                  : result[2]
                  ? bPage2
                  : bPage2_dirt
              }
            />
            <Back
              src={pageBack}
              isflipped={page2Back}
              afterpage={page3Flipped}
            />
          </Page>
          <Page
            coverflipped={coverFlippedEnd}
            beforepage={coverFlippedEnd}
            isflipped={page1Flipped}
            afterpage={page2Flipped}
            onClick={handleCoverClick}
          >
            <Front
              src={
                characterSex === "girl"
                  ? result[1]
                    ? gPage1
                    : gPage1_dirt
                  : result[1]
                  ? bPage1
                  : bPage1_dirt
              }
            />
            <Back
              src={pageBack}
              isflipped={page1Back}
              afterpage={page2Flipped}
            />
          </Page>
          <CoverPage
            beforepage={isMoved}
            showcover={showCover}
            isflipped={coverFlipped}
            afterpage={page1Flipped}
            pageslide={page4Flipped}
            onClick={handleCoverClick}
          >
            <Front src={cover} isflipped={coverFlipped} />

            <Back
              src={pageBack}
              isflipped={page0Back}
              afterpage={page1Flipped}
            />
          </CoverPage>
        </DiaryDiv>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: ${({ removecover }) =>
    removecover ? "none" : `url(${bg})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${({ removecover }) => (removecover ? "black" : "#89502d")};
`;

const DiaryDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  perspective: 1000px;
`;

const Cover = styled.img`
  position: absolute;
  top: 9.2vh;
  left: 33.2vw;
  height: 81vh;
  display: ${({ showcover }) => (showcover ? "flex" : "none")};
  transition: transform 0.5s ease-in-out;

  ${({ ismoved }) =>
    ismoved &&
    css`
      transform: translateX(14.58vw);
    `}
`;
const CoverPage = styled.div`
  position: absolute;
  top: ${({ isflipped }) => (isflipped ? "9.2vh" : "7.4vh")};
  left: 47.8vw;
  width: 38vw;
  transition: all 1s ease-in-out;
  backface-visibility: hidden;
  display: ${({ showcover, pageslide }) =>
    pageslide ? "none" : showcover ? "none" : "flex"};
  transform-origin: left center;
  ${({ isflipped }) =>
    isflipped &&
    css`
      transform: rotateY(-180deg);
    `}
`;
const Page = styled.div`
  position: absolute;
  top: 9.2vh;
  left: 47.8vw;
  width: 38vw;
  transition: all 1s ease-in-out;
  backface-visibility: hidden;
  opacity: ${({ beforepage }) => (beforepage ? "1" : "0")};
  transform-origin: left center;
  ${({ isflipped }) =>
    isflipped &&
    css`
      transform: rotateY(-180deg);
    `}
`;
const Front = styled.img`
  position: absolute;
  top: 1.8vh;
  left: 0;
  height: 81vh;
`;
const Back = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 83vh;
  transform: rotateY(180deg);
  visibility: ${({ isflipped, afterpage }) =>
    isflipped ? "visible" : afterpage ? "hidden" : "hidden"};
`;

const lastPageTransition = keyframes`
  0%{
    transform: translateX(0);
  }
  30% {
    transform: translateX(-14.58vw) scale(1);
  }
  70% {
    transform: translateX(-14.58vw) scale(1);
    
  }
  100%{
    transform: translateX(-14.58vw) translateY(-2vh)
    scale(1.1) ;
    
  }
`;

const LastPage = styled.div`
  position: absolute;
  top: 11vh;
  left: 47.8vw;
  /* width: 38vw; */
  backface-visibility: hidden;
  opacity: ${({ coverflipped }) => (coverflipped ? "1" : "0")};
  transform-origin: left center;
  ${({ pageslide }) =>
    pageslide &&
    css`
      animation: ${lastPageTransition} 2s linear forwards;
    `}

  & > video {
    width: 100%; /* 동영상 너비 100%로 설정 */
    /* height: auto; */
    max-height: 81vh;
    object-fit: contain; /* 동영상 비율 유지하며 채우기 */
  }
`;
