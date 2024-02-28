import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import GameCommonStyle from "../utils/GameCommonStyle";
import BeforeGame from "../Components/BeforeGame";
import GameResult from "../Components/GameResult";
import Chance from "../Components/Chance";
import ReactPlayer from "react-player";
import speech from "../speechData";
import { ReactComponent as RecordBtn } from "../sources/images/Game/recordBtn.svg";
import { ReactComponent as PlayIcon } from "../sources/images/Game/playIcon.svg";
import { ReactComponent as InputPath } from "../sources/images/Game/inputPath.svg";

export default function SpeechQuiz({ round }) {
  const [game, setGame] = useState("before");
  const [nowPlaying, setNowPlaying] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [roundEnd, setRoundEnd] = useState(false);
  const [userAnswer, setUserAnswer] = useState();
  const [chance, setChance] = useState(2);
  const [correct, setCorrect] = useState();

  const playerRef = useRef();
  const inputRef = useRef();
  const score = useRef(0);

  // 녹음 관련 로직
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [control, setControl] = useState();
  const onRecAudio = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);
    setUserAnswer("");
    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);

      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecoder = new MediaRecorder(stream);
      mediaRecoder.start();
      setStream(stream);
      setMedia(mediaRecoder);
      makeSound(stream);
      analyser.onaudioprocess = function (e) {
        setOnRec(false);
      };
      setTimeout(() => {
        setControl(true);
      }, 3000);
    });
  };
  const offRecAudio = () => {
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });
    media.stop();
    analyser.disconnect();
    source.disconnect();
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl));
      setUserAnswer("녹음 완료");
    }
    const sound = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
    });
    console.log(sound);
  }, [audioUrl]);

  // 문제 관련 로직
  const play = () => {
    playerRef.current.seekTo(speech[quizIndex].start);
    setNowPlaying(true);
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

  const replay = () => {
    playerRef.current.seekTo(speech[quizIndex].start);

    setNowPlaying(true);
    setTimeout(() => {
      setNowPlaying(false);
    }, (speech[quizIndex].end - speech[quizIndex].start) * 1000);
  };

  useEffect(() => {
    if (chance === 0) {
      play();
      setRoundEnd(true);
    }
  }, [chance]);

  const clickSubmit = () => {
    if (nowPlaying) {
      setNowPlaying(false);
    }
    if (userAnswer === "녹음 완료") {
      setCorrect("정답입니다!^ㅇ^");
      score.current = score.current + 1;
      setRoundEnd(true);
      play();
      setTimeout(() => {
        setCorrect(null);
      }, 650);
    } else {
      setCorrect("오답입니다! -.-");
      setTimeout(() => {
        setCorrect(null);
      }, 900);
      setChance(chance - 1);
      console.log("틀림");
    }
  };

  function makeBlank(answer) {
    let blank = [];
    let i = 0;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
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
            <NextBtn onClick={next}>
              <PlayIcon />
            </NextBtn>
          ) : null}
          <QuizDiv>
            <Player>
              <Cover onClick={replay} />
              {/* <Hider> */}
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${speech[quizIndex].id}
                   ?shoinfo="0"&rel="0"`}
                width={"600px"}
                height={"300px"}
                playing={nowPlaying}
                ref={playerRef}
                config={{
                  youtube: {
                    playerVars: {
                      start: speech[quizIndex].start,
                      disablekb: 1,
                    },
                  },
                }}
              />
              {/* </Hider> */}
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
                  {speech[quizIndex].quiz + " " + speech[quizIndex].answer}
                </span>
                {/* <span>
                  {speech[quizIndex].title}-{speech[quizIndex].year}
                </span> */}
              </AnswerInfo>
            ) : (
              <Quiz>
                {speech[quizIndex].quiz +
                  " " +
                  makeBlank(speech[quizIndex].answer)}
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
                disabled={nowPlaying}
              ></InputTagBox>
              <InputPath />
            </InputBox>
            <SubmitDiv>
              <SubmitBtn onClick={clickSubmit} disabled={nowPlaying}>
                제출
              </SubmitBtn>
            </SubmitDiv>
          </InputDiv>
          <Btn onClick={onRec ? onRecAudio : offRecAudio}>
            <span
              style={{
                position: "absolute",
                top: "5px",
                width: "208px",
                height: "90px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {onRec ? "녹음하기" : control ? "녹음 중지" : "녹음중"}
            </span>
            <RecordBtn fill={onRec ? "#E7F5FF" : "#E2E2E2"} />
          </Btn>
          <button onClick={onSubmitAudioFile}>들어보기</button>
        </Game>
      ) : game === "before" ? (
        <>
          <BeforeGame go={setGame} title="대사 이어말하기" round={round} />
        </>
      ) : (
        <GameResult result={score.current} total={3} round={round} />
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
  font-size: 36px;
  font-family: UhBeeJung;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #151b26;
`;
const QuizIndex = styled.div`
  font-size: 90px;
  font-family: UhBeeJung;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #151b26;
  margin-bottom: 34px;
`;
const Player = styled.div`
  width: 600px;
  height: 300px;
  display: flex;
  position: relative;
`;
const Cover = styled.div`
  width: 600px;
  height: 300px;
  position: absolute;
`;
const Hider = styled.div`
  padding-top: 60px;
`;
const Btn = styled.div`
  position: relative;
  font-family: Gaegu;
  font-size: 30px;
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
`;
