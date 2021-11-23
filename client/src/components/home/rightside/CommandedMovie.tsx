import React from "react";
import "./CommandedMovie.css";

export default function CommandedMovie({ movie }) {
  return (
    <div className="movie">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie poster" />
      <span>{movie.title}</span>
    </div>
  );
}
