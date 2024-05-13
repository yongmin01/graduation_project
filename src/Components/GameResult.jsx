import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import bg from "../sources/images/Game/gameEndingBg.svg";
import { ReactComponent as BackToMapPath } from "../sources/images/Game/optionPath1.svg";
import { ReactComponent as NextPath } from "../sources/images/Game/shortOptionPath.svg";
import itemArrow from "../sources/images/Game/resultPageArrow.svg";
import item1 from "../sources/images/Game/CD.svg";
import item2 from "../sources/images/Game/jetty.svg";
import item3 from "../sources/images/Game/seal.svg";
import deadDiary from "../sources/images/Game/deadDiary.svg";
import playIcon_yellow from "../sources/images/Game/playIcon_yellow.svg";
import playIcon_blue from "../sources/images/Game/playIcon_blue.svg";
import playIcon_green from "../sources/images/Game/playIcon_green.svg";

export default function GameResult({ pass, score, total, round, end }) {
  const itemName = ["실패", "CD", "제티", "띠부띠부씰"];
  const itemImg = [deadDiary, item1, item2, item3];

  const navigator = useNavigate();
  const route = () => {
    if (pass) {
      navigator(`/npc${round}`);
    } else {
      navigator(`/map${round + 1}`);
    }
  };

  const totalDiary = JSON.parse(localStorage.getItem("totalDiary"));
  useEffect(() => {
    if (pass) {
      localStorage.setItem("totalDiary", JSON.stringify([...totalDiary, true]));
    } else {
      localStorage.setItem(
        "totalDiary",
        JSON.stringify([...totalDiary, false])
      );
    }
  }, [pass]);
  return (
    <>
      <BgDiv src={bg} />

      <Result isPass={pass}>
        <Tittle isPass={pass}>결과</Tittle>
        <Score isPass={pass}>
          맞힌 문제 : {score}개 / {total}개
        </Score>
        <Comments>
          {pass ? (
            <>
              <Comment>축하합니다!</Comment>
              <Comment>
                <span style={{ fontWeight: "700" }}>‘{itemName[round]}’</span>
                {round === 3 ? "을" : "를"} 획득하셨습니다.
              </Comment>
            </>
          ) : (
            <>
              <Comment>괜찮아요!</Comment>
              <Comment>아직 남은 게임이 있으니까요.</Comment>
              <Comment>이제 또 다른 추억을 만나러 가볼까요?</Comment>
            </>
          )}
        </Comments>
      </Result>
      <Item src={pass ? itemImg[round] : deadDiary} round={round} pass={pass} />
      {pass ? <Arrow src={itemArrow} round={round} /> : null}
      <OptionBtn>
        {round === 1 ? (
          <img src={playIcon_yellow} />
        ) : round === 2 ? (
          <img src={playIcon_green} />
        ) : (
          <img src={playIcon_blue} />
        )}
        <Option>
          <OptionText onClick={route} round={round} pass={pass}>
            {pass ? "다음" : "맵으로 돌아가기"}
          </OptionText>
          {pass ? <NextPath /> : <BackToMapPath />}
        </Option>
      </OptionBtn>
    </>
  );
}

const BgDiv = styled.img`
  width: 75.3vw;
  height: 54.7vh;
  position: absolute;
  top: 11.3vh;
  left: 10.5vw;
`;
const Result = styled.div`
  width: 100%;
  position: absolute;
  top: ${({ isPass }) => (isPass ? "16.6vh" : "12.2vh")};
  text-align: center;
  display: flex;
  flex-direction: column;
`;
const Tittle = styled.span`
  color: #151b26;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhBee jung BOLD";
  font-size: 10.7vh;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: ${({ isPass }) => (isPass ? "8.8vh" : "6.9vh")};
`;
const Score = styled.div`
  color: #151b26;
  text-align: center;
  font-family: Gaegu;
  font-size: 5vh;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: ${({ isPass }) => (isPass ? "6.8vh" : "5.4vh")};

  /* &:before {
    content: "";
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 38.4vw;
    height: 1.9vh;
    background: rgba(255, 216, 216, 0.8);
    filter: blur(15px);
    border-radius: 10px;
  } */
`;
const Comments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5vh;
`;
const Comment = styled.span`
  color: #151b26;
  text-align: center;
  font-family: Gaegu;
  font-size: 5vh;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Item = styled.img`
  position: absolute;
  left: ${({ round, pass }) =>
    pass
      ? round === 1
        ? "13.7vw"
        : round === 2
        ? "18.5vw"
        : "15.3vw"
      : "13.8vw"};
  top: ${({ round, pass }) =>
    pass
      ? round === 1
        ? "60.5vh"
        : round === 2
        ? "58.6vh"
        : "58.6vh"
      : "59.9vh"};
  height: 28.5vh;
`;
const Arrow = styled.img`
  position: absolute;
  left: ${({ round }) =>
    round === 1 ? "34.4vw" : round === 2 ? "31vw" : "30.9vw"};
  top: ${({ round }) =>
    round === 1 ? "67.9vh" : round === 2 ? "66.6vh" : "68.6vh"};
  width: 4.4vw;
`;
const OptionBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  position: absolute;
  right: 12.5vw;
  bottom: 13.8vh;
`;
const Option = styled.div`
  display: flex;
  flex-direction: column;
`;
const OptionText = styled.span`
  color: #151b26;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhBee jung";
  font-size: ${({ pass }) => (pass ? "5.8vh" : "5.3vh")};
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-40%, -50%);
    width: 80%;
    height: 60%;
    background-color: ${({ round }) =>
      round === 1
        ? "rgba(248, 212, 24, 0.2)"
        : round === 2
        ? "rgba(27, 199, 70, 0.371)"
        : "rgba(27, 127, 199, 0.371)"};
    filter: blur(15px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${Option}:hover &:before {
    opacity: 1;
  }
`;
