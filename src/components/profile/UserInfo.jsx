import React from "react";
import "./UserInfo.css";

export default function UserInfo() {
  return (
    <div id="userinfo">
      <div className="userinfo__image">
        <i className="fas fa-seedling"></i>
      </div>
      <div className="userinfo__detail">
        <div className="detail__username">
          <span>skdisk3895</span>
          <i className="fas fa-cog"></i>
        </div>
        <div className="detail__info">
          <span className="info__review-count">
            게시물 <b>4</b>
          </span>
          <span className="info__likemovie">
            관심있는 영화 <b>2</b>
          </span>
        </div>
      </div>
    </div>
  );
}
