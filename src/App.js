import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage/WelcomePage";
import CodePage from "./pages/CodePage/CodePage";
import PlayPage from "./pages/PlayPage/PlayPage";
import MyListPage from "./pages/MyListPage/MyListPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/code" element={<CodePage />} />
        <Route path="/code/play" element={<PlayPage />} />
        <Route path="/code/mypage" element={<MyListPage />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
