import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewModal from "../components/review/ReviewModal";
import Shadow from "../components/common/Shadow";
import { useLocation } from "react-router-dom";

export default function Review() {
  const location = useLocation();
  const [movieReview, setMovieReview] = useState(null);

  useEffect(() => {
    const postId = location.state.postId;

    const setReview = async () => {
      const response = await axios.get(`/review/${postId}`);
      setMovieReview(response.data);
    };

    setReview();
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
