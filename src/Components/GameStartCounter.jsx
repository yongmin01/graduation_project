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
`;
