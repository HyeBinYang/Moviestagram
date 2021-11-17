import React, { useCallback, useEffect, useState } from "react";
import "./HomeReview.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import Comment from "./Comment";
import { useSelector } from "react-redux";

export default function HomeReview({ review }) {
  // State
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState();
  const [reviewHeightToggle, setReviewHeightToggle] = useState(false);
  const [likeToggle, setLikeToggle] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(0);

  const userName = useSelector((state) => state.auth.userName);

  useEffect(() => {
    if (review.postLikeUsers.filter((user) => user.username === userName).length) setLikeToggle(true);
    setPostLikeCount(review.postLikeUsers.length);
    setComments([...review.comments]);
  }, []);

  // --------------Function ------------------
  // 좋아요
  const onHandleLike = useCallback(() => {
    axios
      .post(`/review/like/${review.id}`, { userName })
      .then(() => {
        likeToggle ? setPostLikeCount(postLikeCount - 1) : setPostLikeCount(postLikeCount + 1);
        setLikeToggle(!likeToggle);
      })
      .catch((err) => console.log(err));
  }, [userName, likeToggle, postLikeCount]);

  const resizeTextareaHeight = useCallback((e) => {
    e.target.style.height = "40px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }, []);

  // 장문 리뷰 글 높이 조절
  const adjustReviewHeight = useCallback(() => {
    setReviewHeightToggle(!reviewHeightToggle);
  }, [reviewHeightToggle]);

  // 댓글 textarea 면적 조절
  const writeComment = useCallback((e) => {
    setCommentText(e.target.value);
    resizeTextareaHeight(e);
  }, []);

  // 댓글 등록
  const submitComment = useCallback(() => {
    if (commentText.length > 0) {
      axios
        .post(`/comment/${review.id}/write`, {
          content: commentText,
          userName,
        })
        .then(() => {
          setComments([...comments, { username: userName, content: commentText, commentLikeUsers: [] }]);
          setCommentText("");
        })
        .catch((err) => console.log(err));
    }
  }, [comments, commentText, userName]);

  const getCreated = useCallback((created) => {
    const now = new Date();
    const createdDate = new Date(created);

    const secDiff = (now.getTime() - createdDate.getTime()) / 1000;
    const minDiff = secDiff / 60;
    const hourDiff = minDiff / 60;
    const dayDiff = hourDiff / 24;
    const monthDiff = dayDiff / 30;
    const yearDiff = monthDiff / 12;

    if (yearDiff >= 1) {
      return `${parseInt(yearDiff)}년 전`;
    } else if (monthDiff >= 1) {
      return `${parseInt(monthDiff)}달 전`;
    } else if (dayDiff >= 1) {
      if (dayDiff > 28) {
        return "4주 전";
      } else if (dayDiff > 21) {
        return "3주 전";
      } else if (dayDiff > 14) {
        return "2주 전";
      } else if (dayDiff > 7) {
        return "1주 전";
      } else if (parseInt(dayDiff) === 1) {
        return `하루 전`;
      } else {
        return `${parseInt(dayDiff)}일 전`;
      }
    } else if (hourDiff >= 1) {
      return `${parseInt(hourDiff)}시간 전`;
    } else if (minDiff >= 1) {
      return `${parseInt(minDiff)}분 전`;
    } else {
      return "몇초 전";
    }
  }, []);

  const setRate = useCallback(() => {
    const rateToIcon = {
      0.5: <></>,
      1: (
        <>
          <i className="fas fa-star"></i>
        </>
      ),
      1.5: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half"></i>
        </>
      ),
      2: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </>
      ),
      2.5: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half"></i>
        </>
      ),
      3: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </>
      ),
      3.5: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half"></i>
        </>
      ),
      4: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </>
      ),
      4.5: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half"></i>
        </>
      ),
      5: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </>
      ),
    };

    return rateToIcon[review.rate];
  }, []);

  return (
    <div id="home-review">
      <div className="home-review__user">
        <Link to={`/user/${review.username}`} className="user__info">
          <i className="fas fa-seedling"></i>
          <span>{review.username}</span>
        </Link>
        {userName === review.username ? (
          <div className="user__setting">
            <i className="fas fa-trash-alt"></i>
            <i className="fas fa-edit"></i>
          </div>
        ) : null}
      </div>
      <div className="home-review__photo">
        <img src={`${process.env.PUBLIC_URL}/img/uploadedFiles/${review.image}`} alt="User's photo" />
      </div>
      <div className="home-review__icon">
        {likeToggle ? <i onClick={onHandleLike} class="fas fa-heart" style={{ color: "red" }}></i> : <i onClick={onHandleLike} className="far fa-heart"></i>}
      </div>
      <div className="home-review__likecount">
        <b>{postLikeCount}명</b>이 좋아합니다.
      </div>
      <div className="home-review__description">
        <Link to={`/user/${review.username}`} className="description__username">
          {review.username}
        </Link>
        {review.description.length > 100 ? (
          reviewHeightToggle ? (
            <>
              <p className="description__content-full">{review.description}</p>
              <button onClick={adjustReviewHeight} className="description__briefly">
                간략히
              </button>
            </>
          ) : (
            <>
              <p className="description__content-briefly">{review.description}</p>
              <button onClick={adjustReviewHeight} className="description__more">
                더 보기
              </button>
            </>
          )
        ) : (
          <p className="description__content-briefly">{review.description}</p>
        )}
        <p className="description__created">{getCreated(review.created)}</p>
        <div className="description__hashtag">
          <Link to={`/movie/${review.movie_id}/reviews`}>#{`${review.movie_name}`} </Link>
          {review.hashtags.map((hashtag) => (
            <Link to={`/movie/${review.movieId}/reviews`} key={hashtag.id}>
              {`${hashtag.name}`}{" "}
            </Link>
          ))}
        </div>
        <div className="description__rate">{setRate()}</div>
      </div>
      <div className="home-review__comments">
        {review.comments.length > 5 ? (
          <Link
            to={{
              pathname: `/review/${123}`,
              state: { background: location },
            }}
            className="comments__all"
          >
            댓글 {review.comments.length}개 모두 보기
          </Link>
        ) : null}
        {comments.map((comment, index) => (
          <Comment reviewId={review.id} comments={comments} comment={comment} setComments={setComments} getCreated={getCreated} key={index} />
        ))}
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
