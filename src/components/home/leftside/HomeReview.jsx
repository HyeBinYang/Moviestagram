import React, { useState } from "react";
import "./HomeReview.css";
import { Link, useLocation } from "react-router-dom";

import Comment from "./Comment";

function HomeReview() {
  // State
  const location = useLocation();
  const [comments, setComments] = useState([
    {
      id: 1,
      body: "@skdisk3895 답글 111 @skdisk7236",
      username: "hye_bin7368",
    },
    {
      id: 2,
      body: "답글 21313111",
      username: "yhb2kr",
    },
  ]);
  const [commentText, setCommentText] = useState();
  const [reviewHeightToggle, setReviewHeightToggle] = useState(false);

  // --------------Function ------------------
  const resizeTextareaHeight = (e) => {
    e.target.style.height = "40px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // 장문 리뷰 글 높이 조절
  const adjustReviewHeight = () => {
    setReviewHeightToggle(!reviewHeightToggle);
  };

  // 댓글 textarea 면적 조절
  const writeComment = (e) => {
    setCommentText(e.target.value);
    resizeTextareaHeight(e);
  };

  // 댓글 등록
  const submitComment = () => {
    const newComments = [...comments];
    const username = "apple_good";

    newComments.unshift({
      body: commentText,
      username: username,
    });
    setComments(newComments);
    setCommentText("");
  };

  return (
    <div id="home-review">
      <Link to={`/user/${"skdisk3895"}`} className="home-review__user">
        <i className="fas fa-seedling"></i>
        <span>skdisk3895</span>
      </Link>
      <div className="home-review__photo">
        <img src="https://picsum.photos/700" alt="User's photo" />
      </div>
      <div className="home-review__icon">
        <i className="far fa-heart"></i>
        <i className="far fa-comment"></i>
      </div>
      <div className="home-review__likecount">
        <b>0명</b>이 좋아합니다.
      </div>
      <div className="home-review__description">
        <p className="description__username">skdisk3895</p>
        {reviewHeightToggle ? (
          <>
            <p className="description__content-full">
              is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
              an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <button onClick={adjustReviewHeight} className="description__briefly">
              간략히
            </button>
          </>
        ) : (
          <>
            <p className="description__content-briefly">
              is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
              an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <button onClick={adjustReviewHeight} className="description__more">
              더 보기
            </button>
          </>
        )}
      </div>
      <div className="home-review__comments">
        {comments.length > 0 ? (
          <Link
            to={{
              pathname: `/review/${123}`,
              state: { background: location },
            }}
            className="comments__all"
          >
            댓글 {comments.length}개 모두 보기
          </Link>
        ) : null}
        {comments.map((comment, index) => {
          return <Comment comment={comment} key={index} />;
        })}
      </div>
      <div className="home-review__write">
        <textarea type="text" placeholder="댓글 달기" onChange={writeComment} value={commentText} />
        {commentText ? (
          <button className="active" onClick={submitComment}>
            게시
          </button>
        ) : (
          <button>게시</button>
        )}
      </div>
    </div>
  );
}

export default HomeReview;
