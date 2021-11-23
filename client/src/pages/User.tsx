import React, { useEffect, useState } from "react";
import "./styles/User.css";
import axios, { AxiosResponse } from "axios";
import UserInfo from "../components/profile/UserInfo";
import UserReviews from "../components/profile/UserReviews";
import { useLocation } from "react-router-dom";
import { Review } from "../models/model";

export default function Profile() {
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const location = useLocation();
  const userName: string = location.pathname.split("/")[2];

  useEffect(() => {
    const getUserInfo = async () => {
      const userData: AxiosResponse = await axios.get(`/review/user/${userName}`);
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
