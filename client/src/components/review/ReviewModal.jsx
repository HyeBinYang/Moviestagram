import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./ReviewModal.css";
import axios from "axios";
import { useSelector } from "react-redux";
import ReviewComment from "./ReviewComment";

const getCreated = (created) => {
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
};

const setRate = (rate) => {
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

  return rateToIcon[rate];
};

export default function ReviewModal({ movieReview }) {
  const history = useHistory();
  const userName = useSelector((state) => state.auth.userName);

  // State
  const [commentText, setCommentText] = useState();
  const [commentForm, setCommentForm] = useState({
    content: "",
    userName: userName,
  });
  const [comments, setComments] = useState([]);
  const [likeToggle, setLikeToggle] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(0);

  useEffect(() => {
    if (movieReview.postLikeUsers.filter((user) => user.username === userName).length) setLikeToggle(true);
    setPostLikeCount(movieReview.postLikeUsers.length);
    setComments([...movieReview.comments]);
  }, []);

  // --------------Function ------------------
  // 좋아요
  const onHandleLike = useCallback(() => {
    axios
      .post(`/review/like/${movieReview.id}`, { userName })
      .then(() => {
        likeToggle ? setPostLikeCount(postLikeCount - 1) : setPostLikeCount(postLikeCount + 1);
        setLikeToggle(!likeToggle);
      })
      .catch((err) => console.log(err));
  }, [userName, likeToggle, postLikeCount]);

  const writeComment = useCallback((e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value,
    });
  }, []);

  // 댓글 등록
  const submitComment = useCallback(() => {
    if (commentForm.content.length > 0) {
      axios
        .post(`/comment/${movieReview.id}/write`, commentForm)
        .then((res) => {
          setComments([
            ...comments,
            {
              id: res.data.id,
              username: userName,
              content: commentForm.content,
              commentLikeUsers: [],
            },
          ]);
          setCommentForm({
            userName,
            content: "",
          });
        })
        .catch((err) => console.log(err));
    }
  }, [comments, commentForm, userName]);

  const goBack = useCallback(() => {
    history.goBack();
  }, []);

  const postCreated = useMemo(() => getCreated(movieReview.created), []);
  const movieRate = useMemo(() => setRate(movieReview.rate), []);

  return (
    <div id="reviewmodal">
      <img
        src={`${process.env.PUBLIC_URL}/img/uploadedFiles/${movieReview.image}`}
        alt={"review photo"}
        className="reviewmodal__image"
      />
      <div className="reivewmodal__info">
        <div className="info__username">
          <Link className="username" to={`/user/${movieReview.username}`}>
            <i className="fas fa-seedling"></i>
            <span>{movieReview.username}</span>
          </Link>
          <i className="fas fa-times" onClick={goBack}></i>
        </div>
        <div className="info__content">
          <Link className="content__user" to={`/user/${movieReview.username}`}>
            <i className="fas fa-seedling"></i>
            <span>{movieReview.username}</span>
          </Link>
          <span>{movieReview.description}</span>
        </div>
        <div className="info__movie">
          <Link to={`/movie/${movieReview.movie_id}/reviews`}>#{`${movieReview.movie_name}`} </Link>
          {movieReview.hashtags.map((hashtag) => (
            <Link to={`/movie/${movieReview.movieId}/reviews`} key={hashtag.id}>
              {`${hashtag.name}`}{" "}
            </Link>
          ))}
        </div>
        <div className="info__rate">{movieRate}</div>
        <div className="info__period">
          <span>{postCreated}</span>
          <span>
            좋아요 <b>{postLikeCount}</b>개
          </span>
        </div>
        <div className="home-review__icon">
          {likeToggle ? (
            <i onClick={onHandleLike} class="fas fa-heart" style={{ color: "red" }}></i>
          ) : (
            <i onClick={onHandleLike} className="far fa-heart"></i>
          )}
        </div>
        <div className="info__comments">
          {comments.map((comment, index) => (
            <ReviewComment
              reviewId={movieReview.id}
              comments={comments}
              comment={comment}
              setComments={setComments}
              getCreated={getCreated}
              key={index}
            />
          ))}
        </div>
        <div className="info__write">
          <textarea
            type="text"
            placeholder="댓글 달기"
            name="content"
            onChange={writeComment}
            value={commentForm.content}
          />
          {commentForm.content ? (
            <button className="active" onClick={submitComment}>
              게시
            </button>
          ) : (
            <button>게시</button>
          )}
        </div>
      </div>
    </div>
  );
}
