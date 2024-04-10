import React, { useState } from "react";
import styled from "styled-components";
import BeforeGame from "../Components/BeforeGame";
import GameResult from "../Components/GameResult";
import GameCommonStyle from "../utils/GameCommonStyle";
export default function GuessingQuiz({ round }) {
  const [game, setGame] = useState("before");
  const [quizIndex, setQuizIndex] = useState(0);
  const [chance, setChance] = useState(10);
  const [question, setQuistion] = useState("");
  const submit = () => {
    setQuistion("");
    setChance((chance) => chance - 1);
  };
  return (
    <>
      <GameCommonStyle color={"#CDEACF"} />
      {game === "start" ? (
        <Game>
          <QuizIndex>문제 {quizIndex + 1}</QuizIndex>
          <Chance>질문/정답 전송 기회 : {chance} / 10</Chance>
          <ChatBox></ChatBox>
          <InputBox>
            <Input
              placeholder="AI에게 할 질문을 입력해주세요."
              value={question || ""}
              onChange={(e) => setQuistion(e.target.value)}
            />
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                fontFamily: "UhBeeJung",
                fontSize: "50px",
              }}
              onClick={submit}
            >
              전송
            </button>
          </InputBox>
        </Game>
      ) : game === "before" ? (
        <BeforeGame go={setGame} title="추억의 간식 스무고개" round={round} />
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
  align-items: center;
`;
const QuizIndex = styled.div`
  font-size: 8.7vh;
  font-family: UhBeeJung;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #151b26;
  margin-bottom: 2.9vh;
`;
const Chance = styled.div`
  font-size: 40px;
  font-family: UhBeeJung;
  margin-bottom: 3.9vh;
`;
const ChatBox = styled.div`
  width: 70vw;
  height: 37vh;
  background-color: #6fa45c;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
`;
const InputBox = styled.div`
  width: 70vw;
  height: 9.7vh;
  background-color: #fff3cd;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;
  padding: 10px 26px 14px 18px;
  font-family: UhBeeJung;
  font-size: 50px;
`;
const Input = styled.input`
  width: 59vw;
  height: 7vh;
  border-radius: 16px;
  background: #fff;
  border: none;
  padding-left: 1.8vw;
  font-size: 40px;
  font-family: Gaegu;
`;
