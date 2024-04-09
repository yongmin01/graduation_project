import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import GameStartCounter from "../Components/GameStartCounter.jsx";
import BeforeGame from "../Components/BeforeGame.jsx";
import GameResult from "../Components/GameResult.jsx";
import GameCommonStyle from "../utils/GameCommonStyle.jsx";
import { ReactComponent as PlayIcon } from "../sources/images/Game/playIcon.svg";

import backImg from "../sources/images/Game/puzzleQuiz/back.webp";
import bookA from "../sources/images/Game/puzzleQuiz/book1.webp";
import bookB from "../sources/images/Game/puzzleQuiz/book2.webp";
import bookC from "../sources/images/Game/puzzleQuiz/book3.webp";
import bookD from "../sources/images/Game/puzzleQuiz/book4.webp";
import bookE from "../sources/images/Game/puzzleQuiz/book5.webp";
import bookF from "../sources/images/Game/puzzleQuiz/book6.webp";

import stuffA from "../sources/images/Game/puzzleQuiz/stuff1.webp";
import stuffB from "../sources/images/Game/puzzleQuiz/stuff2.webp";
import stuffC from "../sources/images/Game/puzzleQuiz/stuff3.webp";
import stuffD from "../sources/images/Game/puzzleQuiz/stuff4.webp";
import stuffE from "../sources/images/Game/puzzleQuiz/stuff5.webp";
import stuffF from "../sources/images/Game/puzzleQuiz/stuff6.webp";

import characterA_1 from "../sources/images/Game/puzzleQuiz/character1_A.webp";
import characterA_2 from "../sources/images/Game/puzzleQuiz/character1_B.webp";
import characterB_1 from "../sources/images/Game/puzzleQuiz/character2_A.webp";
import characterB_2 from "../sources/images/Game/puzzleQuiz/character2_B.webp";
import characterC_1 from "../sources/images/Game/puzzleQuiz/character3_A.webp";
import characterC_2 from "../sources/images/Game/puzzleQuiz/character3_B.webp";
import characterD_1 from "../sources/images/Game/puzzleQuiz/character4_A.webp";
import characterD_2 from "../sources/images/Game/puzzleQuiz/character4_B.webp";
import characterE_1 from "../sources/images/Game/puzzleQuiz/character5_A.webp";
import characterE_2 from "../sources/images/Game/puzzleQuiz/character5_B.webp";
import characterF_1 from "../sources/images/Game/puzzleQuiz/character6_A.webp";
import characterF_2 from "../sources/images/Game/puzzleQuiz/character6_B.webp";

const cardPack = [
  {
    A1: bookA,
    B1: bookB,
    C1: bookC,
    D1: bookD,
    E1: bookE,
    F1: bookF,
    A2: bookA,
    B2: bookB,
    C2: bookC,
    D2: bookD,
    E2: bookE,
    F2: bookF,
  },
  {
    A1: stuffA,
    B1: stuffB,
    C1: stuffC,
    D1: stuffD,
    E1: stuffE,
    F1: stuffF,
    A2: stuffA,
    B2: stuffB,
    C2: stuffC,
    D2: stuffD,
    E2: stuffE,
    F2: stuffF,
  },
  {
    A1: characterA_1,
    B1: characterB_1,
    C1: characterC_1,
    D1: characterD_1,
    E1: characterE_1,
    F1: characterF_1,
    A2: characterA_2,
    B2: characterB_2,
    C2: characterC_2,
    D2: characterD_2,
    E2: characterE_2,
    F2: characterF_2,
  },
];

