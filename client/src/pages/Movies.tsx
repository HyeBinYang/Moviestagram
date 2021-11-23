import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Movie } from "../models/model";

// Component
import MovieList from "../components/search/MovieList";
import Spinner from "../components/common/Spinner";
import MovieNotFound from "../components/common/MovieNotFound";

export default function Movies() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [spinner, setSpinner] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("/movie/search", { params: { movie: new URLSearchParams(location.search).get("movie") } })
      .then((res: AxiosResponse) => {
        setMovieList([...res.data.results]);
        setSpinner(false);
      })
      .catch((err) => console.log(err));
  }, [location]);

  return <>{!spinner ? movieList.length ? <MovieList movieList={movieList} /> : <MovieNotFound /> : <Spinner />}</>;
}
