import React from "react";
import "./MovieDetail.css";

// Component
import ReviewDetail from "../../components/review/ReviewDetail";
import Reviews from "../../components/review/Reviews";

export default function MovieDetail() {
  return (
    <div id="moviedetail">
      <ReviewDetail />
      <Reviews />
    </div>
  );
}
