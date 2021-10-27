import React from "react";
import "./MoviePoster.css";
import { Link } from "react-router-dom";

export default function MoviePoster() {
  return (
    <Link to={`/movie/${123}/reviews`}>
      <img className="movie-poster" src="https://picsum.photos/300" alt="movie" />
    </Link>
  );
}
