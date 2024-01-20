import React from "react";
import styled from "styled-components";
import { ReactComponent as Heart } from "../sources/images/heart.svg";

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

  return <ChanceDiv>{renderIcons(total, remaining)}</ChanceDiv>;
}
const ChanceDiv = styled.div`
  width: 202px;
  position: absolute;
  left: 125px;
`;
const HeartSt = styled(Heart)`
  width: 54px;
  fill: ${(props) => props.color};
`;
