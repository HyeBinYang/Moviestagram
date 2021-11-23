import axios from "axios";
import React, { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./WritingModal.css";

interface Image {
  file: any;
  previewURL: string;
}

interface Movie {
  movieId: number;
  movieName: string;
}

export default function WritingModal({ movieId, movieName }: Movie) {
  const history = useHistory();
  const userName = useSelector((state: RootStateOrAny) => state.auth.userId);
  const [hashtag, setHashtag] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photo, setPhoto] = useState<Image>({
    file: "",
    previewURL: "",
  });
  const [rate, setRate] = useState<number>(0);
  const [onDisplayRate, setOnDisplayRate] = useState<number>(0);
  const [filledWidth, setFilledWidth] = useState<number>(0);

  const widthToRate: { [index: string]: number } = {
    18: 0.5,
    36: 1.0,
    54: 1.5,
    72: 2,
    90: 2.5,
    108: 3,
    126: 3.5,
    144: 4,
    162: 4.5,
    180: 5,
  };

  const rateToWidth: { [index: string]: number } = {
    0: 0,
    0.5: 18,
    1: 36,
    1.5: 54,
    2: 72,
    2.5: 90,
    3: 108,
    3.5: 126,
    4: 144,
    4.5: 162,
    5: 180,
  };

  const previewImage = (e: any) => {
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
          <img src={photo?.previewURL ?? ""} alt="" />
        </div>
        <div className="review__btn">
          <label htmlFor="input-file" className="btn__reselect">
            <i className="fas fa-exchange-alt"></i>
          </label>
          <input onChange={previewImage} id="input-file" type="file" className="left__image" />
        </div>
      </div>
    );
  };

  // 평점
  const onMoveRate = (event: any) => {
    const offsetX = event.nativeEvent.offsetX;

    if (offsetX <= 18) {
      setFilledWidth(18);
    } else if (offsetX <= 36) {
      setFilledWidth(36);
    } else if (offsetX <= 54) {
      setFilledWidth(54);
    } else if (offsetX <= 72) {
      setFilledWidth(72);
    } else if (offsetX <= 90) {
      setFilledWidth(90);
    } else if (offsetX <= 108) {
      setFilledWidth(108);
    } else if (offsetX <= 126) {
      setFilledWidth(126);
    } else if (offsetX <= 144) {
      setFilledWidth(144);
    } else if (offsetX <= 162) {
      setFilledWidth(162);
    } else if (offsetX <= 180) {
      setFilledWidth(180);
    }

    setOnDisplayRate(widthToRate[filledWidth]);
  };

  const onClickRate = () => {
    setRate(widthToRate[filledWidth]);
    setOnDisplayRate(widthToRate[filledWidth]);
    setFilledWidth(rateToWidth[onDisplayRate]);
  };

  const onLeaveRate = () => {
    setFilledWidth(rateToWidth[rate]);
    setOnDisplayRate(rate);
  };

  const submit = () => {
    const hashtags = hashtag.split(" ").filter((hashtag) => hashtag);
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("description", description);
    formData.append("photo", photo?.file);
    formData.append("hashtags", hashtags);
    formData.append("movieId", movieId);
    formData.append("movieName", movieName);
    formData.append("rate", rate);

    axios
      .post("/review/write", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        history.push(`/user/${userName}`);
      });
  };

  return (
    <div id="writingmodal">
      {photo ? renderImage() : renderFileButton()}
      <div className="writingmodal__right">
        <div className="rate">
          <div onMouseMove={onMoveRate} onClick={onClickRate} onMouseLeave={onLeaveRate} className="rate__icon">
            <div className="rate__empty">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <div className="rate__fill" style={{ width: `${filledWidth}px` }}>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          </div>
          <div className="rate__score">
            <b>{onDisplayRate}</b>
          </div>
        </div>
        <input onChange={(e) => setHashtag(e.target.value)} type="text" placeholder="#해시태그" />
        <textarea onChange={(e) => setDescription(e.target.value)} placeholder="내용"></textarea>
        <button onClick={submit}>글 올리기</button>
      </div>
    </div>
  );
}
