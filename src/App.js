import GlobalStyle from "./styles/GlobalStyle";
import MusicQuiz from "./Pages/MusicQuiz";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import React, { useState } from "react";

function App() {
  const handle = useFullScreenHandle();
  return (
    <>
      {/* <FullScreen className="full-screen" handle={handle}>
        <button onClick={handle.enter}>전체화면 전환</button>
        <button onClick={handle.exit}>전체화면 해제</button> */}
      <GlobalStyle />
      <MusicQuiz />
      {/* </FullScreen> */}
    </>
  );
}

export default App;
