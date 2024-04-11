import React, { useState } from "react";
import styled from "styled-components";
import page0 from "../sources/images/Outro/diary.png";
import page1 from "../sources/images/Outro/diary1.webp";
import page2 from "../sources/images/Outro/diary2.webp";
import page3 from "../sources/images/Outro/diary3.webp";
import page4 from "../sources/images/Outro/diary4.webp";

export default function Diary() {
  const [page, setPage] = useState(0);

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <Container onClick={nextPage}>
      <Page src={getPageSource(page)} />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Page = styled.img`
  object-fit: contain;
`;

const getPageSource = (page) => {
  switch (page) {
    case 0:
      return page0;
    case 1:
      return page1;
    case 2:
      return page2;
    case 3:
      return page3;
    case 4:
      return page4;
    default:
      return page0;
  }
};
