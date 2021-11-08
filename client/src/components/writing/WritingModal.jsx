import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./WritingModal.css";

export default function WritingModal({ movieTitle }) {
  const [hashtag, setHashtag] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const userName = useSelector((state) => state.auth.userId);

  const previewImage = (e) => {
    const reader = new FileReader();
    console.log(e.target.files[0]);

    reader.onload = () => {
      setPhoto({
        file: e.target.files[0],
        previewURL: reader.result,
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const renderFileButton = () => {
    return (
      <div className="writingmodal__left-before">
        <p>640px * 640px 크기를 추천합니다.</p>
        <label htmlFor="input-file" className="left__image-btn">
          사진 고르기
        </label>
        <input onChange={previewImage} id="input-file" type="file" className="left__image" />
      </div>
    );
  };

  const renderImage = () => {
    return (
      <div className="writingmodal__left-upload">
        <div className="review__image">
          <img src={[photo.previewURL]} alt="" />
        </div>
      </div>
    );
  };

  const submit = () => {
    const hashtags = hashtag.split(" ").filter((hashtag) => hashtag);
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("description", description);
    formData.append("photo", photo.file);
    formData.append("hashtags", hashtags);
    formData.append("movieTitle", movieTitle);

    axios.post("/review/write", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div id="writingmodal">
      {photo ? renderImage() : renderFileButton()}
      <div className="writingmodal__right">
        <input onChange={(e) => setHashtag(e.target.value)} type="text" placeholder="#해시태그" />
        <textarea onChange={(e) => setDescription(e.target.value)} placeholder="내용"></textarea>
        <button onClick={submit}>글 올리기</button>
      </div>
    </div>
  );
}
