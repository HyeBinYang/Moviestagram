import React from "react";
import "./Profile.css";
import UserInfo from "./UserInfo";
import UserReviews from "./UserReviews";

export default function Profile() {
  return (
    <div id="profile">
      <UserInfo />
      <UserReviews />
    </div>
  );
}
