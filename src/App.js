import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "../src/pages/styles/GlobalStyles";
import { Reset } from "styled-reset";

import Home from "./pages/Home/Home";
import StandBy from "./pages/StandBy/StandBy";
import Studio from "./pages/Studio/Studio";
import Play from "./pages/Play/Play";
import MyPage from "./pages/MyPage/MyPage";

function App() {
  return (
    <>
      <GlobalStyles />
      <Reset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<StandBy />} />
        <Route path="/:username/code" element={<Studio />} />
        <Route path="/:username/code/play" element={<Play />} />
        <Route path="/:username/mypage" element={<MyPage />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
