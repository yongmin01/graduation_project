import React, { useState } from "react";
import styled from "styled-components";
import OptionsPath from "../sources/images/Game/optionsBg.svg";
import { ReactComponent as RecordBtn } from "../sources/images/Game/recordBtn.svg";

// 공통 에셋
import shortOptionPath from "../sources/images/Game/shortOptionPath.svg";
import longOptionPath1 from "../sources/images/Game/longOptionPath1.svg";
import longOptionPath2 from "../sources/images/Game/longOptionPath2.svg";
// import playIcon from "../sources/images/Game/playIcon.svg";
import sprinkle from "../sources/images/Game/sprinkle.png";

// 음악퀴즈 장식
import radio from "../sources/images/Game/musicQuiz/radio.svg";
import speaker from "../sources/images/Game/musicQuiz/speaker.svg";
import note1 from "../sources/images/Game/musicQuiz/note1.svg";
import note2 from "../sources/images/Game/musicQuiz/note2.svg";
import note3 from "../sources/images/Game/musicQuiz/note3.svg";
import note4 from "../sources/images/Game/musicQuiz/note4.svg";
import flower_pink from "../sources/images/Game/flower_pink.svg";
import playIcon_yellow from "../sources/images/Game/playIcon_yellow.svg";

// 방송퀴즈 장식
import boy from "../sources/images/Game/speechQuiz/speech_boy.png";
import girl from "../sources/images/Game/speechQuiz/speech_girl.png";
import cloud from "../sources/images/Game/speechQuiz/cloud.svg";
import flower from "../sources/images/Game/speechQuiz/flower.svg";
import left from "../sources/images/Game/speechQuiz/left.svg";
import right from "../sources/images/Game/speechQuiz/right.svg";
import sprinkle2 from "../sources/images/Game/speechQuiz/sprinkle.svg";
import flower_purple from "../sources/images/Game/flower_purple.svg";
import playIcon_blue from "../sources/images/Game/playIcon_blue.svg";

