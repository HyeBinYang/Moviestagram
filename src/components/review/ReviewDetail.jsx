import React from "react";
import "./ReviewDetail.css";

export default function ReviewDetail() {
  return (
    <div id="reviewdetail">
      <div className="reviewdetail__movie">
        <img src="https://picsum.photos/300" alt="poster" className="movie__poster" />
        <div className="movie__info">
          <h1 className="info__title">니모를 찾아서</h1>
          <div className="info__subtitle">
            <span>Animation, Family</span>
            <span className="seperator"></span>
            <span>Finding Dory</span>
            <span className="seperator"></span>
            <span>2016</span>
          </div>
          <dl className="info__detail">
            <div className="info__group">
              <dt>
                <span>개요</span>
              </dt>
              <dd>
                <span>애니메이션</span>
                <span className="seperator"></span>
                <span>미국</span>
                <span className="seperator"></span>
                <span>100분</span>
              </dd>
            </div>
            <div className="info__group">
              <dt>
                <span>개봉</span>
              </dt>
              <dd>
                <span>2003.06.05</span>
              </dd>
            </div>
            <div className="info__group">
              <dt>
                <span>평점</span>
              </dt>
              <dd>
                <span>9.23</span>
              </dd>
            </div>
            <div className="info__group">
              <dt>
                <span>관객수</span>
              </dt>
              <dd>
                <span>7.3만명</span>
              </dd>
            </div>
          </dl>
          <div className="info__story">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
      <div className="reviewdetail__performer">
        <h1>감독 및 출연</h1>
        <div className="performers">
          <div className="performers__info">
            <img src="https://picsum.photos/200" alt="director" />
            <p>앤드류 스탠톤</p>
            <p>감독</p>
          </div>
          <div className="performers__info">
            <img src="https://picsum.photos/200" alt="actor" />
            <p>앨버트 브룩스</p>
            <p>말린 목소리 역</p>
          </div>
        </div>
      </div>
    </div>
  );
}
