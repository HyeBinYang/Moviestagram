import React from "react";
import "./MoviePoster.css";
import { Link } from "react-router-dom";
import { Movie } from "../../models/model";

interface MovieProps {
  movie: Movie;
}

export default function MoviePoster({ movie }: MovieProps) {
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
