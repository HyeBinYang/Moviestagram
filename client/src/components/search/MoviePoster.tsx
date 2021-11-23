import React from "react";
import "./MoviePoster.css";
import { Link } from "react-router-dom";

export default function MoviePoster({ movie }) {
  return (
    <Link
      to={{
        pathname: `/movie/${movie.id}/reviews`,
        state: { movieId: movie.id },
      }}
    >
      <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie" />
    </Link>
  );
}
