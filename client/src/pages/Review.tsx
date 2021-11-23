import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewModal from "../components/review/ReviewModal";
import Shadow from "../components/common/Shadow";
import { useLocation } from "react-router-dom";
import { Review as MovieReview } from "../models/model";

export default function Review() {
  const location = useLocation();
  const [movieReview, setMovieReview] = useState<MovieReview>();

  useEffect(() => {
    const postId = location.state.postId;
    const setReview = async () => {
      const response = await axios.get(`/review/${postId}`);
      setMovieReview(response.data);
    };
    setReview();
    document.body.className = "non-scroll";

    return () => {
      document.body.className = "";
    };
  }, []);

  return (
    <>
      {movieReview ? (
        <>
          <ReviewModal movieReview={movieReview} />
          <Shadow />
        </>
      ) : null}
    </>
  );
}
