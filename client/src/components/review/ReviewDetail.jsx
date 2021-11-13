import React from "react";
import "./ReviewDetail.css";
import { Link, useLocation } from "react-router-dom";

export default function ReviewDetail({ movie, actors, movieReviews }) {
  const location = useLocation();

  const getRateAverage = () => {
    let sum = 0;
    movieReviews.forEach((review) => (sum += review.rate));
    return Math.round((sum / movieReviews.length) * 100) / 100 || 0;
  };

  return (
    <div id="reviewdetail">
      <div className="reviewdetail__movie">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" className="movie__poster" />
        <div className="movie__info">
          <h1 className="info__title">
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h1>
          <dl className="info__detail">
            <div className="info__group">
              <dt>
                <span>개요</span>
              </dt>
              <dd>
                {movie.genres.map((genre, index) => (
                  <span key={index}>{genre.name} </span>
                ))}
                <span className="seperator"></span>
                <span>{movie.original_language}</span>
                <span className="seperator"></span>
                <span>{movie.runtime}분</span>
              </dd>
            </div>
            <div className="info__group">
              <dt>
                <span>개봉</span>
              </dt>
              <dd>
                <span>{movie.release_date.replaceAll("-", ".")}</span>
              </dd>
            </div>
            <div className="info__group">
              <dt>
                <span>평점</span>
              </dt>
              <dd>
                <span>{getRateAverage()} 점</span>
              </dd>
            </div>
            <div className="info__group">
              <dt>
                <span>리뷰수</span>
              </dt>
              <dd>
                <span>{movieReviews.length} 개</span>
              </dd>
            </div>
          </dl>
          <div className="info__story">{movie.overview}</div>
          <Link
            to={{
              pathname: "/write",
              state: { background: location, movieId: movie.id, movieName: movie.title },
            }}
            className="info__review"
          >
            리뷰쓰기
          </Link>
        </div>
      </div>
      <div className="reviewdetail__performer">
        <h1>주요 출연진</h1>
        <div className="performers">
          {actors.map((actor, index) => {
            return (
              <div className="performers__info" key={index}>
                <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt="director" />
                <p>{actor.name}</p>
                <p>{actor.character}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
