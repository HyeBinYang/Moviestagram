import React from "react";
import "./UserReviews.css";
import Review from "../common/Review";
import { Link, useLocation } from "react-router-dom";
import { Review as UserReview } from "../../models/model";

interface UserReviews {
  userReviews: UserReview[];
}

export default function UserReviews({ userReviews }: UserReviews) {
  const location = useLocation();

  return (
    <div id="userreviews">
      {userReviews.map((userReview) => {
        return (
          <Link
            to={{
              pathname: `/review/${userReview.id}`,
              state: { background: location, postId: userReview.id },
            }}
            key={userReview.id}
          >
            <Review image={userReview.image} />
          </Link>
        );
      })}
    </div>
  );
}
