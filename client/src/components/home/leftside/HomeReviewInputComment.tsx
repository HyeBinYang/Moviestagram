import React, { useState, useCallback } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import axios from "axios";
import { Comment, Review } from "../../../models/model";

interface IProps {
  review: Review;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

function HomeReviewInputComment({ review, comments, setComments }: IProps) {
  const userName = useSelector((state: RootStateOrAny) => state.auth.userName);

  const [commentForm, setCommentForm] = useState({
    content: "",
    userName: userName,
  });

  // 댓글 textarea 면적 조절
  const resizeTextareaHeight = useCallback((e) => {
    e.target.style.height = "40px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }, []);

  const writeComment = useCallback((e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value,
    });
    resizeTextareaHeight(e);
  }, []);

  // 댓글 등록
  const submitComment = useCallback(() => {
    if (commentForm.content.length > 0) {
      axios
        .post(`/comment/${review.id}/write`, commentForm)
        .then((res) => {
          setComments([
            ...comments,
            {
              id: res.data.id,
              username: userName,
              content: commentForm.content,
              commentLikeUsers: [],
            },
          ]);
          setCommentForm({
            userName,
            content: "",
          });
        })
        .catch((err) => console.log(err));
    }
  }, [comments, commentForm, userName]);

  return (
    <div className="home-review__write">
      <textarea placeholder="댓글 달기" name="content" onChange={writeComment} value={commentForm.content} />
      {commentForm.content ? (
        <button className="active" onClick={submitComment}>
          게시
        </button>
      ) : (
        <button>게시</button>
      )}
    </div>
  );
}

export default HomeReviewInputComment;
