import React, { useEffect, useState } from "react";
import "./styles/User.css";
import axios from "axios";
import UserInfo from "../components/profile/UserInfo";
import UserReviews from "../components/profile/UserReviews";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const [userReviews, setUserReviews] = useState([]);
  const location = useLocation();
  const userName = location.pathname.split("/")[2];

  useEffect(() => {
    const getUserInfo = async () => {
      const userData = await axios.get(`/review/user/${userName}`);
      setUserReviews(userData.data);
    };
    getUserInfo();
  }, []);

  return (
    <div id="profile">
      <UserInfo userReviews={userReviews} userName={userName} />
      <UserReviews userReviews={userReviews} />
    </div>
  );
}
