import React, { useState } from "react";
import styled from "styled-components";
import OptionsPath from "../sources/images/optionsBg.svg";
import { ReactComponent as OptionPathOne } from "../sources/images/gameStartPath.svg";
import { ReactComponent as OptionPathTwo } from "../sources/images/descriptionPath.svg";
import { ReactComponent as PlayIcon } from "../sources/images/playIcon.svg";
import { ReactComponent as StartPath } from "../sources/images/sbGameStartPath.svg";
import radioImg from "../sources/images/radio.png";
import flower from "../sources/images/flower.png";
import sprinkle from "../sources/images/sprinkle.png";
export default function BeforeGame({ go, title }) {
  const [description, setDescription] = useState(false);
  return (
    <>
      {description ? (
        <>
          {/* 게임 설명 화면 */}
          <Description>
            <DescTitle>
              <DescTitleText>게임 방법</DescTitleText>
              <Elipse />
            </DescTitle>
            <Line>
              노래는 3초 카운트다운 후 전주가 <Word color="#0CA42D">1.5초</Word>{" "}
              재생됩니다. <br />한 문제 당 정답 제출 기회는 딱{" "}
              <Word color="#0F98F4">3번!</Word>
              <br />
              힌트는 <Word color="#9B3AE8">‘다시 듣기’, ‘3초 더 듣기’</Word>가
              있어요.
              <br />
              <SmallLine>
                다시 듣기 : 정답 기회가 있을 때 언제든 딱 1번 사용할 수
                있습니다.
                <br />
                3초 더 듣기 : 한 번 틀렸을 때에만 주어지는 특별 힌트! <br />
              </SmallLine>
              총 <Word color="#F13C93">5라운드</Word>의 게임, 3라운드 이상
              정답을 맞춰야 일기장을 <br />
              획득할 수 있습니다. 한 번 도전해보세요!
            </Line>
          </Description>
          <Sprinkle src={sprinkle} />
          <Flower src={flower} />
          <GameStartDiv>
            <OptionBtn>
              <PlayIconSt />
              <Option>
                <OptionText onClick={() => go("start")}>시작!</OptionText>
                <StartPath />
              </Option>
            </OptionBtn>
          </GameStartDiv>
        </>
      ) : (
        // 게임 시작 or 게임 설명 선택
        <>
          <Decoration1>귀 기울여 집중!!</Decoration1>
          <TitleStyled>{title}</TitleStyled>
          <Radio src={radioImg} />
          <Options>
            <OptionBtn onClick={() => go("start")}>
              <PlayIconSt />
              <Option>
                <OptionText>게임 시작</OptionText>
                <OptionPathOne />
              </Option>
            </OptionBtn>
            <OptionBtn onClick={() => setDescription(true)}>
              <PlayIconSt />
              <Option>
                <OptionText>게임 설명</OptionText>
                <OptionPathTwo />
              </Option>
            </OptionBtn>
          </Options>
        </>
      )}
    </>
  );
}
const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  position: absolute;
  left: 126px;
  top: 10vh;
`;
const DescTitle = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-bottom: 5vh;
`;
const DescTitleText = styled.div`
  display: flex;
  flex-direction: row;
  font-family: SangSangShinb7;
  font-size: 100px;
  color: #151b26;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const Elipse = styled.div`
  width: 54px;
  height: 52px;
  border-radius: 50px;
  background-color: #ffd28f;
  position: absolute;
  top: 13px;
  left: 301px;
`;
const Line = styled.div`
  font-family: "Gaegu";
  font-size: 5vh;
  color: #151b26;
  white-space: nowrap;
`;
const SmallLine = styled.div`
  font-family: Gaegu;
  font-size: 3.5vh;
  margin-left: 25px;
  margin-bottom: 10px;
`;
const Word = styled.span`
  color: ${(props) => (props.color ? props.color : "#151B26")};
  white-space: nowrap;
`;

// 게임 시작 or 게임 방법
const Decoration1 = styled.div`
  width: 344px;
  height: 98px;
  border-radius: 50%;
  background: #fad615;
  font-family: SangSangShinb7;
  position: absolute;
  right: 165px;
  top: 22vh;
  font-size: 50px;
  text-align: center;
`;
const TitleStyled = styled.div`
  position: absolute;
  top: 30vh;
  text-align: center;
  width: 100%;
  font-family: "SangSangShinb7";
  font-size: 2rem;
`;
const Radio = styled.img`
  /* width: 43vw; */
  height: 45vh;
  position: absolute;
  left: 55px;
  bottom: 9vh; /* 비율 수정 */
`;
const Sprinkle = styled.img`
  height: 11vh;
  position: absolute;
  right: 156px;
  top: 40vh;
`;
const Flower = styled.img`
  height: 12vh;
  position: absolute;
  left: 88px;
  bottom: 6vh;
`;
const GameStartDiv = styled.div`
  position: absolute;
  right: 11vw;
  bottom: 11vh;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${OptionsPath});
  /* width: min-content; */
  height: 39vh;
  padding: 88px 119px 89px 110px;
  background-repeat: no-repeat;
  background-position: center;
  /* background-size: contain; */
  position: absolute;
  right: 6vw;
  bottom: 10vh;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
const OptionBtn = styled.button`
  width: min-content;
  height: 104.22px;
  display: flex;
  flex-direction: row;
  background-color: transparent;
  border: none;
  align-items: center;
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
  font-family: "SangSangShinb7";
  font-size: 1rem;
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
