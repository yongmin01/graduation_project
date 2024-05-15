import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import OptionsPath from "../sources/images/Game/optionsBg.svg";

// 공통 에셋
import { ReactComponent as OptionPath1 } from "../sources/images/Game/optionPath1.svg";
import { ReactComponent as OptionPath2 } from "../sources/images/Game/optionPath2.svg";
import { ReactComponent as ShortOptionPath } from "../sources/images/Game/shortOptionPath.svg";
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
import communlineUnder_music from "../sources/images/Game/musicQuiz/commonlineUnder_music.png";

// 방송퀴즈 장식
import boyGirl from "../sources/images/Game/speechQuiz/boyGirl.svg";
import cloud from "../sources/images/Game/speechQuiz/cloud.svg";
import flower from "../sources/images/Game/speechQuiz/flower.svg";
import left from "../sources/images/Game/speechQuiz/left.svg";
import right from "../sources/images/Game/speechQuiz/right.svg";
import sprinkle2 from "../sources/images/Game/speechQuiz/sprinkle.svg";
import flower_purple from "../sources/images/Game/flower_purple.svg";
import playIcon_blue from "../sources/images/Game/playIcon_blue.svg";
import recordBtn from "../sources/images/Game/speechQuiz/recordBtn.svg";
import communlineUnder_speech from "../sources/images/Game/speechQuiz/commonlineUnder_speech.png";

// 퍼즐퀴즈 장식
import cardGlass from "../sources/images/Game/puzzleQuiz/cardglass.webp";
import pencilEraser from "../sources/images/Game/puzzleQuiz/pencileraser.webp";
import flower_yellow from "../sources/images/Game/flower_yellow.svg";
import playIcon_green from "../sources/images/Game/playIcon_green.svg";
import communlineUnder_puzzle from "../sources/images/Game/puzzleQuiz/commonlineUnder_puzzle.png";

