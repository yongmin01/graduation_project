import React from "react";
import styled from "styled-components";
import { ReactComponent as Heart } from "../sources/images/Game/heart.svg";

export default function Chance({ remaining, total }) {
  // SVG 아이콘을 그리는 함수
  const renderIcons = (total, remaining) => {
    const icons = [];

    for (let i = 0; i < total; i++) {
      // 남은 힌트의 개수에 따라 다른 색 결정
      const iconColor = i < remaining ? "#FF9CB6" : "#858585";

      // SVG 아이콘 추가
      icons.push(<HeartSt color={iconColor} key={i} />);
    }

    return icons;
  };

  return (
    <ChanceDiv>
      <span>도전기회</span>
      <Hearts>{renderIcons(total, remaining)}</Hearts>
    </ChanceDiv>
  );
}
const ChanceDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.97vh;
  color: #151b26;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "UhBee jung";
  font-size: 1.9vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  /* margin-bottom: 1.1vh; */
`;
const Hearts = styled.div`
  width: max-content;
  gap: 1.38vw;
`;
const HeartSt = styled(Heart)`
  height: 5.6vh;
  fill: ${(props) => props.color};
`;
