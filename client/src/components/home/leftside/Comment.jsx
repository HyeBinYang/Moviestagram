import React, { useEffect, useState } from "react";
import "./Comment.css";
import axios from "axios";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Comment({ reviewId, comments, comment, setComments }) {
  const userName = useSelector((state) => state.auth.userId);
  const [commentLikeToggle, setCommentLikeToggle] = useState(false);
  const [commentLikeCount, setCommentLikeCount] = useState(0);

  useEffect(() => {
    if (comment.commentLikeUsers.filter((user) => user.username === userName).length) setCommentLikeToggle(true);
    setCommentLikeCount(comment.commentLikeUsers.length);
  }, []);

  const deleteComment = () => {
    axios
      .delete(`/comment/${reviewId}/delete/${comment.id}`)
      .then(() => {
        const newComments = comments.filter((c) => c.id !== comment.id);
        setComments(newComments);
      })
      .catch((err) => console.log(err));
  };

  const onHandleLike = () => {
    axios
      .post(`/comment/${reviewId}/like/${comment.id}`, { userName })
      .then(() => {
        commentLikeToggle ? setCommentLikeCount(commentLikeCount - 1) : setCommentLikeCount(commentLikeCount + 1);
        setCommentLikeToggle(!commentLikeToggle);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="comments__comment">
      <div className="comment__description">
        <Link to={`/user/${comment.username}`}>
          <b>{comment.username}</b>
        </Link>
        {comment.content}
        <div className="comment__likecount">
          좋아요 <b>{commentLikeCount}</b>개
        </div>
      </div>
      <div className="comment__icon">
        {commentLikeToggle ? (
          <i onClick={onHandleLike} className="fas fa-heart" style={{ color: "red" }}></i>
        ) : (
          <i onClick={onHandleLike} className="far fa-heart"></i>
        )}
        {comment.username === userName ? (
          <>
            <i onClick={deleteComment} className="fas fa-trash-alt"></i>
            <i className="fas fa-edit"></i>
          </>
        ) : null}
      </div>
    </div>
  );
}
