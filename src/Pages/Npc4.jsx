import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import afterGameMap from "../sources/images/Map/map1/afterGame.png";
import nextBtnImage from "../sources/images/nextBtn.svg";

export default function Npc4() {
  const videoRef = useRef();
  const [videoStart, setVideoStart] = useState(false);
  const [videoEnd, setVideoEnd] = useState(false);

  const navigator = useNavigate();
  const routeing = () => {
    setInterval(() => {
      navigator("/map2");
    }, 1000);
  };

  const playVideo = () => {
    if (videoRef.current) {
      setTimeout(() => {
        videoRef.current.play();
      }, 300);
      setVideoStart(true);
    }
  };

  return (
    <>
      <Npc>
        <Modal>
          {videoEnd ? (
            <Button style={{ display: "flex" }}>
              <Text onClick={routeing}>다음 맵으로 이동</Text>
              <img src={nextBtnImage} />
            </Button>
          ) : null}
          {videoStart ? null : (
            <UseItem onClick={playVideo}>아이템 사용하기</UseItem>
          )}
          <Video ref={videoRef} onEnded={() => setVideoEnd(true)}>
            <source src="/videos/npc_cd.mov" />
          </Video>
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
const Text = styled.div``;
