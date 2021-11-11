import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Reviews.css";

import Review from "./Review";

export default function Reviews({ movieReviews }) {
  const location = useLocation();

  return (
    <div id="reviews">
      {movieReviews.map((movieReview) => {
        return (
          <Link
            to={{
              pathname: `/review/${123}`,
              state: { background: location },
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
