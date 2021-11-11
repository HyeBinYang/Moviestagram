import React from "react";
import "./LeftSide.css";

// Component
import HomeReview from "./HomeReview";

export default function LeftSide({ newReviews }) {
  return (
    <div id="leftside">
      {newReviews.map((review) => {
        return <HomeReview review={review} key={review.id} />;
      })}
    </div>
  );
}
