import GlobalStyle from "./styles/GlobalStyle";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Intro from "./Pages/Intro";
import Tutorial from "./Pages/Tutorial";
import Map from "./Pages/Map";
import Map1 from "./Pages/Map1";
import Map2 from "./Pages/Map2";
import Map3 from "./Pages/Map3";
import Map4 from "./Pages/Map4";
import MusicQuiz from "./Pages/MusicQuiz";
import SpeechQuiz from "./Pages/SpeechQuiz";
import Npc1 from "./Pages/Npc1";
import Npc2 from "./Pages/Npc2";
import Npc3 from "./Pages/Npc3";
import Npc4 from "./Pages/Npc4";
import Test from "./Pages/Test";
import GuessingQuiz from "./Pages/GuessingQuiz";
import PuzzleQuiz from "./Pages/PuzzleQuiz";

function App() {
  const handle = useFullScreenHandle();

  const [character, setCharacter] = useState(null);

  return (
    <>
      <GlobalStyle />
      <FullScreen className="full-screen" handle={handle}>
        <BrowserRouter>
          <Routes>
            <Route path="/intro" element={<Intro />} />
            <Route
              path="/tutorial"
              element={<Tutorial chooseCharacter={setCharacter} />}
            />

            {/* <Route path="/" element={<Map round={round} end={end} />} /> */}
            <Route path="/map1" element={<Map1 sex={character} />} />
            <Route path="/music" element={<MusicQuiz />} />
            <Route path="/npc1" element={<Npc1 />} />

            <Route path="/map2" element={<Map2 sex={character} />} />
            <Route path="/speech" element={<SpeechQuiz />} />
            <Route path="/npc2" element={<Npc2 />} />

            <Route path="/map3" element={<Map3 sex={character} />} />
            <Route path="/puzzle" element={<PuzzleQuiz />} />
            <Route path="/npc3" element={<Npc3 />} />

            <Route path="/map4" element={<Map4 sex={character} />} />
            <Route path="/npc4" element={<Npc4 />} />

            <Route path="/guess" element={<GuessingQuiz />} />
          </Routes>
        </BrowserRouter>
        <button onClick={handle.enter}>전체화면 전환</button>
        <button onClick={handle.exit}>전체화면 해제</button>
      </FullScreen>
    </>
  );
}

export default App;
