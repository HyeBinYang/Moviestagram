import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Component
import MovieList from "../components/search/MovieList";
import Spinner from "../components/common/Spinner";
import MovieNotFound from "../components/common/MovieNotFound";

export default function Movies() {
  const [movieList, setMovieList] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:3000/movie/search", { params: { movie: new URLSearchParams(location.search).get("movie") } })
      .then((res) => {
        console.log(res.data);
        setMovieList([...res.data.results]);
        setSpinner(false);
      })
      .catch((err) => console.log(err));
  }, [location]);

  return <>{!spinner ? movieList.length ? <MovieList movieList={movieList} /> : <MovieNotFound /> : <Spinner />}</>;
}
