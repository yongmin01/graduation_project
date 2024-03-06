import GlobalStyle from "./styles/GlobalStyle";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Map from "./Pages/Map";
import Map2 from "./Pages/Map2";
import MusicQuiz from "./Pages/MusicQuiz";
import SpeechQuiz from "./Pages/SpeechQuiz";

function App() {
  const handle = useFullScreenHandle();
  const [round, setRound] = useState(1);
  useEffect(() => {
    console.log(round);
  }, [round]);
  return (
    <>
      <GlobalStyle />
      {/* <FullScreen className="full-screen" handle={handle}>
        <button onClick={handle.enter}>전체화면 전환</button>
        <button onClick={handle.exit}>전체화면 해제</button> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Map round={round} />} />
          <Route path="/map2" element={<Map2 round={round} />} />
          <Route path="/music" element={<MusicQuiz round={1} />} />
          <Route path="/speech" element={<SpeechQuiz round={2} />} />
        </Routes>
      </BrowserRouter>
      {/* </FullScreen> */}
    </>
  );
}

export default App;