// 퍼즐퀴즈 장식
import flower_yellow from "../sources/images/Game/flower_yellow.svg";
import playIcon_green from "../sources/images/Game/playIcon_green.svg";

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
              <Elipse />
            </DescTitle>
            <CommonLine color={round}>
              게임을 성공해 아이템을 얻어 일기장과 교환하세요.
            </CommonLine>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="870px"
              height="6"
              viewBox="0 0 940 6"
              fill="none"
              style={{ marginBottom: "2.9vh" }}
            >
              <path
                d="M1 1C57.6039 1 80.2658 4.25194 136.869 3.96784C160.743 3.84801 218.23 3.96784 242.042 3.96784C263.248 3.96784 319.97 1 341.176 1C417.511 1 456.925 3.96782 533.259 3.96782C603.366 3.96782 673.472 3.96782 743.578 3.96782C774.705 3.96782 810.176 6.29022 843.892 3.96784C863.517 1 878.83 5.33171 898.239 3.96782C908.533 3.2445 929.195 4.48811 939 1"
                stroke={
                  round === 1 ? "#FFBA68" : round === 2 ? "#CDEACF" : "#CEEAFF"
                }
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            {window.location.pathname === "/music" ? ( // 음악 퀴즈
              <>
                <Line>
                  노래는 3초 카운트다운 후 전주가{" "}
                  <Word color="#0CA42D">1.5초</Word> 재생됩니다.{" "}
                </Line>
                <Line>
                  한 문제 당 정답 제출 기회는 딱{" "}
                  <Word color="#0F98F4">3번!</Word>
                </Line>
                <Line>
                  힌트는 <Word color="#9B3AE8">‘다시 듣기’</Word>,{" "}
                  <Word color="#9B3AE8">‘3초 더 듣기’</Word>가 있어요.
                </Line>
                <SmallLine>
                  다시 듣기 : 정답 기회가 있을 때 언제든 딱 1번 사용할 수
                  있습니다.
                </SmallLine>
                <SmallLine style={{ marginBottom: "2.5vh" }}>
                  3초 더 듣기 : 한 번 틀렸을 때에만 주어지는 특별 힌트!{" "}
                </SmallLine>
                <Line>
                  총 <Word color="#FF4BCD">5라운드</Word>의 게임, 3라운드 이상
                  정답을 맞춰야 일기장을
                </Line>
                <Line>획득할 수 있습니다. 한 번 도전해보세요!</Line>
              </>
            ) : window.location.pathname === "/speech" ? ( // 방송 퀴즈
              <>
                <Line>제시되는 영상을 보고 다음에 올 대사를 맞춰보세요!</Line>
                <Line>
                  다음에 올 대사를{" "}
                  <Btn>
                    <span>녹음하기</span>
                    <RecordBtn fill="#E7F5FF" width="200px" height="90px" />
                  </Btn>
                  버튼을 눌러 녹음하고,
                </Line>
                <Line>
                  원하는 대로 인식이 잘 되었는지 확인한 다음 제출해보세요.
                </Line>
                <Line>
                  녹음 기회는 <Word color="#9736F7">무제한</Word>, 답안 제출
                  기회는 <Word color="#FF4BCD">2번</Word> 입니다.{" "}
                </Line>
                <Line>
                  총 <Word color="#FF3E3E">3라운드</Word>의 게임,{" "}
                  <Word color="#FF3E3E">2라운드 이상 정답</Word>을 맞춰야
                  아이템을
                </Line>
                <Line>획득할 수 있습니다. 한 번 도전해보세요!</Line>
              </>
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
            ) : window.location.pathname === "/puzzle" ? (
              <>
                <Line>
                  <Word color="#FFBB0D">12장의 카드</Word>를 뒤집어 맞는 짝을
                  찾아보세요.
                </Line>
                <Line>
                  한 문제 당 주어진 시간은 단 <Word color="#FF3E3E">30초!</Word>
                </Line>
                <Line>
                  1, 2라운드는 동일한 카드 6쌍을 찾아 짝을 맞춰야 하고,
                </Line>
                <Line>
                  3라운드는 난이도가 높아진 문제가 기다려요.(뭔지는 비~밀)
                </Line>
                <Line>
                  총 <Word color="#0CA42D">3라운드</Word>의 게임,{" "}
                  <Word color="#0F98F4">2라운드 이상 정답</Word>을 맞춰야
                  아이템을
                </Line>
                <Line>획득할 수 있습니다. 한 번 도전해보세요!</Line>
              </>
            ) : null}
          </Description>
          <Sprinkle src={sprinkle} />
          <Flower
            src={
              round === 1
                ? flower_pink
                : round === 2
                ? flower_yellow
                : flower_purple
            }
          />
          <GameStartDiv>
            <OptionBtn>
              <PlayIcon
                src={
                  round === 1
                    ? playIcon_yellow
                    : round === 2
                    ? playIcon_green
                    : playIcon_blue
                }
              />
              <Option>
                <OptionText onClick={() => go("start")} round={round}>
                  시작!
                </OptionText>
                <img src={shortOptionPath} />
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
              <Radio src={radio} />
              <Speaker src={speaker} />
              <Note1 src={note1} />
              <Note2 src={note2} />
              <Note3 src={note3} />
              <Note4 src={note4} />
            </>
          ) : window.location.pathname === "/speech" ? (
            <>
              <Cloud src={cloud} />
              <Flower2 src={flower} />
              <Left src={left} />
              <Right src={right} />
              <Sprinkle2 src={sprinkle2} />
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
            </>
          ) : null}
          <TitleStyled>{title}</TitleStyled>
          <Options>
            <OptionBtn onClick={() => go("start")}>
              <PlayIcon
                src={
                  round === 1
                    ? playIcon_yellow
                    : round === 2
                    ? playIcon_green
                    : playIcon_blue
                }
              />
              <Option>
                <OptionText round={round}>게임 시작</OptionText>
                <img src={longOptionPath1} />
              </Option>
            </OptionBtn>
            <OptionBtn onClick={() => setDescription(true)}>
              <PlayIcon
                src={
                  round === 1
                    ? playIcon_yellow
                    : round === 2
                    ? playIcon_green
                    : playIcon_blue
                }
              />
              <Option>
                <OptionText round={round}>게임 설명</OptionText>
                <img src={longOptionPath2} />
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
  left: 10.9vw;
  top: 13vh;
