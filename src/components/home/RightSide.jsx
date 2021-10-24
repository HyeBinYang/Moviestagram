import React from "react";
import "./RightSide.css";

function RightSide() {
  return (
    <div id="rightside">
      <div className="rightside__user">
        <i class="fas fa-seedling"></i>
        <span>skdisk3895</span>
      </div>
      <div className="rightside__recommend">
        <h3>회원님을 위한 추천 영화</h3>
        <div className="recommend__movies">
          <div className="movie">
            <img src="logo192.png" alt="" />
            <span>포레스트 검프</span>
          </div>
          <div className="movie">
            <img src="logo192.png" alt="" />
            <span>포레스트 검프포레스트 검프포레스트 검프</span>
          </div>
          <div className="movie">
            <img src="logo192.png" alt="" />
            <span>포레스트 검프</span>
          </div>
          <div className="movie">
            <img src="logo192.png" alt="" />
            <span>포레스트 검프</span>
          </div>
          <div className="movie">
            <img src="logo192.png" alt="" />
            <span>포레스트 검프</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSide;
