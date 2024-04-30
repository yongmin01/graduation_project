import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as NextBtnImg } from "../sources/images/nextBtn.svg";
import afterGameMap from "../sources/images/Map/map4/afterGame.png";
import nextBtnImage from "../sources/images/nextBtn.svg";
import ItemImage from "../sources/images/Game/npc4_play.png";

export default function Npc4() {
  const videoRef = useRef();
  const [videoEnd, setVideoEnd] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const navigator = useNavigate();
  const routeing = () => {
    setTimeout(() => {
      navigator("/diary");
    }, 1000);
  };

  const useItem = () => {
    setButtonClicked(true);
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.addEventListener("ended", () => {
        setVideoEnd(true);
      });
    }
  };

  return (
    <>
      <Npc>
        <Modal>
          <Video
            ref={videoRef}
            // style={{ display: buttonClicked ? "block" : "none" }}
          >
            <source src="./videos/npc_tv.mov" />
          </Video>

          <ItemUseBtn
            onClick={useItem}
            style={{ display: buttonClicked ? "none" : "flex" }}
          >
            <span>Play</span>
            <img src={ItemImage} width="40%" style={{ zIndex: "100" }} />
          </ItemUseBtn>
          {videoEnd && (
            <Button onClick={routeing}>
              <Text>이동</Text>
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
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
`;
const Modal = styled.div`
  position: relative;
  width: 68vw;
  height: 66vh;
  border-radius: 41px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemUseBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  margin: 0 auto;
  width: 54vw;
  height: 57vh;
  text-align: center;
  font-family: Uhbee Jung;
  z-index: 10;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.737);

  color: #000;
  text-align: center;
  font-family: "UhBee jung";
  font-size: 2.7vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Video = styled.video`
  width: 54vw;
  height: 57vh;
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
  font-family: UhbeeJung;
  cursor: pointer;
  z-index: 100;
  width: auto;
`;

const Text = styled.div`
  color: #000;
  text-align: right;
  font-family: "UhBee jung";
  font-size: 4.2vh;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
`;

const UseItem = styled.div`
  position: absolute;
  margin: 0 auto;
  width: 40%;
  background-color: yellow;
  border-radius: 50px;
  text-align: center;
  font-family: Uhbee Jung;
  z-index: 10;
`;
