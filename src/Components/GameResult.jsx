import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Bg from "../sources/images/Game/gameEndingBg.png";
import { ReactComponent as PlayIcon } from "../sources/images/Game/playIcon.svg";
import { ReactComponent as BackToMapPath } from "../sources/images/Game/backtomapPath.svg";
import cd from "../sources/images/Game/CD.svg";
import jetty from "../sources/images/Game/jetty.svg";
import seal from "../sources/images/Game/seal.svg";
import deadDiary from "../sources/images/Game/deadDiary.svg";

export default function GameResult({ pass, score, total, round, end }) {
  const items = [cd, jetty, seal, deadDiary];
  const navigator = useNavigate();
  const route = () => {
    if (pass) {
      navigator(`/npc${round}`);
    } else {
      navigator(`/map${round + 1}`);
    }
  };

  return (
    <Result>
      <Content>
        <Title>결과</Title>
        <ScoreDiv>
          <Score>
            맞힌 문제 : {score}개 / {total}개
          </Score>
        </ScoreDiv>

        <>
          {pass ? (
            <>
              <ResultComment>축하합니다</ResultComment>
              <Highlight>일기장을 획득하셨습니다.</Highlight>
            </>
          ) : (
            <>
              <ResultComment>괜찮아요!</ResultComment>
              <ResultComment>아직 남은 게임이 있으니까요.</ResultComment>
              <ResultComment>
                이제 또 다른 추억을 만나러 가볼까요?
              </ResultComment>
              <DeadDiary src={items[3]} />
            </>
          )}
        </>
      </Content>
      <OptionBtn>
        <PlayIconSt />
        <Option>
          <OptionText onClick={route}>
            {pass ? "일기장 획득하기" : "맵으로 돌아가기"}
          </OptionText>
          <BackToMapPath />
        </Option>
      </OptionBtn>
    </Result>
  );
}
const Result = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  /* background-image: url(${Bg});
  background-size: 84% 77%;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed; */
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 5vh;
`;
const Content = styled.div`
  position: absolute;
  top: 12vh;
`;

const Title = styled.div`
  font-family: UhbeeJung;
  font-size: 11vh;
  margin-bottom: 6.9vh;
`;
const ScoreDiv = styled.div`
  position: relative;
`;
const Score = styled.div`
  font-family: Gaegu;
  color: #151b26;
  font-weight: 700;
  margin-bottom: 4.4vh;
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 60%;
    background-color: rgba(255, 216, 216, 0.8);
    filter: blur(15px);
  }
`;
const ResultComment = styled.div`
  font-family: Gaegu;
  color: #151b26;
`;
const Highlight = styled.div`
  width: 856px;
  height: 66px;
  font-family: Gaegu;
  color: #151b26;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ffdd2c;
`;
const OptionBtn = styled.button`
  width: min-content;
  display: flex;
  flex-direction: row;
  background-color: transparent;
  border: none;
  align-items: center;
  position: absolute;
  right: 12vw;
  bottom: 10vh; // 수정
`;
const PlayIconSt = styled(PlayIcon)`
  width: 60px;
  height: 59px;
`;
const Option = styled.div`
  position: relative;
`;
const OptionText = styled.div`
  color: #151b26;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhbeeJung";
  font-size: 60px;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 60%;
    background-color: rgba(248, 212, 24, 0.2);
    filter: blur(15px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${Option}:hover &:before {
    opacity: 1;
  }
`;

const DeadDiary = styled.img`
  position: absolute;
  left: 5.8vw;
  bottom: 7.4vh;
`;
