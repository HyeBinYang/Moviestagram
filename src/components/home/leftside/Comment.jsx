import React from "react";
import "./Comment.css";
import { Link } from "react-router-dom";

export default function Comment() {
  return (
    <div className="comments__comment">
      <div className="comment__description">
        <b>username</b>
        <Link to={`/user/${"skdisk3895"}`}>@skdisk3895</Link>
        댓글내용
      </div>
      <div className="comment__like">
        <i class="far fa-heart"></i>
      </div>
    </div>
  );
}
