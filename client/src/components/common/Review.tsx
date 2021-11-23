import React from "react";
import "./Review.css";

export default function Review({ movieReview }) {
  return (
    <div className="review">
      <img src={`${process.env.PUBLIC_URL}/img/uploadedFiles/${movieReview.image}`} alt="Review image" className="review" />
    </div>
  );
}
