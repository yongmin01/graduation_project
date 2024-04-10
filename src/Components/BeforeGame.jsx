import React, { useState } from "react";
import styled from "styled-components";
import OptionsPath from "../sources/images/Game/optionsBg.svg";
import { ReactComponent as OptionPathOne } from "../sources/images/Game/gameStartPath.svg";
import { ReactComponent as OptionPathTwo } from "../sources/images/Game/descriptionPath.svg";
import { ReactComponent as PlayIcon } from "../sources/images/Game/playIcon.svg";
import { ReactComponent as StartPath } from "../sources/images/Game/sbGameStartPath.svg";
import { ReactComponent as RecordBtn } from "../sources/images/Game/recordBtn.svg";

// 음악퀴즈 장식
import radioImg from "../sources/images/Game/radio.png";
import speaker from "../sources/images/Game/speaker.png";
import flower from "../sources/images/Game/flower.png";
import sprinkle from "../sources/images/Game/sprinkle.png";

// 방송퀴즈 장식
import boy from "../sources/images/Game/speech_boy.png";
import girl from "../sources/images/Game/speech_girl.png";

export default function BeforeGame({ go, title, round }) {
  const [description, setDescription] = useState(false);
  return (
    <>
      {description ? (
        <>
          {/* 게임 설명 화면 */}
          <Description>
            <DescTitle>
              <DescTitleText>게임 방법</DescTitleText>
              {window.location.pathname === "/music" ? <Elipse /> : null}
            </DescTitle>
            {window.location.pathname === "/music" ? ( // 음악 퀴즈
              <Line>
                노래는 3초 카운트다운 후 전주가{" "}
                <Word color="#0CA42D">1.5초</Word> 재생됩니다. <br />한 문제 당
                정답 제출 기회는 딱 <Word color="#0F98F4">3번!</Word>
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
            ) : window.location.pathname === "/speech" ? ( // 방송 퀴즈
              <Line>
                3초 카운트다운 후 <Word color="#FF4BCD">짧은 영상이 재생</Word>
                됩니다. <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    marginLeft: "-30px",
                  }}
                >
                  다음에 올 대사를{" "}
                  <Btn>
                    <span
                      style={{
                        position: "absolute",
                        top: "5px",
                        width: "14vw",
                        height: "8.7vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "30px",
                      }}
                    >
                      녹음하기
                    </span>
                    <RecordBtn fill="#E7F5FF" width="200px" height="90px" />
                  </Btn>
                  버튼을 눌러 말해주세요! <br />
                </div>
                영상은 제출 전까지 계속 재생 가능합니다. <br />
                녹음 기회는 <Word color="#08C832">무제한</Word>, 답안 제출
                기회는 <Word color="#00D4C7">2번</Word>입니다.
                <br />총 <Word color="#005AFF">5라운드</Word>의 게임, 3라운드
                이상 정답을 맞춰야 일기장을 <br /> 획득할 수 있습니다. 한 번
                도전해보세요!
              </Line>
            ) : window.location.pathname === "/guess" ? (
              <Line>
                AI와의 대화를 통해 추억의 간식을 맞춰보세요! <br />
                AI는 <Word color="#FAD51C">"네"</Word>,{" "}
                <Word color="#08C832">"아니요"</Word> 두 가지의 답변만 할 수
                있어요. <br />
                <SmallLine color="#F00E0E">
                  네, 아니요로 답변할 수 없는 질문에는 AI가 대답하지 않습니다.
                  <br />이 경우에도 도전 횟수가 차감되니 질문을 신중히
                  정해주세요! <br />
                </SmallLine>
                질문, 답안 제출 기회는 <Word color="#2697FF">총 10번</Word>
                입니다.
                <br />
                10번의 대화 안에 정답을 정확히 입력해주세요. <br />총{" "}
                <Word color="#9736F7">3라운드</Word>의 게임, 2라운드 이상 정답을
                맞춰야 일기장을
                <br /> 획득할 수 있습니다. 한 번 도전해보세요!
              </Line>
            ) : null}
          </Description>
          <Sprinkle src={sprinkle} />
          {window.location.pathname === "/music" ? (
            <Flower src={flower} />
          ) : null}
          <GameStartDiv>
            <OptionBtn>
              <PlayIconSt />
              <Option>
                <OptionText onClick={() => go("start")} round={round}>
                  시작!
                </OptionText>
                <StartPath />
              </Option>
            </OptionBtn>
          </GameStartDiv>
        </>
      ) : (
        // 게임 시작 or 게임 설명 선택
        <>
          {window.location.pathname === "/music" ? (
            <>
              <Decoration1>귀 기울여 집중!!</Decoration1>
              <Radio src={radioImg} />
            </>
          ) : window.location.pathname === "/speech" ? (
            <Decoration>
              <img src={boy} style={{ rotate: "-3.96deg" }} />
              <img
                src={girl}
                style={{
                  rotate: "1.74deg",
                  position: "absolute",
                  left: "347.12px",
                  bottom: "32px",
                }}
              />
            </Decoration>
          ) : null}
          <TitleStyled>{title}</TitleStyled>
          <Options>
            <OptionBtn onClick={() => go("start")}>
              <PlayIconSt />
              <Option>
                <OptionText round={round}>게임 시작</OptionText>
                <OptionPathOne />
              </Option>
            </OptionBtn>
            <OptionBtn onClick={() => setDescription(true)}>
              <PlayIconSt />
              <Option>
                <OptionText round={round}>게임 설명</OptionText>
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
  font-family: "UhBeeJungBold";
  font-size: 100px;
  color: #151b26;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const Decoration = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 36.34px;
  left: 60px;
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
  font-family: "Gaegu";
  font-size: 3.5vh;
  margin-left: 25px;
  margin-bottom: 10px;
  color: ${(props) => (props.color ? props.color : "#151B26")};
`;
const Word = styled.span`
  color: ${(props) => (props.color ? props.color : "#151B26")};
  white-space: nowrap;
`;

const Btn = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// 게임 시작 or 게임 방법
const Decoration1 = styled.div`
  width: 344px;
  height: 98px;
  border-radius: 50%;
  background: #fad615;
  font-family: "SangSangShinb7";
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
  font-family: "UhBeeJung";
  font-size: 120px;
`;
const Radio = styled.img`
  /* width: 43vw; */
  height: 47vh;
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
  filter: drop-shadow();
`;
const Option = styled.div`
  position: relative;
`;

const OptionText = styled.div`
  color: #151b26;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhBeeJung";
  font-size: 60px;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 60%;
    background-color: ${(props) =>
      props.round === 1
        ? "rgba(248, 212, 24, 0.2)"
        : props.round === 2
        ? "rgba(27, 127, 199, 0.371)"
        : "pink"};
    filter: blur(15px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${Option}:hover &:before {
    opacity: 1;
  }
`;
