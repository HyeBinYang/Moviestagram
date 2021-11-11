import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./WritingModal.css";

export default function WritingModal({ movieId }) {
  const [hashtag, setHashtag] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const userName = useSelector((state) => state.auth.userId);

  const previewImage = (e) => {
    const reader = new FileReader();

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
    formData.append("movieId", movieId);

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
        <span className="star-input">
          <span className="rate__title">평점</span>
          <span className="input">
            <input type="radio" name="star-input" id="p1" value="1" />
            <label for="p1">1</label>
            <input type="radio" name="star-input" id="p2" value="2" />
            <label for="p2">2</label>
            <input type="radio" name="star-input" id="p3" value="3" />
            <label for="p3">3</label>
            <input type="radio" name="star-input" id="p4" value="4" />
            <label for="p4">4</label>
            <input type="radio" name="star-input" id="p5" value="5" />
            <label for="p5">5</label>
            <input type="radio" name="star-input" id="p6" value="6" />
            <label for="p6">6</label>
            <input type="radio" name="star-input" id="p7" value="7" />
            <label for="p7">7</label>
            <input type="radio" name="star-input" id="p8" value="8" />
            <label for="p8">8</label>
            <input type="radio" name="star-input" id="p9" value="9" />
            <label for="p9">9</label>
            <input type="radio" name="star-input" id="p10" value="10" />
            <label for="p10">10</label>
          </span>
          <output for="star-input">0점</output>
        </span>
        <input onChange={(e) => setHashtag(e.target.value)} type="text" placeholder="#해시태그" />
        <textarea onChange={(e) => setDescription(e.target.value)} placeholder="내용"></textarea>
        <button onClick={submit}>글 올리기</button>
      </div>
    </div>
  );
}
