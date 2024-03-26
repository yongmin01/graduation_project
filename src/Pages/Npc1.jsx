import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import afterGameMap from "../sources/images/Map/map1/afterGame.png";
import afterGameFrame from "../sources/images/afterGameFrame.png";
import nextBtnImage from "../sources/images/nextBtn.png";

export default function Npc1() {
  const [videoEnd, setVideoEnd] = useState(false);

  const navigator = useNavigate();
  const routeing = () => {
    setInterval(() => {
      navigator("/map2");
    }, 1000);
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
          <video
            width="780px"
            height="596px"
            muted
            autoPlay
            onEnded={() => setVideoEnd(true)}
          >
            <source src="/videos/npc_musicQuiz.mp4" />
          </video>
        </Modal>
      </Npc>
    </>
  );
}

const Npc = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${afterGameMap});
  background-size: 100% 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
`;
const Modal = styled.div`
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
  text-align: center;
  background-image: url(${afterGameFrame});
  background-size: 84% 77%;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  position: absolute;
  top: 155px;
  right: 196px;
  font-size: 50px;
  font-family: UhbeeJung;
  cursor: pointer;
`;
const Text = styled.div``;
