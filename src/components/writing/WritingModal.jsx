import React, { useState } from "react";
import "./WritingModal.css";

export default function WritingModal() {
  const [title, setTitle] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  function renderFileButton() {
    return (
      <div className="writingmodal__left-before">
        <p>640px * 640px 크기를 추천합니다.</p>
        <label htmlFor="input-file" className="left__image-btn">
          사진 고르기
        </label>
        <input
          onChange={(e) => {
            const reader = new FileReader();

            reader.onload = () => {
              setPhoto({
                file: e.target.files[0],
                previewURL: reader.result,
              });
            };
            reader.readAsDataURL(e.target.files[0]);
          }}
          id="input-file"
          type="file"
          className="left__image"
        />
      </div>
    );
  }

  const renderImage = () => {
    return (
      <div className="writingmodal__left-upload">
        <div className="review__image">
          <div className="image__centered">
            <img src={photo.previewURL} alt="" />
          </div>
        </div>
      </div>
    );
  };

  const submit = () => {
    const hashtags = hashtag.split(" ").filter((hashtag) => hashtag);
    const formData = {
      title: title,
      hashtags: hashtags,
      description: description,
      photo: photo,
    };

    console.log(formData);
  };

  return (
    <div id="writingmodal">
      {photo ? renderImage() : renderFileButton()}
      <div className="writingmodal__right">
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          placeholder="제목"
        />
        <input
          onChange={(e) => {
            setHashtag(e.target.value);
          }}
          type="text"
          placeholder="#해시태그"
        />
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="내용"
        ></textarea>
        <button
          onClick={() => {
            submit();
          }}
        >
          글 올리기
        </button>
      </div>
    </div>
  );
}
