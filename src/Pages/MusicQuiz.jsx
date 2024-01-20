import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import musics from "../musicData";
import Player from "react-player";
import GameStartCounter from "../Components/GameStartCounter";
import BeforeGame from "../Components/BeforeGame";
import GameResult from "../Components/GameResult";
import Chance from "../Components/Chance";
import GameCommonStyle from "../utils/GameCommonStyle";
import NowplayingGif from "../sources/images/nowPlaying.gif";
import { ReactComponent as InputPath } from "../sources/images/inputPath.svg";
import { ReactComponent as ReplayIcon } from "../sources/images/replay.svg";
import { ReactComponent as PlayMoreIcon } from "../sources/images/playmore.svg";
import { ReactComponent as PlayIcon } from "../sources/images/playIcon.svg";

export default function MusicQuiz() {
  const [game, setGame] = useState("before");
  const [counter, setCounter] = useState(true);
  const [nowPlaying, setNowPlaying] = useState(false);
  const [nowPlayingIndex, setNowPlayingIndex] = useState(0);
  // const [ready, setReady] = useState(false); 영상 처음 가져올 때 로딩되는 시간이 있어서 재생되는 노래 길이가 조금 다름
  const [chance, setChance] = useState(3);
  const [hint, setHint] = useState(2);
  const [correct, setCorrect] = useState();
  const [roundEnd, setRoundEnd] = useState(false);
  const [userAnswer, setUserAnswer] = useState();

  const [hint1, setHint1] = useState(true);
  const [hint2, setHint2] = useState(true);
  const playerRef = useRef();
  const inputRef = useRef();
  const score = useRef(0);

  useEffect(() => {
    if (counter === false) {
      play3Secs();
    }
  }, [counter]);

  // 재생 관련 함수
  const play = () => {
    playerRef.current.seekTo(0);
    setNowPlaying(true);
  };

  const replay = () => {
    console.log("replay btn clicked!");
    setHint(1);
    setHint1(true);
    playerRef.current.seekTo(0);
    play3Secs();
  };
  const playMore = () => {
    setHint(0);
    setHint2(true);
    play3Secs();
  };
  const play3Secs = () => {
    setNowPlaying(true);
    setTimeout(() => {
      setNowPlaying(false);
    }, 1800);
  };
  const next = () => {
    if (nowPlayingIndex === musics.length - 1) {
      setGame("end");
    }
    setRoundEnd(false);
    setUserAnswer("");
    setNowPlayingIndex(nowPlayingIndex + 1);
    setHint(1);
    setChance(3);
    play3Secs();
  };

  // 답안 제출 함수
  const clickSubmit = () => {
    if (nowPlaying) {
      setNowPlaying(false);
    }
    checkAnswer(userAnswer);
  };
  const enterSubmit = (e) => {
    if (e.key === "Enter") {
      if (nowPlaying) {
        setNowPlaying(false);
      }
      checkAnswer(userAnswer);
    }
  };

  const checkAnswer = (value) => {
    setNowPlaying(false);
    if (
      value === musics[nowPlayingIndex].title[0] ||
      value === musics[nowPlayingIndex].title[1]
    ) {
      score.current = score.current + 1;
      setChance(0);
      setCorrect("정답입니다!^ㅇ^");
      setRoundEnd(true);
      setTimeout(() => {
        setCorrect(null);
      }, 450);
      // if (nowPlayingIndex === musics.length - 1) {
      //   setTimeout(() => {
      //     setGame("end");
      //   }, 2000);
      // }
    } else {
      if (chance !== 0) {
        setUserAnswer("");
      }
      setChance((chance) => chance - 1);
      setCorrect("오답입니다! -.-");
      setTimeout(() => {
        setCorrect(null);
      }, 450);
      // if (chance === 1 && nowPlayingIndex === musics.length - 1) {
      //   setTimeout(() => {
      //     setGame("end");
      //   }, 2000);
      // }
    }
  };

  useEffect(() => {
    if (nowPlayingIndex !== 0) {
      setChance(3);
      setCorrect();
      setHint(2);
      play3Secs();
    } else if (nowPlayingIndex === musics.length - 1) {
      setGame("end");
    }
  }, [nowPlayingIndex]);

  useEffect(() => {
    if (counter) {
      setHint1(true);
    } else if (nowPlaying === true) {
      setHint1(true);
      setHint2(true);
    } else if (nowPlaying === false && hint === 2) {
      setHint1(false);
    } else if (nowPlaying === false && hint === 1) {
      setHint2(false);
    } else if (nowPlaying === false && hint === 0) {
      setHint2(true);
    }
  }, [counter, nowPlaying, hint]);

  useEffect(() => {
    if (roundEnd) {
      setHint1(true);
      setHint2(true);
      play();
    }
  }, [roundEnd]);

  useEffect(() => {
    if (chance === 0) {
      setRoundEnd(true);
    }
  }, [chance]);

  return (
    <>
      <GameCommonStyle />
      {game === "start" ? (
        <Game>
          <PlayerSt
            ref={playerRef}
            playing={nowPlaying}
            controls
            url={`https://www.youtube.com/watch?v=${musics[nowPlayingIndex].id}`}
          />

          {/* 남은 기회 */}
          <Chance total={musics.length} remaining={chance} />

          {/* 문제 진행도 */}
          <Progress>
            {nowPlayingIndex + 1}/{musics.length}
          </Progress>
          <QuizIndex>문제 {nowPlayingIndex + 1}</QuizIndex>
          {roundEnd ? (
            <NextBtn onClick={next}>
              <PlayIcon />
            </NextBtn>
          ) : null}
          {/* 문제 상자 */}
          <QuizDiv>
            {counter ? (
              <GameStartCounter startCount={setCounter} />
            ) : roundEnd ? (
              <AlbumCover>앨범 커버</AlbumCover>
            ) : nowPlaying ? (
              <NowPlayingTrue src={NowplayingGif} />
            ) : (
              <NowPlayingFalse>?</NowPlayingFalse>
            )}
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
              <>
                <AnswerInfo>
                  {musics[nowPlayingIndex].title[0]}-
                  {musics[nowPlayingIndex].artist}(
                  {musics[nowPlayingIndex].year})
                </AnswerInfo>
              </>
            ) : null}
          </QuizDiv>
          <InputDiv>
            <div>답</div>
            <InputBox>
              <InputTagBox
                ref={inputRef}
                placeholder="정답을 입력하세요"
                onKeyPress={enterSubmit}
                value={userAnswer || ""}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={counter || nowPlaying}
              ></InputTagBox>
              <InputPath />
            </InputBox>
            <SubmitBtn onClick={clickSubmit} disabled={counter || nowPlaying}>
              확인
            </SubmitBtn>
          </InputDiv>
          <>
            {hint === 2 || (hint === 1 && chance === 3) ? (
              <>
                <HintBtn
                  onClick={replay}
                  color={counter ? "#FF3E3E" : hint1 ? "#999999" : "#FF3E3E"}
                  disabled={hint1}
                >
                  <ReplayIcon
                    fill={counter ? "#FF3E3E" : hint1 ? "#999999" : "#FF3E3E"}
                  />
                  다시 듣기
                </HintBtn>
              </>
            ) : (
              <>
                <HintBtn
                  onClick={playMore}
                  color={hint2 ? "#999999" : "#FF3E3E"}
                  disabled={hint2}
                >
                  <PlayMoreIcon fill={hint2 ? "#999999" : "#FF3E3E"} />더 듣기
                </HintBtn>
              </>
            )}
          </>
        </Game>
      ) : game === "before" ? (
        <>
          <BeforeGame go={setGame} title="전주 듣고 노래 맞추기" />
        </>
      ) : (
        <GameResult result={score.current} total={musics.length} />
      )}
    </>
  );
}

