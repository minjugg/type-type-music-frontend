import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "../src/pages/styles/GlobalStyles";
import { Reset } from "styled-reset";

import WelcomePage from "./pages/WelcomePage/WelcomePage";
import CodePage from "./pages/CodePage/CodePage";
import PlayPage from "./pages/PlayPage/PlayPage";
import MyListPage from "./pages/MyListPage/MyListPage";

function App() {
  return (
    <>
      <GlobalStyles />
      <Reset />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/code" element={<CodePage />} />
        <Route path="/code/play" element={<PlayPage />} />
        <Route path="/code/mypage" element={<MyListPage />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
