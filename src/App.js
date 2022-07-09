import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "../src/pages/styles/GlobalStyles";
import { Reset } from "styled-reset";

import Home from "./pages/Home/Home";
import StandBy from "./pages/StandBy/StandBy";
import Studio from "./pages/Studio/Studio";
import Play from "./pages/Play/Play";
import MyPage from "./pages/MyPage/MyPage";
import Listen from "./pages/Listen/Listen";

function App() {
  return (
    <>
      <GlobalStyles />
      <Reset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:username" element={<StandBy />} />
        <Route path="/users/:username/code" element={<Studio />} />
        <Route path="/users/:username/code/play" element={<Listen />} />
        <Route path="/users/:username/code/play/tag" element={<Play />} />
        <Route path="/users/:username/my-page" element={<MyPage />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
