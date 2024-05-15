import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import bgImg from "../sources/images/Map/map1/redBg.webp";
import girlImg from "../sources/images/Map/girl/girl.png";
import boyImg from "../sources/images/Map/boy/boy.png";
import { ReactComponent as NextBtnImg } from "../sources/images/nextBtn.svg";
import keyboardImg from "../sources/images/Intro/keyboard.webp";
import keyboardImg2 from "../sources/images/Intro/keyboardWASD.webp";
import mouseImg from "../sources/images/Intro/mouse.webp";
import diaryImg from "../sources/images/diary.svg";
// import clickImg from "../sources/images/Map/click.png";
import clickImg from "../sources/images/Intro/clickWhite.webp";

export default function Tutorial() {
  const girlImage = () => {
    let girl = new Image();
    girl.src = girlImg;
  };
  const boyImage = () => {
    let boy = new Image();
    boy.src = boyImg;
  };
  const diaryImage = () => {
    let diary = new Image();
    diary.src = diaryImg;
  };

  const keyboardLeftImage = () => {
    let keyboard = new Image();
    keyboard.src = keyboardImg2;
  };
  const keyboardRightImage = () => {
    let keyboard = new Image();
    keyboard.src = keyboardImg;
  };

  useLayoutEffect(() => {
    girlImage();
    boyImage();
    diaryImage();
    keyboardLeftImage();
    keyboardRightImage();
  }, []);

  const [step, setStep] = useState(0);
  const [character, setCharacter] = useState(null);
  useEffect(() => {
    setCharacter(character);
  }, [character]);

  useEffect(() => {
    if (step === 2) {
      if (character !== null) {
        localStorage.setItem("character", JSON.stringify(character));
      } else {
        localStorage.setItem("character", JSON.stringify("girl"));
      }
    }
    if (step === 4) {
      setTimeout(() => {
        setStep(5);
        navigator("/map1");
      }, 3000);
    }
  }, [step]);

  useEffect(() => {
    setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 1000);
    localStorage.setItem("totalDiary", JSON.stringify([0]));
  }, []);

  const navigator = useNavigate();

  return (
    <>
      {step === 0 ? (
        <Cover />
      ) : (
        <Content>
          {step === 1 ? (
            <>
              게임을 진행할 캐릭터를 골라주세요.
              <CharacterContainer>
                <Character
                  src={girlImg}
                  onClick={() => setCharacter("girl")}
                  isSlected={character === "girl"}
                />
                <Character
                  src={boyImg}
                  onClick={() => setCharacter("boy")}
                  isSlected={character === "boy"}
                />
              </CharacterContainer>
              {character !== null ? (
                <Next onClick={() => setStep(2)}>
                  다음 <NextBtnImg width="2.6vw" fill={"#FFF"} />
                </Next>
              ) : null}
            </>
          ) : step === 2 ? (
            <>
              <Story>
                <div>어렸을 적 일상으로 다시 돌아온 당신,</div>
                <div>오늘은 어떤 하루가 기다리고 있을까요?</div>
                <Diary style={{ marginLeft: "-4vw" }}>
                  <DiaryImg src={diaryImg} />
                  <DiaryImg src={diaryImg} />
                  <DiaryImg src={diaryImg} />
                </Diary>
                <div>미니게임을 통해 일기장을 하나씩 얻어가며</div>
                <div>맵과 게임 속에서 과거의 추억을 천천히 구경해보세요.</div>
              </Story>
              <Next onClick={() => setStep(3)}>
                다음 <NextBtnImg width="2.6vw" fill={"#FFF"} />
              </Next>
            </>
          ) : step === 3 ? (
            <>
              <Order>
                <IMG src={keyboardImg2} height="18.5vh" />
                캐릭터의 이동은 좌, 우 방향키 또는
                <br /> A, D 키로 조작할 수 있습니다.
                <IMG src={keyboardImg} height="17.1vh" />
              </Order>
              <Order>
                맵에서 <img src={clickImg} />이 보이면 꼭 마우스로 클릭해보세요.
                <IMG src={mouseImg} height="29vh" />
              </Order>
              <Next onClick={() => setStep(4)}>
                다음 <NextBtnImg width="2.6vw" fill={"#FFF"} />
              </Next>
            </>
          ) : step === 4 ? (
            <End style={{ fontSize: "60px" }}>
              이제부터 추억을 찾아 모험을 떠나보세요!
            </End>
          ) : null}
        </Content>
      )}
    </>
  );
}

const fadeIn = keyframes`
  from {
        opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: 2s;
  background-color: black;
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  z-index: 100;
`;
const Content = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(${bgImg});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Uhbee Jung;
  font-weight: 700;
  color: #fff;
  background-color: pink;
`;

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 11vw;
`;

const Character = styled.img`
  height: 51.3vh;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    filter: drop-shadow(0px 4px 20px white);
  }
  filter: ${(props) =>
    props.isSlected ? "drop-shadow(0px 4px 20px white)" : null};
`;

const Order = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  font-size: 50px;
`;

const IMG = styled.img`
  height: ${(props) => props.height};
`;
const Next = styled.div`
  position: absolute;
  bottom: 10vh;
  right: 9vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 50px;
  gap: 10px;
  cursor: pointer;
`;
const Story = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;
const Diary = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;
const DiaryImg = styled.img`
  height: 5vh;
`;
const End = styled.div`
  animation: ${fadeIn} 1s linear forwards;
  animation-delay: 2s;
`;
