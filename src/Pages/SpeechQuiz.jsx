import React, { useState, useEffect, useRef } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import styled from "styled-components";
import GameCommonStyle from "../utils/GameCommonStyle";
import BeforeGame from "../Components/BeforeGame";
import GameResult from "../Components/GameResult";
import Chance from "../Components/Chance";
import speech from "../speechData";
import { ReactComponent as RecordBtn } from "../sources/images/Game/recordBtn.svg";
import { ReactComponent as PlayIcon } from "../sources/images/Game/playIcon.svg";
import { ReactComponent as InputPath } from "../sources/images/Game/inputPath.svg";
import startBtn from "../sources/images/Game/startBtn.svg";
import stopBtn from "../sources/images/Game/stopBtn.svg";
import { useNavigate } from "react-router-dom";

export default function SpeechQuiz({}) {
  const [game, setGame] = useState("before");
  const [nowPlaying, setNowPlaying] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [roundEnd, setRoundEnd] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
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
  const next = () => {
    if (quizIndex === 3 - 1) {
      setGame("end");
    }
    setRoundEnd(false);
    setUserAnswer("");
    setQuizIndex(quizIndex + 1);
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
    if (quizIndex === 3 - 1 && roundEnd) {
      setTimeout(() => {
        setEndAlert(true);
      }, 3000);
    }
  }, [quizIndex, roundEnd]);

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
    if (!playerRef.current.paused) {
      playerRef.current.pause();
    }
    if (normalization(userAnswer) === normalization(speech[quizIndex].answer)) {
      setCorrect("정답입니다!^ㅇ^");
      score.current = score.current + 1;
      setRoundEnd(true);

      setTimeout(() => {
        setCorrect(null);
      }, 650);
    } else {
      setCorrect("오답입니다! -.-");
      setTimeout(() => {
        setCorrect(null);
      }, 900);
      setChance(chance - 1);
      setUserAnswer("");
      console.log("틀림");
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
          {/* 남은 기회 */}
          <Chance total="2" remaining={chance} />
          {/* 문제 진행도 */}
          <Progress>{quizIndex + 1}/3</Progress>
          <QuizIndex>문제 {quizIndex + 1}</QuizIndex>
          {roundEnd ? (
            quizIndex !== 2 ? (
              <NextBtn onClick={next}>
                <PlayIcon />
              </NextBtn>
            ) : null
          ) : null}
          <QuizDiv>
            <Player>
              {/* <Cover onClick={replay} /> */}
              {/* <Hider> */}
              <video
                src={`/videos/speechQuiz${quizIndex}.mov#t,${speech[quizIndex].end}`}
                ref={playerRef}
                onTimeUpdate={pauseVideo}
                onClick={replay}
              />
            </Player>
            {correct != null ? (
              <Correct
                color={correct === "정답입니다!^ㅇ^" ? "#13BF33" : "#FF3E3E"}
                bgcolor={correct === "정답입니다!^ㅇ^" ? "#F5FFF5" : "#FFF5F5"}
                shadowcolor={
                  correct === "정답입니다!^ㅇ^"
                    ? "127, 191, 139, 0.25"
                    : "255, 62, 62, 0.20"
                }
              >
                {correct}
              </Correct>
            ) : roundEnd ? (
              <AnswerInfo>
                <span>
                  {speech[quizIndex].quiz !== undefined
                    ? speech[quizIndex].quiz + " " + speech[quizIndex].answer
                    : speech[quizIndex].answer}
                </span>
                {/* <span>
                  {speech[quizIndex].title}-{speech[quizIndex].year}
                </span> */}
              </AnswerInfo>
            ) : (
              <Quiz>
                {speech[quizIndex].quiz !== undefined
                  ? speech[quizIndex].quiz +
                    " " +
                    makeBlank(speech[quizIndex].answer)
                  : makeBlank(speech[quizIndex].answer)}
              </Quiz>
            )}
          </QuizDiv>
          <InputDiv>
            <div>답</div>
            <InputBox>
              <InputTagBox
                ref={inputRef}
                placeholder="정답을 입력하세요"
                value={userAnswer || ""}
                onChange={(e) => setUserAnswer(e.target.value)}
              ></InputTagBox>
              <InputPath />
            </InputBox>
            <SubmitDiv>
              <SubmitBtn onClick={clickSubmit} disabled={nowPlaying}>
                제출
              </SubmitBtn>
            </SubmitDiv>
          </InputDiv>
          <Btn onClick={listening ? stop : listen}>
            <BtnContent>
              {listening ? <img src={stopBtn} /> : <img src={startBtn} />}
              <span>{listening ? "녹음 완료" : "녹음하기"}</span>
            </BtnContent>
            <RecordBtn width="14vw" height="8.7vh" fill="#E7F5FF" />
          </Btn>
          {endAlert ? (
            <EndAlert onClick={handleEnd}>게임 종료!</EndAlert>
          ) : null}
        </Game>
      ) : game === "before" ? (
        <>
          <BeforeGame go={setGame} title="대사 이어말하기" round={2} />
        </>
      ) : (
        <GameResult
          pass={pass.current}
          score={score.current}
          total={3}
          round={2}
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
  margin-bottom: 3.3vh;
`;
const Player = styled.div`
  width: 58vh;
  height: 29vh;
  display: flex;
  position: relative;
  justify-content: center;
`;
const Cover = styled.div`
  height: 29vh;
  position: absolute;
`;

const Btn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  font-family: Gaegu;
  font-size: 30px;
  width: 14vw;
  height: 8.7vh;
`;
const BtnContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  position: absolute;
  top: 5px;
  width: 14vw;
  height: 8.7vh;
`;
const NextBtn = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  right: 9.5vw;
  top: 2vh;
`;
const InputDiv = styled.div`
  font-family: "UhbeeJung";
  font-size: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2.25vh;
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
const SubmitDiv = styled.div`
  position: relative;
`;
const SubmitBtn = styled.div`
  border: none;
  background-color: transparent;
  font-family: "UhbeeJung";
  font-size: 50px;
  color: #151b26;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 60%;
    background-color: rgba(27, 127, 199, 0.371);
    filter: blur(15px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${SubmitDiv}:hover &:before {
    opacity: 1;
  }
`;

const Correct = styled.div`
  width: 884px;
  height: 8.3vh;
  border-radius: 10px;
  color: ${(props) => props.color};
  background: ${(props) => props.bgcolor};
  box-shadow: 0px 4px 10px 0px rgba(${(props) => props.shadowcolor});
  margin-bottom: 1.5vh;
  font-family: "Gaegu";
  font-size: 50px;
  text-align: center;
`;
const AnswerInfo = styled.div`
  height: 8.3vh;
  font-family: "Gaegu";
  display: flex;
  align-items: center;
  font-size: 30px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Quiz = styled.span`
  font-size: 30px;
  font-family: Gaegu;
`;

const QuizDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 35vh;
  margin-bottom: 0.5vh;
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
