import React from "react";
import "./LeftSide.css";

// Component
import HomeReview from "./HomeReview";
import { Review } from "../../../models/model";

interface IProps {
  newReviews: Review[];
}

export default function LeftSide({ newReviews }: IProps) {
  return (
    <div id="leftside">
      {newReviews.map((review) => {
        return <HomeReview review={review} key={review.id} />;
      })}
    </div>
  );
}
