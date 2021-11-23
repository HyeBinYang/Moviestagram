import React from "react";
import "./Review.css";

interface ReviewImage {
  image: string;
}

export default function Review({ image }: ReviewImage) {
  return (
    <div className="review">
      <img src={`${process.env.PUBLIC_URL}/img/uploadedFiles/${image}`} alt="Review image" className="review" />
    </div>
  );
}
