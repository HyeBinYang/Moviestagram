import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./MovieReviews.css";

import Review from "../common/Review";

export default function Reviews({ movieReviews }) {
  const location = useLocation();

  return (
    <div id="reviews">
      {movieReviews.map((movieReview) => {
        return (
          <Link
            to={{
              pathname: `/review/${movieReview.id}`,
              state: { background: location, postId: movieReview.id },
            }}
            key={movieReview.id}
          >
            <Review movieReview={movieReview} />
          </Link>
        );
      })}
    </div>
  );
}
