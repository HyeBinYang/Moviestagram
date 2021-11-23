import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./MovieReviews.css";

import Review from "../common/Review";
import { Review as R } from "../../models/model";

interface MovieReviews {
  movieReviews: R[];
}

export default function Reviews({ movieReviews }: MovieReviews) {
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
            <Review image={movieReview.image} />
          </Link>
        );
      })}
    </div>
  );
}
