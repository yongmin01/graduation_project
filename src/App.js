import GlobalStyle from "./styles/GlobalStyle";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Intro from "./Pages/Intro";
import Tutorial from "./Pages/Tutorial";

import Map1 from "./Pages/Map1";
import Map2 from "./Pages/Map2";
import Map3 from "./Pages/Map3";
import Map4 from "./Pages/Map4";
import MusicQuiz from "./Pages/MusicQuiz";
import SpeechQuiz from "./Pages/SpeechQuiz";
import PuzzleQuiz from "./Pages/PuzzleQuiz";
import Npc1 from "./Pages/Npc1";
import Npc2 from "./Pages/Npc2";
import Npc3 from "./Pages/Npc3";
import Npc4 from "./Pages/Npc4";
import Diary from "./Pages/Diary";

function App() {
  const handle = useFullScreenHandle();
  window.addEventListener("keydown", (e) => {
    if (e.key === "\\") handle.enter();
  });

  return (
    <>
      <GlobalStyle />
      <FullScreen className="full-screen" handle={handle}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/intro" element={<Intro />} />
            <Route path="/tutorial" element={<Tutorial />} />

            <Route path="/map1" element={<Map1 />} />
            <Route path="/music" element={<MusicQuiz />} />
            <Route path="/npc1" element={<Npc1 />} />

            <Route path="/map2" element={<Map2 />} />
            <Route path="/speech" element={<SpeechQuiz />} />
            <Route path="/npc2" element={<Npc2 />} />

            <Route path="/map3" element={<Map3 />} />
            <Route path="/puzzle" element={<PuzzleQuiz />} />
            <Route path="/npc3" element={<Npc3 />} />

            <Route path="/map4" element={<Map4 />} />
            <Route path="/npc4" element={<Npc4 />} />

            <Route path="/diary" element={<Diary />} />
          </Routes>
        </BrowserRouter>
        <button onClick={handle.enter}>전체화면 전환</button>
        <button onClick={handle.exit}>전체화면 해제</button>
      </FullScreen>
    </>
  );
}

export default App;
