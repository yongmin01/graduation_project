import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import bg from "../sources/images/Outro/outroBg.png";
import cover from "../sources/images/Outro/diaryCover.webp";
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
import emptyPage from "../sources/images/Outro/emptyPage.png";
import coverBack from "../sources/images/Outro/coverBack.svg";
import pageBack from "../sources/images/Outro/pageBack.svg";

export default function Diary() {
  const characterSex = JSON.parse(localStorage.getItem("character"));
  const result = JSON.parse(localStorage.getItem("totalDiary"));

  const [page, setPage] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [coverFlipped, setCoverFlipped] = useState(false);
  const [page1Flipped, setPage1Flipped] = useState(false);
  const [page2Flipped, setPage2Flipped] = useState(false);
  const [page3Flipped, setPage3Flipped] = useState(false);
  const [page4Flipped, setPage4Flipped] = useState(false);

  const handleCoverClick = () => {
    // if (isMoved) {
    //   // setIsFlipped(!isFlipped);
    //   setCoverFlipped(true);
    //   console.log("is Moved! B");
    // } else if (coverFlipped) {
    //   setPage1Flipped(true);
    //   console.log("cover is already Flipped! C");
    // } else if (page1Flipped) {
    //   setPage2Flipped(true);
    //   console.log("page1 is already Flipped! D");
    // } else if (page2Flipped) {
    //   setPage3Flipped(true);
    // } else {
    //   setIsMoved(true);
    //   console.log("B");
    // }

    if (page2Flipped) {
      setPage3Flipped(true);
    } else if (page1Flipped) {
      setPage2Flipped(true);
    } else if (coverFlipped) {
      setPage1Flipped(true);
    } else if (isMoved) {
      setCoverFlipped(true);
    }
    {
      setIsMoved(true);
      setTimeout(() => {
        setShowCover(false);
      }, 1500);
    }
  };

  return (
    <Container>
      <Cover
        src={cover}
        onClick={handleCoverClick}
        isMoved={isMoved}
        showCover={showCover}
      />
      <Page0
        src={cover}
        isMoved={isMoved}
        showCover={showCover}
        isFlipped={coverFlipped}
        afterPage={page1Flipped}
        onClick={handleCoverClick}
      />
      <Page1
        src={
          characterSex === "girl"
            ? result.includes(1)
              ? gPage1
              : gPage1_dirt
            : result.includes(1)
            ? bPage1
            : bPage1_dirt
        }
        beforePage={coverFlipped}
        isFlipped={page1Flipped}
        afterPage={page2Flipped}
        onClick={handleCoverClick}
      />

      <Page
        src={
          characterSex === "girl"
            ? result.includes(2)
              ? gPage2
              : gPage2_dirt
            : result.includes(2)
            ? bPage2
            : bPage2_dirt
        }
        beforePage={page1Flipped}
        isFlipped={page2Flipped}
        afterPage={page3Flipped}
        onClick={handleCoverClick}
      />

      <Page
        src={
          characterSex === "girl"
            ? result.includes(3)
              ? gPage3
              : gPage3_dirt
            : result.includes(3)
            ? bPage3
            : bPage3_dirt
        }
        beforePage={page2Flipped}
        isFlipped={page3Flipped}
        afterPage={page4Flipped}
        onClick={handleCoverClick}
      />
      <Page4 src={emptyPage} beforePage={page3Flipped} />
      {/* <Page src={page1} isMoved={isMoved} onClick={handleCoverClick} /> */}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bg}) no-repeat center fixed;
  background-size: cover;
  perspective: 1000px;
  position: relative;
`;

const Cover = styled.img`
  position: absolute;
  left: 33vw;
  top: 9.2vh;
  height: 81vh;
  opacity: ${({ showCover }) => (showCover ? "1" : "0")};
  transition: transform 1.5s ease-in-out, opacity 1.5s ease-in-out;
  transform-origin: left center;
  ${({ isMoved }) =>
    isMoved &&
    css`
      transform: translateX(14.5vw);
    `}
  z-index: 2;
`;

const Page0 = styled.img`
  position: absolute;
  left: 47.8vw;
  top: 9.2vh;
  height: 81vh;
  display: ${({ showCover }) => (showCover ? "none" : "flex")};
  transition: transform 1.5s ease-in-out, opacity 1.5s ease-in-out;
  transform-origin: left center;
  ${({ isFlipped, afterPage }) =>
    isFlipped &&
    css`
      transform: rotateY(-180deg);
      opacity: ${afterPage ? 0 : isFlipped ? 0.5 : 1};
    `}
  z-index: 1;
`;

const Page1 = styled.img`
  position: absolute;
  left: 47.8vw;
  top: 9.2vh;
  height: 81vh;
  display: ${({ beforePage }) => (beforePage ? "flex" : "none")};
  transition: transform 1.5s ease-in-out, opacity 1.5s ease-in-out;
  transform-origin: left center;
  ${({ isFlipped, afterPage }) =>
    isFlipped &&
    css`
      transform: rotateY(-180deg);
      opacity: ${afterPage ? 0 : isFlipped ? 0.5 : 1};
    `}
  z-index: ${({ isFlipped }) => (isFlipped ? "1" : "-1")};
`;
const Page = styled.img`
  position: absolute;
  left: 47.8vw;
  top: 9.2vh;
  height: 81vh;
  display: ${({ beforePage }) => (beforePage ? "flex" : "none")};
  transition: transform 1.5s ease-in-out, opacity 1.5s ease-in-out;
  transform-origin: left center;
  ${({ isFlipped, afterPage }) =>
    isFlipped &&
    css`
      transform: ${isFlipped ? "rotateY(-180deg)" : "translateX(556px)"};
      opacity: ${afterPage ? 0 : isFlipped ? 0.5 : 1};
    `}
  z-index: ${({ isFlipped }) => (isFlipped ? "1" : "-1")};
`;
const Page4 = styled.img`
  position: absolute;
  left: 47.8vw;
  top: 9.2vh;
  height: 81vh;
  display: ${({ beforePage }) => (beforePage ? "flex" : "none")};
`;

// const PageImg = styled.img`
//   width: 100%;
//   height: 100%;
// `;
// const Front = styled.div`
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   width: 100%;
//   height: 100%;
//   transition: all 2s;
//   backface-visibility: hidden;
//   background-color: yellow;
//   z-index: 2;
//   transform-origin: left center;
//   ${({ isFlipped }) =>
//     isFlipped &&
//     css`
//       z-index: 1;
//       transform: rotateY(-180deg);
//     `}
// `;

// const Back = styled.div`
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   width: 100%;
//   height: 100%;
//   transition: all 2s;
//   backface-visibility: hidden;
//   z-index: 1;
//   transform: rotateY(180deg);
//   transform-origin: left center;

//   ${({ isFlipped }) =>
//     isFlipped &&
//     css`
//       z-index: 2;
//       transform: rotateY(0deg);
//     `}
// `;
