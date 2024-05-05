import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import bg from "../sources/images/Outro/outroBg.png";

import cover from "../sources/images/Outro/diaryCover.webp";
import emptyPage from "../sources/images/Outro/emptyPage.png";
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

import { ReactComponent as NextBtnImg } from "../sources/images/nextBtn.svg";

export default function Diary() {
  const characterSex = JSON.parse(localStorage.getItem("character"));
  const result = JSON.parse(localStorage.getItem("totalDiary"));

  const [isMoved, setIsMoved] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [coverFlipped, setCoverFlipped] = useState(false);
  const [page0Back, setPage0Back] = useState(false);
  const [page1Back, setPage1Back] = useState(false);
  const [page2Back, setPage2Back] = useState(false);
  const [page3Back, setPage3Back] = useState(false);
  const [page4Back, setPage4Back] = useState(false);

  const [page1Flipped, setPage1Flipped] = useState(false);
  const [page2Flipped, setPage2Flipped] = useState(false);
  const [page3Flipped, setPage3Flipped] = useState(false);
  const [page4Flipped, setPage4Flipped] = useState(false);

  const handleCoverClick = () => {
    if (page2Flipped) {
      setPage3Flipped(true);
    } else if (page1Flipped) {
      setPage2Flipped(true);
    } else if (coverFlipped) {
      setPage1Flipped(true);
    } else if (isMoved) {
      setCoverFlipped(true);
    } else {
      setIsMoved(true);
      setTimeout(() => {
        setShowCover(false);
      }, 1000);
    }
  };

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
    }
  }, [coverFlipped, page1Flipped, page2Flipped, page3Flipped]);

  return (
    <>
      <BG src={bg} />

      <Cover
        src={cover}
        onClick={handleCoverClick}
        isMoved={isMoved}
        showCover={showCover}
      />
      <DiaryDiv>
        <CoverPage
          beforePage={isMoved}
          showCover={showCover}
          isFlipped={coverFlipped}
          afterPage={page1Flipped}
          onClick={handleCoverClick}
        >
          <Front src={cover} isFlipped={coverFlipped} />

          <Back src={pageBack} isFlipped={page0Back} afterPage={page1Flipped} />
        </CoverPage>
        <Page
          beforePage={coverFlipped}
          isFlipped={page1Flipped}
          afterPage={page2Flipped}
          onClick={handleCoverClick}
        >
          <Front
            src={
              characterSex === "girl"
                ? result.includes(1)
                  ? gPage1
                  : gPage1_dirt
                : result.includes(1)
                ? bPage1
                : bPage1_dirt
            }
          />
          <Back src={pageBack} isFlipped={page1Back} afterPage={page2Flipped} />
        </Page>
        <Page
          beforePage={page1Flipped}
          isFlipped={page2Flipped}
          afterPage={page3Flipped}
          onClick={handleCoverClick}
        >
          <Front
            src={
              characterSex === "girl"
                ? result.includes(1)
                  ? gPage2
                  : gPage2_dirt
                : result.includes(1)
                ? bPage2
                : bPage2_dirt
            }
          />
          <Back src={pageBack} isFlipped={page2Back} afterPage={page3Flipped} />
        </Page>
        <Page
          beforePage={page2Flipped}
          isFlipped={page3Flipped}
          afterPage={page4Flipped}
          onClick={handleCoverClick}
        >
          <Front
            src={
              characterSex === "girl"
                ? result.includes(1)
                  ? gPage3
                  : gPage3_dirt
                : result.includes(1)
                ? bPage3
                : bPage3_dirt
            }
          />
          <Back src={pageBack} isFlipped={page3Back} afterPage={page4Flipped} />
        </Page>
        <Page
          beforePage={page3Flipped}
          isFlipped={page4Flipped}
          afterPage={page4Flipped}
          onClick={handleCoverClick}
        >
          <Front src={emptyPage} />
          <Back src={pageBack} isFlipped={page4Back} afterPage={page4Flipped} />
        </Page>
      </DiaryDiv>
    </>
  );
}

const BG = styled.img`
  width: 100vw;
  /* height: 100vh; */
  /* object-fit: fill; */
`;
const DiaryDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const Next = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 11px;
  position: absolute;
  /* top: 85.8vh; */
  top: 84vh;
  /* left: 78.5vw; */
  left: 72vw;
  font-size: 1.6vw;
  font-family: "UhBeeJung";
  z-index: 100;
`;
const Cover = styled.img`
  position: absolute;
  top: 9.2vh;
  left: 33.2vw;
  height: 81vh;
  display: ${({ showCover }) => (showCover ? "flex" : "none")};
  transition: transform 1s ease-in-out;

  ${({ isMoved }) =>
    isMoved &&
    css`
      transform: translateX(14.58vw);
    `}
`;
const CoverPage = styled.div`
  position: absolute;
  top: ${({ isFlipped }) => (isFlipped ? "9.2vh" : "7.4vh")};
  left: 47.8vw;
  width: 38vw;
  perspective: 1000px;
  transition: all 1s;
  backface-visibility: hidden;
  z-index: 2;
  display: ${({ showCover }) => (showCover ? "none" : "flex")};
  transform-origin: left center;
  ${({ isFlipped }) =>
    isFlipped &&
    css`
      z-index: 1;
      transform: rotateY(-180deg);
    `}
`;
const Page = styled.div`
  position: absolute;
  top: 9.2vh;
  left: 47.8vw;
  width: 38vw;
  perspective: 1000px;
  transition: all 2s;
  backface-visibility: hidden;
  z-index: 2;
  opacity: ${({ beforePage }) => (beforePage ? "1" : "0")};
  transform-origin: left center;
  ${({ isFlipped }) =>
    isFlipped &&
    css`
      z-index: 1;
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
  visibility: ${({ isFlipped, afterPage }) =>
    isFlipped ? "visible" : afterPage ? "visible" : "hidden"};
`;
