import React from "react";
import "./Profile.css";
import UserInfo from "../../components/profile/UserInfo";
import UserReviews from "../../components/profile/UserReviews";

export default function Profile() {
  return (
    <div id="profile">
      <UserInfo />
      <UserReviews />
    </div>
  );
}