// 스타일링
const Game = styled.div`
  position: absolute;
  top: 12vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PlayerSt = styled(Player)`
  display: none;
`;

const Progress = styled.div`
  font-size: 36px;
  font-family: SangSangShinb7;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #151b26;
`;
const QuizIndex = styled.div`
  font-size: 90px;
  font-family: SangSangShinb7;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #151b26;
  margin-bottom: 5.4vh;
`;
const NowPlayingTrue = styled.img`
  height: 19vh;
  margin: 0 auto;
`;
const AlbumCover = styled.div`
  width: 19vh;
  height: 19vh;
  background-color: #ececec;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  display: flex;
  /* justify-content: center;
  align-items: center; */
  font-family: "Gaegu";
  font-size: 60px;
  text-align: center;
`;
const NowPlayingFalse = styled.div`
  width: 19vh;
  height: 19vh;
  color: #151b26;
  background-color: #ececec;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Gaegu";
  font-size: 60px;
`;

const QuizDiv = styled.div`
  height: 26vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const InputDiv = styled.div`
  font-family: "SangSangShinb7";
  font-size: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 5.5vh;
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
  font-family: "SangSangShinb7";
  font-size: 44px;
  margin-bottom: 4px;
`;
const SubmitBtn = styled.button`
  border: none;
  background-color: transparent;
  font-family: "SangSangShinb7";
  font-size: 60px;
`;

const HintBtn = styled.button`
  height: 11vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: none;
  background-color: transparent;
  font-family: Gaegu;
  color: ${(props) => (props.color ? props.color : "#151B26")};
  font-size: 30px;
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
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -442px;
`;
const NextBtn = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  right: 9.5vw;
  top: 2vh;
`;
const AnswerInfo = styled.div`
  height: 8.3vh;
  font-family: "Gaegu";
  display: flex;
  align-items: center;
  font-size: 30px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
