import React, { useState, useEffect, useRef } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import styled from "styled-components";
import GameCommonStyle from "../utils/GameCommonStyle";
import BeforeGame from "../Components/BeforeGame";
import GameResult from "../Components/GameResult";
import Chance from "../Components/Chance";
import speech from "../speechData";
import playIcon from "../sources/images/Game/playIcon_blue.svg";

import startBtn from "../sources/images/Game/speechQuiz/startBtn.svg";
import stopBtn from "../sources/images/Game/speechQuiz/stopBtn.svg";

import correctImg from "../sources/images/Game/correct.svg";
import wrongImg from "../sources/images/Game/wrong.svg";

export default function SpeechQuiz({}) {
  const totalQuiz = 3;
  const [game, setGame] = useState("before");
  const [nowPlaying, setNowPlaying] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [roundEnd, setRoundEnd] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isFirstTry, setIsFirstTry] = useState(true);
  const [chance, setChance] = useState(2);
  const [correct, setCorrect] = useState();
  const [endAlert, setEndAlert] = useState(false);
  const playerRef = useRef();
  const inputRef = useRef();
  const score = useRef(0);
  const pass = useRef();

  // 음성 전환 로직
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setUserAnswer(result);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setShowPass(true);
    }, 5000);
  }, [quizIndex]);

  // 문제 관련 로직
  const play = () => {
    playerRef.current.currentTime = 0;
    playerRef.current.play();
  };
  const replay = () => {
    playerRef.current.currentTime = 0;
    playerRef.current.play();
  };
  const pauseVideo = () => {
    if (playerRef.current.currentTime >= speech[quizIndex].end && !roundEnd) {
      playerRef.current.pause();
    }
  };
  const handleFirstTry = () => {
    listen();
    setIsFirstTry(false);
  };
  const next = () => {
    if (quizIndex === totalQuiz - 1) {
      setGame("end");
    }
    setRoundEnd(false);
    setUserAnswer(null);
    setQuizIndex(quizIndex + 1);
    setIsFirstTry(true);
    setNowPlaying(false);
    setChance(2);
  };

  useEffect(() => {
    if (chance === 0) {
      setRoundEnd(true);
    }
  }, [chance]);

  useEffect(() => {
    if (roundEnd) {
      play();
    }
  }, [roundEnd]);

  useEffect(() => {
    if (quizIndex === totalQuiz - 1 && roundEnd) {
      setTimeout(() => {
        setEndAlert(true);
      }, 3000);
    }
  }, [quizIndex, roundEnd]);

  const handlePass = () => {
    if (listening) stop();
    if (nowPlaying) setNowPlaying(false);
    setCorrect(false);
    setShowPass(false);
    setRoundEnd(true);
    setTimeout(() => {
      setCorrect(null);
    }, 2000);
  };
  const handleEnd = () => {
    if (score.current >= 2) {
      pass.current = true;
    } else {
      pass.current = false;
    }
    setGame("end");
  };

  const normalization = (s) => {
    let answer = s;
    if (s !== undefined) {
      let reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
      answer = answer.replace(reg, "");
    }
    return answer;
  };
  const clickSubmit = () => {
    if (userAnswer === null) return;
    stop();
    if (!playerRef.current.paused) {
      playerRef.current.pause();
    }
    if (normalization(userAnswer) === normalization(speech[quizIndex].answer)) {
      setCorrect(true);
      score.current = score.current + 1;
      setRoundEnd(true);
      setShowPass(false);
      setTimeout(() => {
        setCorrect(null);
      }, 650);
    } else {
      setCorrect(false);
      setTimeout(() => {
        setCorrect(null);
      }, 900);
      setChance(chance - 1);
      setUserAnswer("");
    }
  };
  function makeBlank(answer) {
    let blank = [];
    let i = 0;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|0-9]/;
    for (i; i <= answer.length; i++) {
      if (korean.test(answer[i])) {
        blank.push("O");
      } else if (answer[i] === " ") {
        blank.push(" ");
      } else {
        blank.push(answer[i]);
      }
    }
    blank = blank.join("");
    return blank;
  }
  return (
    <>
      <GameCommonStyle color={"#CEEAFF"} />
      {game === "start" ? (
        <Game>
          <Container>
            <Header>
              {/* 남은 기회 */}
              <Chance total="2" remaining={chance} />
              <Center>
                {/* 문제 진행도 */}
                <Progress>
                  {quizIndex + 1}/{totalQuiz}
                </Progress>
                <QuizIndex>문제 {quizIndex + 1}</QuizIndex>
              </Center>

              {showPass ? (
                <NextBtn onClick={handlePass} show={showPass}>
                  <span>PASS</span>
                  <img src={playIcon} />
                </NextBtn>
              ) : null}

              {showPass ? null : (
                <NextBtn
                  onClick={next}
                  show={roundEnd && quizIndex !== totalQuiz - 1}
                >
                  <span>다음 문제</span>
                  <img src={playIcon} />
                </NextBtn>
              )}
            </Header>
            <QuizDiv isFirstTry={isFirstTry}>
              <Quiz>
                <Player>
                  <Video
                    src={`./videos/speechQuiz${quizIndex}.mp4#t,${speech[quizIndex].end}`}
                    ref={playerRef}
                    onTimeUpdate={pauseVideo}
                    onClick={replay}
                  />
                </Player>
                {roundEnd ? (
                  <AnswerInfo>
                    <span>
                      {speech[quizIndex].quiz !== undefined
                        ? speech[quizIndex].quiz +
                          " " +
                          speech[quizIndex].answer
                        : speech[quizIndex].answer}
                    </span>
                  </AnswerInfo>
                ) : (
                  <AnswerInfo>
                    {speech[quizIndex].quiz !== undefined
                      ? speech[quizIndex].quiz +
                        " " +
                        makeBlank(speech[quizIndex].answer)
                      : makeBlank(speech[quizIndex].answer)}
                  </AnswerInfo>
                )}
              </Quiz>

              <InputDiv>
                {isFirstTry ? (
                  <Btn
                    onClick={handleFirstTry}
                    isFirstTry={isFirstTry}
                    disabled={roundEnd}
                  >
                    <BtnImg src={startBtn} />
                    <span>답안 녹음하기</span>
                  </Btn>
                ) : (
                  <RecordingInput>
                    <InputBox>
                      <InputTagBox
                        ref={inputRef}
                        value={userAnswer || ""}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled
                      ></InputTagBox>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="482"
                        height="2"
                        viewBox="0 0 482 2"
                        fill="none"
                      >
                        <path
                          d="M1 1L481 1.00004"
                          stroke="#143165"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-dasharray="4 4"
                        />
                      </svg>
                    </InputBox>
                    <BtnDiv>
                      {listening ? (
                        <Btn
                          onClick={stop}
                          isFirstTry={isFirstTry}
                          disabled={roundEnd}
                        >
                          <BtnImg src={stopBtn} />
                          <span>녹음 끝내기</span>
                        </Btn>
                      ) : (
                        <Btn
                          onClick={listen}
                          isFirstTry={isFirstTry}
                          disabled={roundEnd}
                        >
                          <BtnImg src={startBtn} />
                          <span>다시 녹음하기</span>
                        </Btn>
                      )}

                      <Btn
                        onClick={clickSubmit}
                        isFirstTry={isFirstTry}
                        disabled={roundEnd}
                      >
                        답안 제출하기
                      </Btn>
                    </BtnDiv>
                  </RecordingInput>
                )}
              </InputDiv>
            </QuizDiv>
          </Container>
          {correct === true ? (
            <Correct src={correctImg} />
          ) : correct === false ? (
            <Correct src={wrongImg} />
          ) : null}
          {endAlert ? (
            <EndAlert onClick={handleEnd}>게임 종료!</EndAlert>
          ) : null}
        </Game>
      ) : game === "before" ? (
        <>
          <BeforeGame go={setGame} title="대사 이어말하기" round={3} />
        </>
      ) : game === "end" ? (
        <GameResult
          pass={pass.current}
          score={score.current}
          total={3}
          round={3}
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
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7.3vh;
  align-items: start;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 18.8vw;
  margin-right: ${({ showPass }) => (showPass ? "16.9vw" : "14.5vw")};
`;
const Progress = styled.div`
  font-size: 3.5vh;
  font-family: "UhBeeJung";
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #151b26;
`;
const QuizIndex = styled.div`
  font-size: 8.7vh;
  font-family: "UhBeeJung";
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #151b26;
  margin-bottom: 3.3vh;
`;

const QuizDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: ${({ isFirstTry }) => (isFirstTry ? "4.79vw" : "auto")};
  position: relative;
`;
const Quiz = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.9vh;
  color: #151b26;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "Gaegu";
  font-size: 2vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const Player = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
`;
const Video = styled.video`
  height: 34.1vh;
`;
const AnswerInfo = styled.div`
  font-family: "Gaegu";
  display: flex;
  align-items: center;
  font-size: 30px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const InputDiv = styled.div`
  font-family: "UhbeeJung";
  font-size: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2.25vh;
`;
const RecordingInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.8vh;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 34px;
  margin-right: 23px;
`;
const InputTagBox = styled.input`
  border: none;
  background-color: transparent;
  font-family: "UhbeeJung";
  font-size: 44px;
  margin-bottom: 4px;
`;
const BtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
`;
const Btn = styled.button`
  width: ${({ isFirstTry }) => (isFirstTry ? "22.5vw" : "16.5vw")};
  height: ${({ isFirstTry }) => (isFirstTry ? "9.3vw" : "6vw")};
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-family: "UhbeeJung";
  font-size: ${({ isFirstTry }) => (isFirstTry ? "2.3vw" : "1.9vw")};
  color: #151b26;
  border-radius: ${({ isFirstTry }) => (isFirstTry ? "4.1vw" : "2.7vw")};
  border: 0.4px solid #3c7bac;
  background: #eff8ff;
  box-shadow: 2px 4px 4px 0px rgba(0, 81, 155, 0.25);
  background: #eff8ff;
`;
const BtnImg = styled.img`
  width: 0.8vw;
  height: 0.8vw;
`;

const Correct = styled.img`
  width: 65.2vh;
  height: 65.2vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NextBtn = styled.button`
  width: 16.4vw;
  height: 7vh;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1vw;
  color: #151b26;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhBee jung BOLD";
  font-size: 2.7vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  background: transparent;
`;

const EndAlert = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.8);
  font-family: UhBeejungBold;
  font-size: 120px;
  font-weight: 700;
  position: absolute;
  top: -12vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
