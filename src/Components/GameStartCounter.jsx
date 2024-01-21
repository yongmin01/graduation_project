import React, { useState, useEffect } from "react";
import styled from "styled-components";
export default function GameStartCounter({ startCount }) {
  const [count, setCount] = useState(3);
  useEffect(() => {
    if (startCount) {
      const timer = setInterval(() => {
        setCount((count) => count - 1);
      }, 1000);
      if (count === 0) {
        clearInterval(timer);

        startCount(false);
      }
      return () => clearInterval(timer);
    }
  }, [count]);

  return <Count>{count}</Count>;
}
const Count = styled.div`
  font-family: "Gaegu";
  font-size: 150px;
  color: #151b26;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-text-stroke-color: #ffe250;
  -webkit-text-stroke-width: 4;
`;
