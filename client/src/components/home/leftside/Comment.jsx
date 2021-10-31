import React from "react";
import "./Comment.css";

import { Link } from "react-router-dom";

export default function Comment({ comment }) {
  return (
    <div className="comments__comment">
      <div className="comment__description">
        <Link to={`/user/${comment.username}`}>
          <b>{comment.username}</b>
        </Link>
        {comment.body}
      </div>
      <div className="comment__like">
        <i className="far fa-heart"></i>
      </div>
    </div>
  );
}
