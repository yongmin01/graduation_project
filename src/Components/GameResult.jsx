import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Bg from "../sources/images/Game/gameResultBg.svg";
import { ReactComponent as PlayIcon } from "../sources/images/Game/playIcon.svg";
import { ReactComponent as BackToMapPath } from "../sources/images/Game/backtomapPath.svg";
import { ReactComponent as NextPath } from "../sources/images/Game/nextOptionPath.svg";
import itemArrow from "../sources/images/Game/resultPageArrow.svg";
import item1 from "../sources/images/Game/CD.svg";
import item2 from "../sources/images/Game/jetty.svg";
import item3 from "../sources/images/Game/seal.svg";
import deadDiary from "../sources/images/Game/deadDiary.svg";

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

  return (
    <Result>
      <Tittle>결과</Tittle>
      <Score>
        맞힌 문제 :{score}개 / {total}개
      </Score>
      <Comments>
        {pass ? (
          <>
            <Comment>축하합니다!</Comment>
            <Comment>‘{itemName[round]}’아이템을 획득하셨습니다.</Comment>
          </>
        ) : (
          <>
            <Comment>괜찮아요!</Comment>
            <Comment>아직 남은 게임이 있으니까요.</Comment>
            <Comment>이제 또 다른 추억을 만나러 가볼까요?</Comment>
          </>
        )}
      </Comments>
      <Item src={pass ? itemImg[round] : deadDiary} round={round} />
      <Decoration src={itemArrow} />
      <OptionBtn>
        <PlayIcon width="4.1vw" />
        <Option>
          <OptionText onClick={route}>
            {pass ? "다음" : "맵으로 돌아가기"}
          </OptionText>
          {pass ? <NextPath /> : <BackToMapPath />}
        </Option>
      </OptionBtn>
    </Result>
  );
}
const Result = styled.div`
  width: 100%;
  position: absolute;
  top: 12vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  background-image: url(${Bg});
  background-size: 77vw 54vh;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
`;
const Tittle = styled.span`
  color: #151b26;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhBee jung BOLD";
  font-size: 11vh;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 7.8vh;
`;
const Score = styled.div`
  color: #151b26;
  text-align: center;
  font-family: Gaegu;
  font-size: 5vh;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 6.8vh;
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
  /* left: ${(props) =>
    props.round === 0
      ? "7.7vw"
      : props.round === 1
      ? "10.5vw"
      : props.round === 2
      ? "7.9vw"
      : "7.9vw"}; */
  left: 9vw;
  top: 50vh;
`;
const OptionBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  position: absolute;
  right: 12.5vw;
  top: 68vh;
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
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Decoration = styled.img`
  position: absolute;
  top: 52vh;
  left: 23vw;
  width: 4.4vw;
`;
