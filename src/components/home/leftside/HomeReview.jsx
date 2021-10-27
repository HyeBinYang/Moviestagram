import React, { useState } from "react";
import "./HomeReview.css";
import { Link } from "react-router-dom";

import Comment from "./Comment";

function HomeReview() {
  const [comment, setComment] = useState();

  const resizeTextareaHeight = (e) => {
    e.target.style.height = "40px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const writeComment = (e) => {
    setComment(e.target.value);
    resizeTextareaHeight(e);
  };

  return (
    <div id="home-review">
      <Link to={`/user/${"skdisk3895"}`} className="home-review__user">
        <i class="fas fa-seedling"></i>
        <span>skdisk3895</span>
      </Link>
      <div className="home-review__photo">
        <img src="https://picsum.photos/700" alt="User's photo" />
      </div>
      <div className="home-review__icon">
        <i class="far fa-heart"></i>
        <i class="far fa-comment"></i>
      </div>
      <div className="home-review__likecount">
        <b>0명</b>이 좋아합니다.
      </div>
      <div className="home-review__description">
        <p className="description__username">Lorem Ipsum</p>
        <p className="description__content">
          is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <button className="description__more">더 보기</button>
      </div>
      <div className="home-review__comments">
        <button className="comments__all">댓글 n개 모두 보기</button>
        <Comment />
        <Comment />
      </div>
      <div className="home-review__write">
        <textarea type="text" placeholder="댓글 달기" onChange={writeComment} />
        <button>게시</button>
      </div>
    </div>
  );
}

export default HomeReview;
