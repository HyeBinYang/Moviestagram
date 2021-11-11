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
  const [movieReviews, setMovieReviews] = useState([]);
  const [movieSpinner, setMovieSpinner] = useState(true);

  useEffect(() => {
    const movieId = location.pathname.split("/")[2];

    const getMovieDetail = async (movieId) => {
      const movieDetailResponse = await axios.get(`/movie/search/${movieId}/detail`);
      setMovie(movieDetailResponse.data);
      const movieCastResponse = await axios.get(`/movie/${movieId}/cast`);
      setActors(movieCastResponse.data);
      const movieReviewsResponse = await axios.get(`/review/movie/${movieId}`);
      setMovieReviews(movieReviewsResponse.data);

      setMovieSpinner(false);
    };

    getMovieDetail(movieId);
  }, [location]);

  return (
    <>
      {!movieSpinner ? (
        movie ? (
          <div id="moviedetail">
            <ReviewDetail movie={movie} actors={actors.cast} movieReviews={movieReviews} />
            <Reviews movieReviews={movieReviews} />
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
