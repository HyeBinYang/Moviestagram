import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./ReviewModal.css";
import axios from "axios";

export default function ReviewModal() {
  const [photo, setPhoto] = useState({});

  useEffect(() => {
    axios
      .get("/review/post/1")
      .then((res) => {
        setPhoto(JSON.parse(res.data.image));
      })
      .catch((err) => console.log(err));
  }, []);

  const goBack = () => {
    history.goBack();
  };

  return (
    <div id="reviewmodal">
      <img src={`${process.env.PUBLIC_URL}/img/uploadedFiles/${photo.filename}`} alt={photo.path} className="reviewmodal__image" />
      <div className="reivewmodal__info">
        <div className="info__username">
          <div className="username">
            <i className="fas fa-seedling"></i>
            <span>skdisk3895</span>
          </div>
          <i className="fas fa-times" onClick={goBack}></i>
        </div>
        <div className="info__content">
          <div className="content__user">
            <i className="fas fa-seedling"></i>
            <span>skdisk3895</span>
          </div>
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </span>
        </div>
        <div className="info__movie">
          <Link to={`/movie/${2523}/reviews`}>#니모를 찾아서</Link>
        </div>
        <div className="info__rate">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
        <div className="info__period">1시간 전</div>
        <div className="info__comments">
          <div className="comment">
            <div className="comment__user">
              <div className="user__info">
                <i className="fas fa-seedling"></i>
                <b>skdisk7368</b>
              </div>
              <div className="setting__btn">
                <i className="fas fa-ellipsis-v"></i>
                <i className="far fa-heart"></i>
              </div>
            </div>
            <div className="comment__description">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div className="detail_sub">
              <span>2020년 6월 22일 11:13</span>
              <span>좋아요 1개</span>
            </div>
          </div>
        </div>
        <div className="info__write">
          <textarea type="text" placeholder="댓글 쓰기" />
          <button>게시</button>
        </div>
      </div>
    </div>
  );
}
