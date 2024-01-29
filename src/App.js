import GlobalStyle from "./styles/GlobalStyle";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Map from "./Pages/Map";
import MusicQuiz from "./Pages/MusicQuiz";

function App() {
  const handle = useFullScreenHandle();

  return (
    <>
      <GlobalStyle />
      {/* <FullScreen className="full-screen" handle={handle}>
        <button onClick={handle.enter}>전체화면 전환</button>
        <button onClick={handle.exit}>전체화면 해제</button> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/music" element={<MusicQuiz />} />
        </Routes>
      </BrowserRouter>
      {/* </FullScreen> */}
    </>
  );
}

export default App;
