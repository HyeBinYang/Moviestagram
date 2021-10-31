import React from "react";
import "./Reviews.css";
import { Link, useLocation } from "react-router-dom";

import Review from "./Review";

export default function Reviews() {
  const location = useLocation();

  return (
    <div id="reviews">
      <Link
        to={{
          pathname: `/review/${123}`,
          state: { background: location },
        }}
      >
        <Review />
      </Link>
      <Review />
      <Review />
      <Review />
      <Review />
    </div>
  );
}
