import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./styles/MovieDetail.css";

// Component
import ReviewDetail from "../components/review/ReviewDetail";
import Reviews from "../components/review/Reviews";
import Spinner from "../components/common/Spinner";
import MovieNotFound from "../components/common/MovieNotFound";

export default function MovieDetail() {
  const location = useLocation();
  const [movie, setMovie] = useState({});
  const [actors, setActors] = useState({});
  const [movieSpinner, setMovieSpinner] = useState(true);
  const [actorsSpinner, setActorsSpinner] = useState(true);

  useEffect(() => {
    const movieId = location.pathname.split("/")[2];

    axios
      .get(`/movie/search/${movieId}/detail`)
      .then((res) => {
        setMovie(res.data);
        setMovieSpinner(false);
      })
      .catch((err) => console.log(err));

    axios
      .get(`/movie/${movieId}/cast`)
      .then((res) => {
        setActors(res.data);
        setActorsSpinner(false);
      })
      .catch((err) => console.log(err));
  }, [location]);

  return (
    <>
      {!movieSpinner && !actorsSpinner ? (
        movie ? (
          <div id="moviedetail">
            <ReviewDetail movie={movie} actors={actors.cast} />
            <Reviews />
          </div>
        ) : (
          <MovieNotFound />
        )
      ) : (
        <Spinner />
      )}
    </>
  );
}
