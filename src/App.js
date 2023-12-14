import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import SongList from "./Pages/SongList";
import LoginPage from "./components/LoginPage";
import VerifyOTPPage from "./components/VerifyOTPPage";
import SongListPage from "./Pages/SongListPage";
const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route path="/song-list-page" element={<SongListPage />} />
          <Route path="/song-list" element={<SongList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
