import React from "react";
import { Movie } from "../../models/model";
import "./MovieList.css";
import MoviePoster from "./MoviePoster";

interface MovieListProps {
  movieList: Movie[];
}

export default function MovieList({ movieList }: MovieListProps) {
  return (
    <div id="movielist">
      {movieList.map((movie, index) => {
        return <MoviePoster movie={movie} key={index} />;
      })}
    </div>
  );
}
