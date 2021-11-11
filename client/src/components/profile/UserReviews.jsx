import React from "react";
import "./UserReviews.css";

export default function UserReviews({ userReviews }) {
  return (
    <div id="userreviews">
      {userReviews.map((userReview) => (
        <img src={`${process.env.PUBLIC_URL}/img/uploadedFiles/${userReview.image}`} alt="user's review" className="userreviews__review" />
      ))}
    </div>
  );
}
