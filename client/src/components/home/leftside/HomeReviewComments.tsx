import React, { useEffect } from "react";
import HomeReviewComment from "./HomeReviewComment";
import { Link, useLocation } from "react-router-dom";
import { Review, Comment } from "../../../models/model";

interface IProps {
  review: Review;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  getCreated: (param: string | undefined) => string | undefined;
}

function HomeReviewComments({ review, getCreated, comments, setComments }: IProps) {
  const location = useLocation();

  useEffect(() => {
    setComments([...review.comments]);
  }, []);

  return (
    <div className="home-review__comments">
      {review.comments.length > 5 ? (
        <Link
          to={{
            pathname: `/review/${123}`,
            state: { background: location },
          }}
          className="comments__all"
        >
          댓글 {review.comments.length}개 모두 보기
        </Link>
      ) : null}
      {comments.map((comment) => (
        <HomeReviewComment
          reviewId={review.id}
          comments={comments}
          comment={comment}
          setComments={setComments}
          getCreated={getCreated}
          key={comment.id}
        />
      ))}
    </div>
  );
}

export default HomeReviewComments;
