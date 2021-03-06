import React from "react";
import "./UserInfo.css";
import { Review } from "../../models/model";

interface UserInfo {
  userReviews: Review[];
  userName: string;
}

export default function UserInfo({ userReviews, userName }: UserInfo) {
  return (
    <div id="userinfo">
      <div className="userinfo__image">
        <i className="fas fa-seedling"></i>
      </div>
      <div className="userinfo__detail">
        <div className="detail__username">
          <span>{userName}</span>
          <i className="fas fa-cog"></i>
        </div>
        <div className="detail__info">
          <span className="info__review-count">
            게시물 <b>{userReviews.length}</b>
          </span>
        </div>
      </div>
    </div>
  );
}
