import React from "react";
import "./MovieDetail.css";

// Component
import ReviewDetail from "./ReviewDetail";
import Reviews from "./Reviews";

export default function MovieDetail() {
  return (
    <div id="moviedetail">
      <ReviewDetail />
      <Reviews />
    </div>
  );
}
