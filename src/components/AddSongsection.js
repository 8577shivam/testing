import React, { useState, useRef, useEffect } from "react";
import { data as initialData } from "../data/songdata";

const AddSongsection = () => {
  const [formData, setFormData] = useState({
    songName: "",
    songFile: null,
    songSource: "",
    profileImage: null,
  });
  const [hide, setHide] = useState(true);
  const fileInputRef = useRef(null);
  const [songs, setSongs] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      songFile: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newId = songs.length > 0 ? songs[songs.length - 1].id + 1 : 1;
    const newSong = {
      id: newId,
      songname: formData.songName,
      songlink: formData.songFile ? formData.songFile.name : "",
      source: formData.songSource,
      thumbnil: formData.profileImage ? formData.profileImage.name : "",
      date: new Date().toLocaleDateString(),
    };

    const updatedData = [...songs, newSong];
    localStorage.setItem("songData", JSON.stringify(updatedData));

    setSongs(updatedData);
    setHide(!hide);
    setFormData({
      songName: "",
      songFile: null,
      songSource: "",
      profileImage: null,
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("songData");
    setSongs(storedData ? JSON.parse(storedData) : initialData);
  }, []);

  const handleHide = () => {
    setHide(!hide);
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };
  const handleDeleteProfileImage = () => {
    setFormData({ ...formData, profileImage: null });
  };
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      profileImage: file,
    }));
  };
  return (
    <>
      {hide && (
        <div className="addsong-box">
          <div className="form-section ">
            <div className="box-heading grid  ">
              <p>Add Song</p>
              <button className="close-btn" onClick={handleHide}>
                X
              </button>
            </div>
            <form onSubmit={handleSubmit} className=" form grid gap-xl">
              <div className="grid songname-box gap-sm">
                <label>Song Name</label>
                <input
                  type="text"
                  name="songName"
                  value={formData.songName}
                  onChange={handleChange}
                />
              </div>
              <div className=" grid songlink-box gap-sm">
                <label>Song File</label>
                <input
                  type="file"
                  name="songFile"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <button type="button" onClick={handleChooseFile}>
                  Choose File
                </button>
                {formData.songFile && (
                  <p className="desc">
                    Selected File: {formData.songFile.name}
                  </p>
                )}
              </div>
              <div className="grid songSource-box gap-sm">
                <label>Song Source</label>
                <input
                  type="text"
                  name="songSource"
                  value={formData.songSource}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-box">
                <label>Profile</label>
                <input type="file" onChange={handleProfileImageChange} />
              </div>
              <div className="showprofileimg grid">
                {formData.profileImage && (
                  <div className="showprofile">
                    <img
                      width={50}
                      height={50}
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Profile"
                    />
                    <button type="button" onClick={handleDeleteProfileImage}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <div className="form-btn">
                <button onClick={handleHide}>Cancel</button>
                <button className="add-btn" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddSongsection;
