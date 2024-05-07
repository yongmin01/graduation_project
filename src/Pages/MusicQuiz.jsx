import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import musics from "../musicData";
import Player from "react-player";
import GameStartCounter from "../Components/GameStartCounter";
import useEffectSound from "../utils/EffectSound";
import countDownSound from "../sources/sound/Game/countDown.mp3";
import BeforeGame from "../Components/BeforeGame";
import GameResult from "../Components/GameResult";
import Chance from "../Components/Chance";
import GameCommonStyle from "../utils/GameCommonStyle";
import NowplayingGif from "../sources/images/Game/nowPlaying.gif";
import inputPath from "../sources/images/Game/inputPath.svg";
import playIcon from "../sources/images/Game/playIcon_yellow.svg";
import correctImg from "../sources/images/Game/correct.svg";
import wrongImg from "../sources/images/Game/wrong.svg";

export default function MusicQuiz({}) {
  const totalQuiz = 5;
  const [game, setGame] = useState("before");
  const [endAlert, setEndAlert] = useState(false);
  const [counter, setCounter] = useState(true);
  const [nowPlaying, setNowPlaying] = useState(false);
  const [nowPlayingIndex, setNowPlayingIndex] = useState(0);
  const [chance, setChance] = useState(3);
  const [correct, setCorrect] = useState(null);
  const [roundEnd, setRoundEnd] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentTime, setCurrentTime] = useState(0);

  const [showPass, setShowPass] = useState(false);
  const [showArtist, setShowArtist] = useState(false);
  const [hint1Left, setHint1Left] = useState(3);
  const [hint2Left, setHint2Left] = useState(true);
  const [usingHint2, setUsingHint2] = useState(false);
  const [hint3Left, setHint3Left] = useState(true);

  const playerRef = useRef();
  const inputRef = useRef();
  const score = useRef(0);
  const pass = useRef();

  const countDownEffect = useEffectSound(countDownSound, 2);
  useEffect(() => {
    if (game === "start") {
      countDownEffect.play();
    }
  }, [game]);
  useEffect(() => {
    if (counter === false) {
      playerRef.current.seekTo(0);
      setNowPlaying(true);
      setTimeout(() => {
        setShowPass(true);
      }, 5000);
    }
  }, [counter]);

  // 재생 관련 함수
  const play = () => {
    playerRef.current.seekTo(0);
    setNowPlaying(true);
  };

  useEffect(() => {
    if (usingHint2) {
      if (currentTime.playedSeconds >= 5) {
        setNowPlaying(false);
        setUsingHint2(false);
      }
    } else if (currentTime.playedSeconds >= 2) {
      if (!roundEnd) {
        setNowPlaying(false);
      }
    }
  }, [currentTime]);

  const next = () => {
    setRoundEnd(false);
    setUserAnswer("");
    setNowPlayingIndex(nowPlayingIndex + 1);
    setHint1Left(3);
    setHint2Left(true);
    setHint3Left(true);
    setShowArtist(false);
    setChance(3);
    play();
  };

  const handlePass = () => {
    setRoundEnd(true);
    setShowPass(false);

    setCorrect(false);
    setTimeout(() => {
      setCorrect(null);
    }, 2000);
  };
  // 힌트 사용 함수
  const useHint1 = () => {
    if (hint1Left > 0 && !nowPlaying) {
      setHint1Left(hint1Left - 1);
      play();
    }
  };
  const useHint2 = () => {
    if (hint2Left && !nowPlaying) {
      setHint2Left(false);
      setUsingHint2(true);
    }
  };
  useEffect(() => {
    if (usingHint2) {
      playerRef.current.seekTo(0);
      setNowPlaying(true);
    }
  }, [usingHint2]);
  const useHint3 = () => {
    if (hint3Left && !roundEnd) {
      setShowArtist(true);
      setHint3Left(false);
    }
  };
  // 답안 제출 관련 함수

  const clickSubmit = () => {
    if (nowPlaying) {
      setNowPlaying(false);
    }
    checkAnswer(normalization(userAnswer));
  };
  const enterSubmit = (e) => {
    if (e.key === "Enter") {
      if (nowPlaying) {
        setNowPlaying(false);
      }
      checkAnswer(normalization(userAnswer));
    }
  };
  const normalization = (s) => {
    let answer = s;
    if (s !== undefined) {
      answer = s.replace(/ /g, "");
      const en = /[a-zA-Z]/;
      if (en.test(answer)) {
        answer = answer.toLowerCase();
      }
    }
    return answer;
  };
  const checkAnswer = (value) => {
    // setNowPlaying(false);
    const answer1 = normalization(musics[nowPlayingIndex].title[0]);
    const answer2 = normalization(musics[nowPlayingIndex].title[1]);
    if (value === answer1 || value === answer2) {
      score.current = score.current + 1;
      setCorrect(true);
      setShowArtist(true);
      setUserAnswer(musics[nowPlayingIndex].title[0]);
      setShowPass(false);
      setRoundEnd(true);
      setTimeout(() => {
        setCorrect(null);
      }, 2000);
    } else {
      if (chance !== 0) {
        setUserAnswer("");
      }
      setChance((chance) => chance - 1);
      setCorrect(false);
      setTimeout(() => {
        setCorrect(null);
      }, 2000);
    }
  };

  useEffect(() => {
    if (game === "start") {
      setChance(3);
      setCorrect();
      setHint1Left(3);
      setHint2Left(true);
      setHint3Left(true);
      setShowPass(false);
      setTimeout(() => {
        setShowPass(true);
      }, 5000);
      setNowPlaying(true);
    }
  }, [nowPlayingIndex]);

  useEffect(() => {
    if (roundEnd) {
      play();
      setUserAnswer(musics[nowPlayingIndex].title[0]);
      setShowArtist(true);
    }
  }, [roundEnd]);

  useEffect(() => {
    if (chance === 0) {
      setRoundEnd(true);
    }
  }, [chance]);

  useEffect(() => {
    if (nowPlayingIndex === totalQuiz - 1 && roundEnd) {
      setTimeout(() => {
        setEndAlert(true);
      }, 3000);
    }
  }, [nowPlayingIndex, roundEnd]);

  const handleEnd = () => {
    if (score.current >= 3) {
      pass.current = true;
    } else {
      pass.current = false;
    }
    setGame("end");
  };

  useEffect(() => {
    if (inputRef.current) {
      if (!nowPlaying) {
        inputRef.current.focus();
      }
    }
  }, [nowPlaying]);

  return (
    <>
      <GameCommonStyle color={"#ffedb3"} />
      {game === "start" ? (
        <Game>
          <PlayerSt
            ref={playerRef}
            playing={nowPlaying}
            controls
            url={`https://www.youtube.com/watch?v=${musics[nowPlayingIndex].id}`}
            onProgress={setCurrentTime}
          />

          <Header>
            {/* 남은 기회 */}
            <Chance total="3" remaining={chance} />

            {/* 문제 진행도 */}
            <Center>
              <Progress>
                {nowPlayingIndex + 1}/{musics.length}
              </Progress>
              <QuizIndex>문제 {nowPlayingIndex + 1}</QuizIndex>
            </Center>

            {/* 패스 또는 다음 문제*/}
            {showPass ? (
              <NextBtn onClick={handlePass} show={showPass}>
                <span>PASS</span>
                <img src={playIcon} />
              </NextBtn>
            ) : null}
            {showPass ? null : (
              <NextBtn
                onClick={next}
                show={roundEnd && nowPlayingIndex !== totalQuiz - 1}
              >
                <span>다음 문제</span>
                <img src={playIcon} />
              </NextBtn>
            )}
          </Header>

          {/* 문제 상자 */}
          <Container>
            {counter ? (
              <GameStartCounter startCount={setCounter} />
            ) : (
              <>
                <Quiz>
                  <PlayBox>
                    {roundEnd ? (
                      <AlbumCover
                        src={`https://img.youtube.com/vi/${musics[nowPlayingIndex].id}/hqdefault.jpg`}
                      />
                    ) : nowPlaying ? (
                      <NowPlayingTrue src={NowplayingGif} />
                    ) : (
                      <NowPlayingFalse>?</NowPlayingFalse>
                    )}
                  </PlayBox>
                  <QuizRightDiv>
                    <Artist show={showArtist}>
                      가수: {musics[nowPlayingIndex].artist}
                    </Artist>

                    <InputDiv>
                      <InputBox>
                        <InputTagBox
                          ref={inputRef}
                          placeholder="정답을 입력하세요"
                          onKeyPress={enterSubmit}
                          value={userAnswer || ""}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          disabled={counter || nowPlaying}
                        ></InputTagBox>
                        <img src={inputPath} width="552px" />
                      </InputBox>

                      <SubmitBtn
                        onClick={clickSubmit}
                        disabled={counter || nowPlaying}
                      >
                        제출
                        <SubmitBtnHighlight />
                      </SubmitBtn>
                    </InputDiv>
                  </QuizRightDiv>
                </Quiz>
                <HintDiv>
                  <Hint onClick={useHint1} color={hint1Left > 0}>
                    다시 듣기({hint1Left})
                  </Hint>
                  <Hint onClick={useHint2} color={hint2Left}>
                    더 듣기
                  </Hint>
                  <Hint onClick={useHint3} color={hint3Left}>
                    가수 공개
                  </Hint>
                </HintDiv>
              </>
            )}
            {correct === true ? (
              <Correct src={correctImg} />
            ) : correct === false ? (
              <Correct src={wrongImg} />
            ) : null}
          </Container>

          <>
            {endAlert ? (
              <EndAlert onClick={handleEnd}>게임 종료!</EndAlert>
            ) : null}
          </>
        </Game>
      ) : game === "before" ? (
        <>
          <BeforeGame go={setGame} title="전주 듣고 노래 맞추기" round={1} />
        </>
      ) : game === "end" ? (
        <GameResult
          pass={pass.current}
          score={score.current}
          total={5}
          round={1}
          end={setGame}
        />
      ) : null}
    </>
  );
}