export default function BeforeGame({ go, title, round }) {
  const [description, setDescription] = useState(false);
  const cardGlassImage = () => {
    let cardGlass = new Image();
    cardGlass.src = cardGlass;
  };
  const pencilEraserImage = () => {
    let pencilEraserImage = new Image();
    pencilEraserImage.src = PencilEraser;
  };

  useLayoutEffect(() => {
    cardGlassImage();
    pencilEraserImage();
  }, []);

  return (
    <>
      {description ? (
        <>
          {/* 게임 설명 화면 */}
          <Description>
            <DescTitle>
              <DescTitleText>게임 방법</DescTitleText>
              <Elipse color={round} />
            </DescTitle>
            <CommonLine color={round}>
              <span>게임을 성공해 아이템을 얻어 일기장과 교환하세요.</span>
              <CommonlineUnder
                src={
                  round === 1
                    ? communlineUnder_music
                    : round === 2
                    ? communlineUnder_puzzle
                    : communlineUnder_speech
                }
              />
            </CommonLine>
            {round === 1 ? ( // 음악 퀴즈
              <Order style={{ gap: "3.5vh" }}>
                <Line style={{ paddingTop: "3.7vh" }}>
                  노래는 3초 카운트다운 후 전주가{" "}
                  <Word color="#0CA42D">2초</Word> 재생됩니다.{" "}
                </Line>
                <Line>
                  한 문제 당 정답 제출 기회는 딱{" "}
                  <Word color="#0F98F4">3번!</Word>
                </Line>
                <Line>
                  힌트는 <Word color="#9B3AE8">‘다시 듣기’</Word>,{" "}
                  <Word color="#9B3AE8">‘더 듣기’</Word>,{" "}
                  <Word color="#9B3AE8">‘가수공개’</Word> 가 있어요.
                </Line>
                <Line>
                  총 <Word color="#FF4BCD">5라운드</Word>의 게임,{" "}
                  <Word color="#FF0000">3라운드 이상 정답</Word>을 맞춰야
                  일기장을
                </Line>
                <Line>획득할 수 있습니다. 한 번 도전해보세요!</Line>
              </Order>
            ) : round === 2 ? ( // 퍼즐 퀴즈
              <>
                <Order style={{ gap: "2.5vh" }}>
                  <Line style={{ paddingTop: "2.9vh" }}>
                    <Word color="#FFBB0D">12장의 카드</Word>를 뒤집어 맞는 짝을
                    찾아보세요.
                  </Line>
                  <Line>
                    한 문제 당 주어진 시간은 단{" "}
                    <Word color="#FF3E3E">30초!</Word>
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
                </Order>
              </>
            ) : round === 3 ? ( // 방송 퀴즈
              <Order style={{ gap: "2.5vh" }}>
                <Line
                  style={{
                    paddingTop: "3.7vh",
                  }}
                >
                  제시되는 영상을 보고 다음에 올 대사를 맞춰보세요!
                </Line>
                <Line
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  다음에 올 대사를{" "}
                  <img
                    src={recordBtn}
                    style={{ margin: "0 1vw" }}
                    alt="Record Button"
                  />
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
                  <Word color="#FF9B06">2라운드 이상 정답</Word>을 맞춰야
                  아이템을
                </Line>
                <Line>획득할 수 있습니다. 한 번 도전해보세요!</Line>
              </Order>
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
          <GameStartDiv round={round}>
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
                <ShortOptionPath src={ShortOptionPath} />
              </Option>
            </OptionBtn>
          </GameStartDiv>
        </>
      ) : (
        // 게임 시작 or 게임 설명 선택
        <>
          {round === 1 ? (
            <>
              <Decoration1 round={round}>귀 기울여 집중!!</Decoration1>
              <Radio src={radio} />
              <Speaker src={speaker} />
              <Note1 src={note1} />
              <Note2 src={note2} />
              <Note3 src={note3} />
              <Note4 src={note4} />
            </>
          ) : round === 2 ? (
            <>
              <Decoration1 round={round}>잘 찾을 수 있겠어?!</Decoration1>
              <CardGlass src={cardGlass} />
              <PencilEraser src={pencilEraser} />
            </>
          ) : round === 3 ? (
            <>
              <Cloud src={cloud} />
              <Flower2 src={flower} />
              <Left src={left} />
              <Right src={right} />
              <Sprinkle2 src={sprinkle2} />
              <Decoration>
                <img src={boyGirl} alt="Boy and girl decoration" />
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
                <OptionPath1 />
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
                <OptionPath2 />
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
  font-family: "UhBeejungBold";
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
  background-color: ${(props) =>
    props.color === 1 ? "#D4F6E8" : props.color === 2 ? "#FEC8AA" : "#E8F4BB"};
  position: absolute;
  left: 19vw;
`;

const CommonLine = styled.span`
  color: ${(props) =>
    props.color === 1 ? "#FF9B06" : props.color === 2 ? "#209228" : "#007FD5"};
  font-family: Gaegu;
  font-size: 3.3vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  /* margin-bottom: 4px; */
  margin-left: 1.3vw;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const CommonlineUnder = styled.img`
  width: 65.1vw;
`;
const Order = styled.div`
  display: flex;
  flex-direction: column;
`;
const Line = styled.div`
  color: #151b26;
  font-family: Gaegu;
  font-size: 2.7vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;

  margin-left: 2vw;
`;

const Word = styled.span`
  color: ${(props) => (props.color ? props.color : "#151B26")};
  white-space: nowrap;
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
  bottom: 12.6vh;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-image: url(${OptionsPath});
  height: 39vh;
  padding: 88px 119px 89px 110px;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  right: 8vw;
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
  font-family: "UhBeejungBold";
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

// 음악퀴즈 데코레이션
const Decoration1 = styled.div`
  position: absolute;
  top: ${({ round }) => (round === 1 ? "20vh" : "19vh")};
  right: ${({ round }) => (round === 1 ? "11vw" : "61vw")};
  width: 23vw;
  height: 9.5vh;
  border-radius: 50%;
  background: ${({ round }) => (round === 1 ? "#fad615" : "#9AF3A0")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #151b26;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "JGaegujaengyi";
  font-size: 3.9vh;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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

// 퍼즐 퀴즈 데코레이션
const CardGlass = styled.img`
  position: absolute;
  top: 50vh;
  left: 11.8vw;
`;
const PencilEraser = styled.img`
  position: absolute;
  top: 16.4vh;
  right: 11.6vw;
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

// 방송퀴즈 데코
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
  width: 2.2vw;
  position: absolute;
  top: 28.5vh;
  left: 41.2vw;
`;
const Right = styled.img`
  position: absolute;
  top: 29.1vh;
  right: 26vw; // 원래는 17vw
`;
const Sprinkle2 = styled.img`
  position: absolute;
  top: 46vh;
  right: 7.6vw;
`;
const Decoration = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 6.16vw;
  bottom: 4.5vh; // 원래는 3.vh
`;
