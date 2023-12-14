import React from "react";
import SongList from "./SongList";
import Sidebar from "../components/Sidebar";

const SongListPage = () => {
  return (
    <div className="songList-mainpage">
      <Sidebar />
      <SongList />
    </div>
  );
};

export default SongListPage;
