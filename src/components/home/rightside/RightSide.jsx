import React from "react";
import "./RightSide.css";
import { Link } from "react-router-dom";
import CommandedMovie from "./CommandedMovie";

export default function RightSide() {
  return (
    <div id="rightside">
      <Link to={`/user/${"skdisk3895"}`} className="rightside__user">
        <i className="fas fa-seedling"></i>
        <span>skdisk3895</span>
      </Link>
      <div className="rightside__recommend">
        <h3>회원님을 위한 추천 영화</h3>
        <div className="recommend__movies">
          <Link to={`/movie/${2343}/reviews`}>
            <CommandedMovie />
          </Link>
          <Link to={`/movie/${2233}/reviews`}>
            <CommandedMovie />
          </Link>
          <Link to={`/movie/${1343}/reviews`}>
            <CommandedMovie />
          </Link>
          <Link to={`/movie/${343}/reviews`}>
            <CommandedMovie />
          </Link>
          <Link to={`/movie/${43}/reviews`}>
            <CommandedMovie />
          </Link>
        </div>
      </div>
    </div>
  );
}
