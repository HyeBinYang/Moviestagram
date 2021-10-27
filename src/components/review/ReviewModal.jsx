import React from "react";
import "./ReviewModal.css";

import { useHistory } from "react-router-dom";

export default function ReviewModal() {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div id="reviewmodal">
      <img src="https://picsum.photos/200/300" alt="review image" className="reviewmodal__image" />
      <div className="reivewmodal__info">
        <div className="info__username">
          <div className="username">
            <i class="fas fa-seedling"></i>
            <span>skdisk3895</span>
          </div>
          <i class="fas fa-times" onClick={() => goBack()}></i>
        </div>
        <div className="info__content">
          <div className="content__user">
            <i class="fas fa-seedling"></i>
            <span>skdisk3895</span>
          </div>
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </span>
        </div>
        <div className="info__movie">
          <a href="#">#니모를 찾아서</a>
        </div>
        <div className="info__rate">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <div className="info__period">1시간 전</div>
        <div className="info__comments">
          <div className="comment">
            <div className="comment__user">
              <div className="user__info">
                <i class="fas fa-seedling"></i>
                <b>skdisk7368</b>
              </div>
              <div className="setting__btn">
                <i class="fas fa-ellipsis-v"></i>
                <i class="far fa-heart"></i>
              </div>
            </div>
            <div className="comment__description">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div className="detail_sub">
              <span>2020년 6월 22일 11:13</span>
              <span>좋아요 1개</span>
            </div>
          </div>
        </div>
        <div className="info__write">
          <textarea type="text" placeholder="댓글 쓰기" />
          <button>게시</button>
        </div>
      </div>
    </div>
  );
}
