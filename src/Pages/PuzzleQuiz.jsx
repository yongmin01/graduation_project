import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Howl } from "howler";
import bgm1 from "../sources/sound/Game/puzzleQuizBgm1.mp3";
import bgm2 from "../sources/sound/Game/puzzleQuizBgm2.mp3";
import useEffectSound from "../utils/EffectSound";
import countDownSound from "../sources/sound/Game/countDown.mp3";
import endSound from "../sources/sound/Game/end.mp3";
import flipSound from "../sources/sound/Game/flip.mp3";
import GameStartCounter from "../Components/GameStartCounter.jsx";
import BeforeGame from "../Components/BeforeGame.jsx";
import GameResult from "../Components/GameResult.jsx";
import GameCommonStyle from "../utils/GameCommonStyle.jsx";
import { ReactComponent as PlayIcon } from "../sources/images/Game/playIcon_green.svg";
import star from "../sources/images/Game/puzzleQuiz/puzzleQuizR3Star.svg";
import highlight from "../sources/images/Game/puzzleQuiz/puzzleQuizR3HL.svg";

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
    A1: [bookA, "그리스로마신화"],
    B1: [bookB, "누가 내 머리에 똥쌌어?"],
    C1: [bookC, "윔피키드"],
    D1: [bookD, "마법천자문"],
    E1: [bookE, "사막에서 살아남기"],
    F1: [bookF, "Why? 사춘기와 성"],
    A2: [bookA, "그리스로마신화"],
    B2: [bookB, "누가 내 머리에 똥쌌어?"],
    C2: [bookC, "윔피키드"],
    D2: [bookD, "마법천자문"],
    E2: [bookE, "사막에서 살아남기"],
    F2: [bookF, "Why? 사춘기와 성"],
  },
  {
    A1: [stuffA, "스프링 장난감"],
    B1: [stuffB, "고무찰흙"],
    C1: [stuffC, "짝궁"],
    D1: [stuffD, "아우터"],
    E1: [stuffE, "환타쉐이커"],
    F1: [stuffF, "매직스네이크"],
    A2: [stuffA, "스프링 장난감"],
    B2: [stuffB, "고무찰흙"],
    C2: [stuffC, "짝궁"],
    D2: [stuffD, "아우터"],
    E2: [stuffE, "환타쉐이커"],
    F2: [stuffF, "매직스네이크"],
  },
  {
    A1: [characterA_1, "도라"],
    B1: [characterB_1, "아리"],
    C1: [characterC_1, "지우"],
    D1: [characterD_1, "이누야샤"],
    E1: [characterE_1, "슈"],
    F1: [characterF_1, "케로로"],
    A2: [characterA_2, "부츠"],
    B2: [characterB_2, "동동이"],
    C2: [characterC_2, "피카츄"],
    D2: [characterD_2, "가영이"],
    E2: [characterE_2, "빈"],
    F2: [characterF_2, "타마마"],
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
          <CardImage src={cardPack[round][card][0]} alt={`Card ${card}`} />
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
  const [urgent, setUrgent] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [roundEnd, setRoundEnd] = useState("yet");
  const totalQuiz = 3;
  const score = useRef(0);
  const pass = useRef();
  const [roundEndAlert, setRoundEndAlert] = useState(false);
  const [levelupAlert, setLevelupAlert] = useState(false);
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
  const symbols2 = ["A1", "B1", "C1", "D1", "E1", "F1"];

  const countDownEffect = useEffectSound(countDownSound, 2);
  const endEffect = useEffectSound(endSound, 2);

  // 매치된 카드가 12장이 되는지 -> 라운드 종료
  useEffect(() => {
    if (matchedCards.length === 12) {
      score.current += 1;
      setTimeout(() => {
        setRoundEndAlert("before");
        setRoundEnd("pass");
      }, 1000);
      setTimeout(() => {
        setRoundEndAlert("after");
      }, 2000);
    }
  }, [matchedCards]);

  useEffect(() => {
    if (game === "start") {
      countDownEffect.play();
    }
  }, [game]);
  useEffect(() => {
    if (quizIndex === 1) {
      countDownEffect.play();
    }
    setMatchedCards([]);
    setFlippedCards([]);
    const initialCards = symbols;
    initialCards.sort(() => Math.random() - 0.5);
    setCards(initialCards);
    setCounter(true);
    setTime(timeLimit);
    setUrgent(false);
  }, [quizIndex]);
  useEffect(() => {
    if (!levelupAlert && game === "start") countDownEffect.play();
  }, [levelupAlert]);

  // 뒤집힌 두 카드가 일치하는지
  const flipEffect = useEffectSound(flipSound, 1);
  useEffect(() => {
    if (flippedCards.length !== 0) flipEffect.play();
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

      if (time === 5) {
        setUrgent(true);
      }
      if (time === 0) {
        setRoundEnd("fail");
        clearInterval(timer);
      }
      if (roundEnd === "pass") {
        clearInterval(timer);
      }
      return () => {
        clearInterval(timer);
      };
    }
  }, [counter, time, roundEnd]);

  useEffect(() => {
    if (!counter) {
      if (quizIndex === 0 || quizIndex === 1) {
        sound1.play();
      } else if (quizIndex === 2) {
        sound2.play();
      }
    }

    if (quizIndex === 0 || quizIndex === 1) {
      return sound1Stop;
    } else if (quizIndex === 2) {
      return sound2Stop;
    }
  }, [counter]);

  useEffect(() => {
    if (roundEnd === "fail") {
      setRoundEndAlert("now");
      endEffect.play();
      setTimeout(() => {
        setRoundEndAlert("after");
      }, 2000);
    }
  }, [roundEnd]);
  const next = () => {
    if (quizIndex === totalQuiz - 1) {
      if (score.current >= 2) {
        pass.current = true;
      } else {
        pass.current = false;
      }
      setGame("end");
    }
    if (quizIndex === totalQuiz - 2) {
      setLevelupAlert(true);
      setTimeout(() => {
        setLevelupAlert(false);
      }, 2500);
    }
    setQuizIndex(quizIndex + 1);
    setRoundEnd("yet");
    setCounter(true);
    setMatchedCards([]);
    setTime(timeLimit);
  };

  // 사운드
  const sound1 = new Howl({
    src: [bgm1],
    // loop: true,
    volume: 0.5,
  });
  const sound2 = new Howl({
    src: [bgm2],
    // loop: true,
    volume: 0.5,
  });
  const sound1Stop = () => sound1.stop();
  const sound2Stop = () => sound2.stop();
  return (
    <>
      <GameCommonStyle color={"#CDEACF"} />
      {game === "start" ? (
        <Game>
          <Time>
            <TimeDiv>TIME</TimeDiv>
            <Seconds isUrgent={urgent}>{time}</Seconds>
          </Time>
          <Index>
            <Progress>{quizIndex + 1}/3</Progress>
            <QuizIndex>문제 {quizIndex + 1}</QuizIndex>
          </Index>
          {levelupAlert ? (
            <Levelup>
              <LevelupTitle>LEVEL UP!!!</LevelupTitle>
              <Description>
                <Star src={star} />
                <span>서로 관련 있는 캐릭터를 찾아 짝을 맞춰보세요.</span>
                <Highlight src={highlight} />
              </Description>
            </Levelup>
          ) : counter ? (
            <div style={{ marginTop: "14.2vh" }}>
              <GameStartCounter startCount={setCounter} />
            </div>
          ) : (
            <>
              {roundEnd === "yet" ? null : roundEnd === "pass" ? (
                <Cover>
                  {roundEndAlert === "after" && quizIndex !== totalQuiz - 1 ? (
                    <NextBtn onClick={next}>
                      <PlayIcon />
                    </NextBtn>
                  ) : null}
                  {roundEndAlert === "after" ? (
                    <>
                      <NextBtn onClick={next}>
                        <PlayIcon />
                      </NextBtn>
                      <Comment color={"#009420"}>
                        {quizIndex === 0
                          ? "잘했어요! 다음 라운드는 쉽지 않을 걸요? :)"
                          : quizIndex === 1
                          ? "대단해요! 그래도 마지막 라운드는 어려울 거에요."
                          : "마지막 문제 끝! 쉽지 않았죠? :)"}
                      </Comment>
                      <Cards round={quizIndex}>
                        <BanClick />
                        {quizIndex === totalQuiz - 1
                          ? symbols.map((card, index) => (
                              <AnswerCard>
                                <Card
                                  round={quizIndex}
                                  key={index}
                                  card={card}
                                  onClick={() => handleCardClick(index)}
                                  isFlipped={true}
                                />
                                {cardPack[quizIndex][card][1]}
                              </AnswerCard>
                            ))
                          : symbols2.map((card, index) => (
                              <AnswerCard>
                                <Card
                                  round={quizIndex}
                                  key={index}
                                  card={card}
                                  onClick={() => handleCardClick(index)}
                                  isFlipped={true}
                                />
                                {cardPack[quizIndex][card][1]}
                              </AnswerCard>
                            ))}
                      </Cards>
                    </>
                  ) : null}
                </Cover>
              ) : roundEnd === "fail" ? (
                <Cover>
                  {roundEndAlert === "before"
                    ? null
                    : roundEndAlert === "now"
                    ? "시간 초과!! -_-"
                    : null}
                  {roundEndAlert === "after" ? (
                    <>
                      <NextBtn onClick={next}>
                        <PlayIcon />
                      </NextBtn>

                      <Comment color={"#FF3E3E"}>
                        {quizIndex !== totalQuiz - 1
                          ? "괜찮아요! 아직 다음 문제가 남아있어요!"
                          : "아쉽네요.. 그래도 반가운 얼굴들이죠? :)"}
                      </Comment>
                      <Cards round={quizIndex}>
                        <BanClick />
                        {quizIndex === totalQuiz - 1
                          ? symbols.map((card, index) => (
                              <AnswerCard>
                                <Card
                                  round={quizIndex}
                                  key={index}
                                  card={card}
                                  onClick={() => handleCardClick(index)}
                                  isFlipped={true}
                                />
                                {cardPack[quizIndex][card][1]}
                              </AnswerCard>
                            ))
                          : symbols2.map((card, index) => (
                              <AnswerCard>
                                <Card
                                  round={quizIndex}
                                  key={index}
                                  card={card}
                                  onClick={() => handleCardClick(index)}
                                  isFlipped={true}
                                />
                                {cardPack[quizIndex][card][1]}
                              </AnswerCard>
                            ))}
                      </Cards>
                    </>
                  ) : null}
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
        </Game>
      ) : game === "before" ? (
        <>
          <BeforeGame go={setGame} title="추억의 물건 짝 맞추기" round={2} />
        </>
      ) : game === "end" ? (
        <GameResult
          pass={pass.current}
          score={score.current}
          total={3}
          round={2}
          end={setGame}
        />
      ) : null}
    </>
  );
}

const Game = styled.div`
  position: absolute;
  top: 12vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  /* gap: 4.8vh; */
`;

const Time = styled.div`
  position: absolute;
  /* top: 10vh; */
  left: 11vw;
  gap: 2px;
  font-family: Gaegu;
`;
const TimeDiv = styled.div`
  display: flex;
  width: 118px;
  height: 3.1vh;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  background: #ff7a7a;
  color: #151b26;
  text-align: center;
  font-family: GangwonEduAll;
  font-size: 2.3vh;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Seconds = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: ${(props) => (props.isUrgent ? "#E81B1B" : "#151B26")};
  text-align: center;
  font-size: 7.8vh;
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
  width: 80vw;
  height: 76vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 0.94);
  text-align: center;
  gap: 5.2vh;
  color: #000;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhBee jung";
  font-size: 100px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Comment = styled.div`
  color: ${(props) => props.color};
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhBee jung";
  font-size: 4.8vh;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Cards = styled.div`
  position: relative;
  width: 77vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2.9vh;
`;
const AnswerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 11px;
  color: #151b26;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhBee jung";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const BanClick = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`;
const NextBtn = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  right: 0;
  top: 5.5vh;
`;

const Levelup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: 100px;
`;
const LevelupTitle = styled.div`
  color: #ff0d0d;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhBee jung BOLD";
  font-size: 90px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  color: #151b26;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhBee jung";
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Star = styled.img`
  width: 2.5vw;
  margin-left: -10px;
`;
const Highlight = styled.img`
  width: 15vw;
`;
const CardContainer = styled.div`
  width: 10vw;
  height: 15vw;
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
