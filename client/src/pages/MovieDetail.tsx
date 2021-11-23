import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./styles/MovieDetail.css";
import { Movie, Actors, Review } from "../models/model";

// Component
import ReviewDetail from "../components/review/ReviewDetail";
import MovieReviews from "../components/review/MovieReviews";
import Spinner from "../components/common/Spinner";
import MovieNotFound from "../components/common/MovieNotFound";

export default function MovieDetail() {
  const location = useLocation();
  const [movie, setMovie] = useState<Movie>();
  const [actors, setActors] = useState<Actors>();
  const [movieReviews, setMovieReviews] = useState<Review[]>([]);
  const [movieSpinner, setMovieSpinner] = useState<boolean>(true);

  useEffect(() => {
    const movieId: string = location.pathname.split("/")[2];
    console.log(typeof movieId);

    const getMovieDetail = async (movieId: string) => {
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
            <MovieReviews movieReviews={movieReviews} />
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
