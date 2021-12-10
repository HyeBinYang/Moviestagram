import React, { useState, useCallback, useEffect, useMemo } from "react";
import "./HomeReview.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function HomeReviewDetail({ review, getCreated, setRate }) {
  const userName = useSelector((state) => state.auth.userName);

  const [likeToggle, setLikeToggle] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(0);
  const [reviewHeightToggle, setReviewHeightToggle] = useState(false);

  useEffect(() => {
    if (review.postLikeUsers.filter((user) => user.username === userName).length) setLikeToggle(true);
    setPostLikeCount(review.postLikeUsers.length);
  }, []);

  const postCreated = useMemo(() => getCreated(review.created), []);
  const movieRate = useMemo(() => setRate(review.rate), []);

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

  // 장문 리뷰 글 높이 조절
  const adjustReviewHeight = useCallback(() => {
    setReviewHeightToggle(!reviewHeightToggle);
  }, [reviewHeightToggle]);

  return (
    <>
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
        {likeToggle ? (
          <i onClick={onHandleLike} className="fas fa-heart" style={{ color: "red" }}></i>
        ) : (
          <i onClick={onHandleLike} className="far fa-heart"></i>
        )}
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
        <p className="description__created">{postCreated}</p>
        <div className="description__hashtag">
          <Link to={`/movie/${review.movie_id}/reviews`}>#{`${review.movie_name}`} </Link>
          {review.hashtags.map((hashtag) => (
            <Link to={`/movie/${review.movieId}/reviews`} key={hashtag.id}>
              {`${hashtag.name}`}{" "}
            </Link>
          ))}
        </div>
        <div className="description__rate">{movieRate}</div>
      </div>
    </>
  );
}

export default HomeReviewDetail;