const Card = ({ round, card, onClick, isFlipped }) => {
  return (
    <CardContainer>
      <CardInner isFlipped={isFlipped} onClick={onClick}>
        <CardFront>
          <CardImage src={backImg} alt="Card Back" />
        </CardFront>
        <CardBack>
          <CardImage src={cardPack[round][card]} alt={`Card ${card}`} />
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

export default function PuzzleQuiz() {
  const [game, setGame] = useState("before");
  const [counter, setCounter] = useState(true); // 라운드 시작 전 3, 2, 1
  const timeLimit = 30;
  const [time, setTime] = useState(timeLimit); // 제한 시간 (단위: 초)
  const [quizIndex, setQuizIndex] = useState(0);
  const [roundEnd, setRoundEnd] = useState("yet");
  const totalQuiz = 3;
  const score = useRef(0);
  const pass = useRef();
  const [endAlert, setEndAlert] = useState(false);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const symbols = [
    "A1",
    "B1",
    "C1",
    "D1",
    "E1",
    "F1",
    "A2",
    "B2",
    "C2",
    "D2",
    "E2",
    "F2",
  ];
  // const symbols = ["A", "B", "C"];

  // 매치된 카드가 12장이 되는지 -> 라운드 종료
  useEffect(() => {
    if (matchedCards.length === 12) {
      setRoundEnd("pass");

      score.current += 1;
    }
  }, [matchedCards]);

  useEffect(() => {
    if (quizIndex !== totalQuiz - 1) {
      setMatchedCards([]);
      setFlippedCards([]);
      const initialCards = symbols;
      initialCards.sort(() => Math.random() - 0.5);
      setCards(initialCards);
      setCounter(true);
      setTime(timeLimit);
    }
  }, [quizIndex]);

  useEffect(() => {
    if (quizIndex === totalQuiz - 1 && roundEnd !== "yet") {
      setTimeout(() => {
        setEndAlert(true);
      }, 3000);
    }
  }, [quizIndex, roundEnd]);
  // 뒤집힌 두 카드가 일치하는지
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (cards[firstCard][0] === cards[secondCard][0]) {
        setMatchedCards([...matchedCards, firstCard, secondCard]);
      }
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
    }
  });
  // 카드 뒤집기 (뒤집힌 카드가 이미 두장이거나 선택된 카드가 매치된 카드에 포함되어 있으면 return)
  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || matchedCards.includes(index)) return;
    setFlippedCards([...flippedCards, index]);
  };

  useEffect(() => {
    if (!counter) {
      const timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      if (time === 0) {
        setRoundEnd("fail");
        clearInterval(timer);
      }
      if (roundEnd === "pass") {
        clearInterval(timer);
      }
      return () => clearInterval(timer);
    }
  }, [counter, time, roundEnd]);

  const next = () => {
    if (quizIndex === totalQuiz - 1) {
      setGame("end");
    }
    setRoundEnd("yet");
    setQuizIndex(quizIndex + 1);
    setCounter(true);
    setMatchedCards([]);
    setTime(15);
  };
  const handleEnd = () => {
    if (score.current >= 2) {
      pass.current = true;
    } else {
      pass.current = false;
    }
    setGame("end");
  };

  // const getSeconds = (time) => {
  //   const seconds = Number(time % 60);
  //   if (seconds < 10) {
  //     return "0" + String(seconds);
  //   } else {
  //     return String(seconds);
  //   }
  // };

  return (
    <>
      <GameCommonStyle color={"#CDEACF"} />
      {game === "start" ? (
        <Game>
          <Time>
            <TimeDiv>TIME</TimeDiv>
            <Seconds>{time}</Seconds>
          </Time>
          <Index>
            <Progress>{quizIndex + 1}/3</Progress>
            <QuizIndex>문제 {quizIndex + 1}</QuizIndex>
          </Index>

          {roundEnd !== "yet" ? (
            quizIndex !== totalQuiz - 1 ? (
              <NextBtn onClick={next}>
                <PlayIcon />
              </NextBtn>
            ) : null
          ) : null}
          {counter ? (
            // <Cover>
            <GameStartCounter startCount={setCounter} />
          ) : (
            <>
              {roundEnd === "yet" ? null : roundEnd === "pass" ? (
                <Cover>
                  <Timeout>통과!</Timeout>
                  <div>{score.current}</div>
                </Cover>
              ) : roundEnd === "fail" ? (
                <Cover>
                  <Timeout>Time Out</Timeout>
                  <div>{score.current}</div>
                </Cover>
              ) : null}
              <GameBoard>
                {cards.map((card, index) => (
                  <Card
                    round={quizIndex}
                    key={index}
                    card={card}
                    onClick={() => handleCardClick(index)}
                    isFlipped={
                      flippedCards.includes(index) ||
                      matchedCards.includes(index)
                    }
                  />
                ))}
              </GameBoard>
            </>
          )}
          {endAlert ? (
            <EndAlert onClick={handleEnd}>게임 종료!</EndAlert>
          ) : null}
        </Game>
      ) : game === "before" ? (
        <>
          <BeforeGame go={setGame} title="추억의 물건 짝 맞추기" round={3} />
        </>
      ) : (
        <GameResult
          pass={pass.current}
          score={score.current}
          total={3}
          round={3}
          end={setGame}
        />
      )}
    </>
  );
}

const Game = styled.div`
  position: absolute;

  top: 12vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 4.8vh;
`;

const Time = styled.div`
  position: absolute;
  /* top: 10vh; */
  left: 8.6vw;
  gap: 2px;
`;
const TimeDiv = styled.div`
  display: flex;
  width: 118px;
  height: 28px;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  background: #ff7a7a;
  color: #151b26;
  text-align: center;
  font-family: GangwonEduAll;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Seconds = styled.div`
  display: flex;
  width: 118px;
  height: 78px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #151b26;
  text-align: center;
  font-family: GangwonEduAll;
  font-size: 80px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Index = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Progress = styled.div`
  font-size: 3.5vh;
  font-family: UhBeeJung;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #151b26;
`;
const QuizIndex = styled.div`
  font-size: 8.7vh;
  font-family: UhBeeJung;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #151b26;
`;
const Cover = styled.div`
  position: absolute;
  z-index: 100;
  width: 78vw;
  height: 71vh;
  display: flex;
  justify-content: center;
  /* background: rgba(31, 31, 31, 0.8); */
  background-color: #69696a6a;
  text-align: center;
`;
const Timeout = styled.div``;
const NextBtn = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  right: 9.5vw;
  top: 2vh;
`;
const CardContainer = styled.div`
  width: 11vw;
  height: 23vh;
  perspective: 1000px;
  /* margin: 10px; */
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
  transform: ${(props) => (props.isFlipped ? "rotateY(180deg)" : "rotateY(0)")};
`;

const CardFront = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
`;

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
`;

const GameBoard = styled.div`
  width: 77vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2.9vh;
`;
const EndAlert = styled.div`
  width: 85vw;
  height: 78vh;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.8);
  font-family: UhBeejungBold;
  font-size: 120px;
  font-weight: 700;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
