import React from "react";
import { Link } from "react-router-dom";
import "./RightSide.css";

// Component
import CommandedMovie from "./CommandedMovie";
import { useSelector } from "react-redux";

export default function RightSide({ recommandedMovies }) {
  const userName = useSelector((state) => state.auth.userName);

  return (
    <div id="rightside">
      <Link to={`/user/${userName}`} className="rightside__user">
        <i className="fas fa-seedling"></i>
        <span>{userName}</span>
      </Link>
      <div className="rightside__recommend">
        <h3>회원님을 위한 추천 영화</h3>
        <div className="recommend__movies">
          {recommandedMovies.map((movie, index) => {
            return (
              <Link to={`/movie/${movie.id}/reviews`} key={index}>
                <CommandedMovie movie={movie} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
