import React from "react";
import "./MovieList.css";
import MoviePoster from "./MoviePoster";

export default function MovieList({ movieList }) {
  return (
    <div id="movielist">
      {movieList.map((movie, index) => {
        return <MoviePoster movie={movie} key={index} />;
      })}
    </div>
  );
}
