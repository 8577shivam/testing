import React, { useState, useEffect } from "react";
import { data as initialData } from "../data/songdata";
import AddSongsection from "../components/AddSongsection";
import MusicPlayer from "../components/MusicPlayer";
import play from "../public/img/play.png";
const itemsPerPage = 5;

const SongList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [addsectionVisible, setAddsectionVisible] = useState(false);
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  useEffect(() => {
    const storedData = localStorage.getItem("songData");
    setSongs(storedData ? JSON.parse(storedData) : initialData);
  }, []);
  const totalPages = Math.ceil(songs.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleVisible = () => {
    setAddsectionVisible(!addsectionVisible);
  };

  const handlePlaySong = (song) => {
    setSelectedSong(song);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? "active " : ""}>
          <button className="pagination-btn" onClick={() => handleClick(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = songs.slice(indexOfFirstItem, indexOfLastItem);
  useEffect(() => {
    const storedData = localStorage.getItem("songData");
    setSongs(storedData ? JSON.parse(storedData) : initialData);
  }, [localStorage.getItem("songData")]);

  const handleRemoveSong = (id) => {
    const updatedSongs = songs.filter((song) => song.id !== id);
    localStorage.setItem("songData", JSON.stringify(updatedSongs));

    // Update state
    setSongs(updatedSongs);
  };
  const handlePlayNext = () => {
    if (selectedSong) {
      const currentIndex = songs.findIndex(
        (song) => song.id === selectedSong.id
      );
      const nextIndex = (currentIndex + 1) % songs.length;
      setSelectedSong(songs[nextIndex]);
    }
  };

  const handlePlayPrev = () => {
    if (selectedSong) {
      const currentIndex = songs.findIndex(
        (song) => song.id === selectedSong.id
      );
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
      setSelectedSong(songs[prevIndex]);
    }
  };
  return (
    <div className="main-section">
      <div className="songList-section">
        <p className="p-left-1">
          First Level Menu/Second Level Menu /Current item
        </p>
        <div className="addsong">
          <p className="song-list-text">Songs</p>
          <button className="add-song-box" onClick={handleVisible}>
            Add Song
          </button>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th className="tablehead">SONG NAME</th>
                <th className="tablehead">SOURCE</th>
                <th className="tablehead">ADDED ON</th>
                <th className="tablehead"></th>
                <th className="tablehead"></th>
              </tr>
            </thead>
            <tbody>
              {console.log(currentItems)}
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      width={50}
                      height={50}
                      src={item.thumbnil}
                      alt={item.songname}
                    />

                    {item.songname}
                  </td>
                  <td>{item.source}</td>
                  <td>{item.date}</td>
                  <td>
                    <span
                      className="playbtn"
                      onClick={() => handlePlaySong(item)}
                    >
                      <img src={play} />
                    </span>
                  </td>
                  <td>
                    {/* Add the remove button with the onClick handler */}
                    <button
                      className="removebtn"
                      onClick={() => handleRemoveSong(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul id="page-numbers">{renderPageNumbers()}</ul>
        </div>
        {addsectionVisible ? <AddSongsection /> : ""}
      </div>
      <div className="music-section">
        <MusicPlayer
          selectedSong={selectedSong}
          songs={songs}
          onPlayNext={handlePlayNext}
          onPlayPrev={handlePlayPrev}
        />
      </div>
    </div>
  );
};

export default SongList;