// 스타일링
const Game = styled.div`
  position: absolute;
  top: 13.8vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlayerSt = styled(Player)`
  display: none;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10.5vh;
`;
const Center = styled.div`
  width: 16vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 13.3vw;
  margin-right: ${({ showPass }) => (showPass ? "16.9vw" : "13.4vw")};
`;
const Progress = styled.div`
  font-size: 2.5vw;
  font-family: "UhbeeJung";
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #151b26;
`;
const QuizIndex = styled.div`
  font-size: 6.2vw;
  font-family: "UhbeeJung";
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #151b26;
  width: max-content;
`;

const NextBtn = styled.button`
  width: 16.4vw;
  height: 7vh;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 1vw;
  /* margin-bottom: 1.1vh; */
  color: #151b26;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhBeejungBold";
  font-size: 2.7vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  background: transparent;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10.4vh;
`;

const Quiz = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// 문제 재생 상태 및 앨범 커버 박스
const PlayBox = styled.div`
  height: 23.8vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NowPlayingTrue = styled.img`
  height: 17.7vh;
  height: 19vh;
`;
const NowPlayingFalse = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23.8vh;
  height: 23.8vh;
  background: #ececec;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  color: #151b26;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "Gaegu";
  font-size: 6.2vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const AlbumCover = styled.div`
  width: 23.8vh;
  height: 23.8vh;
  background-image: url(${(props) => props.src});
  background-size: 150%;
  background-position: center center;
  background-repeat: no-repeat;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
`;

