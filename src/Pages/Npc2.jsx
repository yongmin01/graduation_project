import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as NextBtnImg } from "../sources/images/nextBtn.svg";
import afterGameMap from "../sources/images/Map/map2/afterGame.webp";
import ItemImage from "../sources/images/Game/jetty.svg";

export default function Npc2() {
  const videoRef = useRef();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const characterSex = JSON.parse(localStorage.getItem("character"));

  const navigator = useNavigate();
  const routeing = () => {
    setTimeout(() => {
      navigator("/map3");
    }, 1000);
  };

  const useItem = () => {
    setButtonClicked(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    const checkTimeAndSetShowNext = () => {
      if (videoRef.current && videoRef.current.currentTime >= 18) {
        setShowNext(true);
      }
    };

    const intervalId = setInterval(checkTimeAndSetShowNext, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Npc>
        <Modal>
          <Video
            ref={videoRef}
            style={{ display: buttonClicked ? "block" : "none" }}
          >
            <source
              src={
                characterSex === "girl"
                  ? "./videos/npc_jetty_g.mov"
                  : "./videos/npc_jetty_b.mov"
              }
            />
          </Video>

          <ItemUseBtn
            onClick={useItem}
            style={{ display: buttonClicked ? "none" : "flex" }}
          >
            <Item>
              <ItemImg src={ItemImage} />
              <span style={{ fontSize: "3.5vh" }}>제티</span>
            </Item>
            <UseText>사용하기</UseText>
          </ItemUseBtn>
          {showNext && (
            <Button
              onClick={routeing}
              style={{ display: "flex", marginLeft: "auto" }}
            >
              <Text>다음 맵으로 이동</Text>
              <NextBtnImg width="2.6vw" fill={"#151B26"} />
            </Button>
          )}
        </Modal>
      </Npc>
    </>
  );
}

const Npc = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${afterGameMap});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
`;
const Modal = styled.div`
  position: relative;
  width: 63.1vw;
  height: 66.4vh;
  border-radius: 41px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemUseBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #000;
  font-family: "UhBee jung";
  font-size: 7.8vh;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Item = styled.div`
  height: 26vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 3.4vw;
`;
const ItemImg = styled.img`
  height: 20vh;
`;
const UseText = styled.div`
  color: #000;
  text-align: center;
  font-family: "UhBee jung";
  font-size: 5.5vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-10%, -50%);
    width: 19.4vw;
    height: 2.5vh;
    background-color: #adff90;
    border-radius: 20px;
    filter: blur(20px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:before {
    opacity: 1;
  }
`;
const Video = styled.video`
  width: 54.3vw;
  height: 57.2vh;
`;
const Button = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: absolute;
  top: 6.7%;
  right: 4.6%;
  font-size: 50px;
  font-family: "UhbeeJung";
  cursor: pointer;
  z-index: 100;
`;

const Text = styled.div`
  color: #000;
  text-align: right;
  font-family: "UhBee jung";
  font-size: 4.2vh;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