`;

const DescTitle = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-bottom: 3.3vh;
`;
const DescTitleText = styled.div`
  color: #151b26;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhBee jung BOLD";
  font-size: 9.7vh;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  z-index: 1;
`;
const Elipse = styled.div`
  width: 54px;
  height: 52px;
  border-radius: 50px;
  background-color: #ffd28f;
  position: absolute;
  left: 19vw;
`;

const CommonLine = styled.span`
  color: ${(props) =>
    props.color === 1 ? "#FF9B06" : props.color === 2 ? "#209228" : "#007FD5"};
  font-family: Gaegu;
  font-size: 4.6vh;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 4px;
  margin-left: 1.3vw;
`;
const Line = styled.div`
  color: #151b26;
  font-family: Gaegu;
  font-size: 3.9vh;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
  margin-bottom: 2.5vh;
  margin-left: 2vw;
`;
const SmallLine = styled.div`
  color: ${(props) => (props.color ? props.color : "#151B26")};
  font-family: Gaegu;
  font-size: 3.1vh;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 10px;
  white-space: nowrap;
  margin-left: 3vw;
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

const TitleStyled = styled.div`
  position: absolute;
  top: 30vh;
  text-align: center;
  width: 100%;
  font-family: "UhBeeJung";
  font-size: 120px;
`;

const GameStartDiv = styled.div`
  position: absolute;
  right: 12vw;
  bottom: 12vh;
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
const PlayIcon = styled.img`
  width: 4.1vw;
  height: 5.7vh;
  stroke-width: 4px;
  stroke: #000;
`;
const Option = styled.div`
  position: relative;
`;
const OptionText = styled.div`
  color: #151b26;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhBee jung BOLD";
  font-size: 5.8vh;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

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
const LongOptionPath = styled.img`
  width: 24vw;
  height: 1.6vh;
`;
const Radio = styled.img`
  /* width: 43vw; */
  height: 26vh;
  position: absolute;
  left: 9.5vw;
  bottom: 8.3vh; /* 비율 수정 */
  transform: rotate(16.079deg);
`;
const Speaker = styled.img`
  /* width: 43vw; */
  height: 13vh;
  position: absolute;
  right: 5.9vw;
  top: 39vh; /* 비율 수정 */
`;
const Sprinkle = styled.img`
  height: 11vh;
  position: absolute;
  right: 10vw;
  top: 40vh;
`;
const Flower = styled.img`
  height: 12vh;
  position: absolute;
  left: 6.1vw;
  bottom: 5.8vh;
`;
const Decoration = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 36.34px;
  left: 60px;
`;
const Note1 = styled.img`
  position: absolute;
  top: 19vh;
  left: 14vw;
`;
const Note2 = styled.img`
  position: absolute;
  top: 50vh;
  left: 9vw;
`;
const Note3 = styled.img`
  position: absolute;
  top: 57vh;
  left: 38vw;
`;
const Note4 = styled.img`
  position: absolute;
  top: 33vh;
  right: 13vw;
`;
const Decoration1 = styled.div`
  position: absolute;
  top: 20vh;
  right: 11vw;
  width: 23vw;
  height: 9.5vh;
  border-radius: 50%;
  background: #fad615;
  /* font-family: "SangSangShinb7"; */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #151b26;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: JGaegujaengyi;
  font-size: 3.9vh;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Cloud = styled.img`
  position: absolute;
  top: 12vh;
  right: 9vw;
`;
const Flower2 = styled.img`
  position: absolute;
  top: 21vh;
  left: 9vw;
`;
const Left = styled.img`
  position: absolute;
  top: 28vh;
  left: 39vw;
`;
const Right = styled.img`
  position: absolute;
  top: 29vh;
  right: 17vw;
`;
const Sprinkle2 = styled.img`
  position: absolute;
  top: 46vh;
  right: 7.6vw;
`;