// 가수명, 답안 제출 상자
const QuizRightDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  margin-top: 5vh;
`;
const Artist = styled.div`
  color: #151b26;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  font-family: "Gaegu";
  font-size: 2.5vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 3.6px;
`;

const InputDiv = styled.div`
  width: 45.8vw;
  font-family: "UhbeeJung";
  font-size: 2.5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5.5vh;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputTagBox = styled.input`
  border: none;
  background-color: transparent;
  font-family: "Gaegu";
  font-size: 44px;
  margin-bottom: 4px;
  color: #151b26;
`;

const SubmitBtnHighlight = styled.div`
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 5.5vw;
  height: 14px;
  background-color: #fad51c;
  filter: blur(15px);
  opacity: 0; /* 변경 */
  transition: opacity 0.3s ease;
`;
const SubmitBtn = styled.button`
  position: relative;
  border: none;
  background-color: transparent;
  font-family: "UhbeeJung";
  color: #151b26;
  font-size: 3.2vw;
  &:hover ${SubmitBtnHighlight} {
    opacity: 1;
  }
`;

// 힌트 버튼
const HintDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.7vw;
`;
const Hint = styled.div`
  width: 20.8vw;
  height: 8.59vh;
  border-radius: 80px;
  background-color: ${(props) => (props.color ? "#FFE566" : "#C1C1C1")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.color ? "#000" : "#656565")};
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "Gaegu";
  font-size: 3.19vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:hover {
    background-color: ${(props) => (props.color ? "#ffc329" : "#C1C1C1")};
  }
`;

const Correct = styled.img`
  width: 65.2vh;
  height: 65.2vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const EndAlert = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: -13.8vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.8);
  font-family: "UhBeejungBold";
  font-size: 8.3vw;
  font-weight: 700;
`;
