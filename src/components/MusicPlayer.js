import React, { useState, useEffect } from "react";
import playbtn from "../public/img/playbtn.png";
import pause from "../public/img/pause.png";
import next from "../public/img/next.png";
import prev from "../public/img/prev.png";

const MusicPlayer = ({ selectedSong, songs, onPlayNext, onPlayPrev }) => {
  const [audioPlayer, setAudioPlayer] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (selectedSong) {
      const newAudioPlayer = new Audio(selectedSong.songlink);
      setAudioPlayer(newAudioPlayer);
      setIsPlaying(false);

      newAudioPlayer.addEventListener("timeupdate", () => {
        setCurrentTime(newAudioPlayer.currentTime);
      });

      newAudioPlayer.addEventListener("loadedmetadata", () => {
        setDuration(newAudioPlayer.duration);
      });

      return () => {
        newAudioPlayer.pause();
        newAudioPlayer.src = "";
        newAudioPlayer.load();
      };
    }
  }, [selectedSong]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePlayNext = () => {
    onPlayNext();
  };

  const handlePlayPrev = () => {
    onPlayPrev();
  };

  const handleSliderChange = (event) => {
    const newTime = parseFloat(event.target.value);
    audioPlayer.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <>
      {selectedSong && (
        <div className="music-player">
          <div className="music-player-left">
            <img
              width={50}
              height={50}
              src={selectedSong.thumbnail}
              alt={selectedSong.songname}
            />
            <p>{selectedSong.songname}</p>
          </div>
          <div className="music-player-right">
            <img onClick={handlePlayPrev} src={prev} alt="previous" />

            <img
              onClick={handlePlayPause}
              width={15}
              src={isPlaying ? pause : playbtn}
              alt="play/pause"
            />

            <img onClick={handlePlayNext} src={next} alt="next" />
          </div>
          <input
            className="progresive-bar"
            type="range"
            value={currentTime}
            max={duration}
            onChange={handleSliderChange}
          />
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
