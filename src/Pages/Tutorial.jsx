import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import bgImg from "../sources/images/Map/map1/redBg.webp";
// import girlImg from "../sources/images/Intro/girl.svg";
// import boyImg from "../sources/images/Intro/boy.svg";
import girlImg from "../sources/images/Map/girl/girl.png";
import boyImg from "../sources/images/Map/boy/boy.png";
import { ReactComponent as NextBtnImg } from "../sources/images/nextBtn.svg";
import keyboardImg from "../sources/images/Intro/keyboard.svg";
import keyboardImg2 from "../sources/images/Intro/keyboardWASD.svg";
import mouseImg from "../sources/images/Intro/mouse.svg";
import diaryImg from "../sources/images/diary.svg";

export default function Tutorial() {
  const [step, setStep] = useState(0);
  const [character, setCharacter] = useState(null);
  useEffect(() => {
    setCharacter(character);
  }, [character]);

  useEffect(() => {
    if (step === 2) {
      localStorage.setItem("character", JSON.stringify(character));
    }
  }, [step]);

  useEffect(() => {
    setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 1000);
  }, []);

  const navigator = useNavigate();

  useEffect(() => {
    if (step === 4) {
      setTimeout(() => {
        setStep(5);
        navigator("/map1");
      }, 3000);
    }
  }, [step]);

  return (
    <Wrapper>
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
                <Diary style={{ marginLeft: "-50px" }}>
                  <img src={diaryImg} />
                  <img src={diaryImg} />
                  <img src={diaryImg} />
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
                맵에서 궁금한 부분은 꼭 마우스로 클릭해보세요.
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
// 페이드인 애니메이션 정의
const fadeIn = keyframes`
  from {
        opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const fadeOut = keyframes`
  from {
        opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// 애니메이션을 적용할 스타일 컴포넌트
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
  width: 100%;
  height: 100%;
  text-align: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(${bgImg});
  background-repeat: no-repeat;
  /* padding-top: 19vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Uhbee Jung;
  font-weight: 700;
  color: #fff;
`;

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 11vw;
`;

const Character = styled.img`
  height: 44vh;
  transition: box-shadow 0.3s ease-in-out; /* 그림자 효과에 애니메이션을 적용합니다 */
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
const End = styled.div`
  animation: ${fadeIn} 1s linear forwards;
  animation-delay: 2s;
`;
