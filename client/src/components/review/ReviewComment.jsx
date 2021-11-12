import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReviewComment.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ReviewComment({ reviewId, comments, comment, setComments, getCreated }) {
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
    <div className="comment">
      <div className="comment__user">
        <div className="user__info">
          <i className="fas fa-seedling"></i>
          <Link to={`/user/${comment.username}`}>{comment.username}</Link>
        </div>
        <div className="setting__btn">
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
      <div className="comment__description">{comment.content}</div>
      <div className="detail_sub">
        <span>{getCreated(comment.created)}</span>
        <span>
          좋아요 <b>{commentLikeCount}</b>개
        </span>
      </div>
    </div>
  );
}
