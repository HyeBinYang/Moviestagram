import React, { useState } from "react";
import "./HomeReview.css";

import HomeReviewDetail from "./HomeReviewDetail";
import HomeReviewComments from "./HomeReviewComments";
import HomeReviewInputComment from "./HomeReviewInputComment";
import { Review, Comment } from "../../../models/model";

interface IProps {
  review: Review;
}

export default function HomeReview({ review }: IProps) {
  // State
  const [comments, setComments] = useState<Comment[]>([]);

  const getCreated = (created: string | undefined): string | undefined => {
    if (created) {
      const now = new Date();
      const createdDate = new Date(created);

      const secDiff = (now.getTime() - createdDate.getTime()) / 1000;
      const minDiff = secDiff / 60;
      const hourDiff = minDiff / 60;
      const dayDiff = hourDiff / 24;
      const monthDiff = dayDiff / 30;
      const yearDiff = monthDiff / 12;

      if (yearDiff >= 1) {
        return `${Math.floor(yearDiff)}년 전`;
      } else if (monthDiff >= 1) {
        return `${Math.floor(monthDiff)}달 전`;
      } else if (dayDiff >= 1) {
        if (dayDiff > 28) {
          return "4주 전";
        } else if (dayDiff > 21) {
          return "3주 전";
        } else if (dayDiff > 14) {
          return "2주 전";
        } else if (dayDiff > 7) {
          return "1주 전";
        } else if (Math.floor(dayDiff) === 1) {
          return `하루 전`;
        } else {
          return `${Math.floor(dayDiff)}일 전`;
        }
      } else if (hourDiff >= 1) {
        return `${Math.floor(hourDiff)}시간 전`;
      } else if (minDiff >= 1) {
        return `${Math.floor(minDiff)}분 전`;
      } else {
        return "몇초 전";
      }
    }
  };

  const setRate = (rate: number): JSX.Element => {
    interface IRateToIcon {
      [key: number]: JSX.Element;
      0.5: JSX.Element;
      1: JSX.Element;
      1.5: JSX.Element;
      2: JSX.Element;
      2.5: JSX.Element;
      3: JSX.Element;
      3.5: JSX.Element;
      4: JSX.Element;
      4.5: JSX.Element;
      5: JSX.Element;
    }

    const rateToIcon: IRateToIcon = {
      0.5: <></>,
      1: (
        <>
          <i className="fas fa-star"></i>
        </>
      ),
      1.5: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half"></i>
        </>
      ),
      2: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </>
      ),
      2.5: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half"></i>
        </>
      ),
      3: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </>
      ),
      3.5: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half"></i>
        </>
      ),
      4: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </>
      ),
      4.5: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half"></i>
        </>
      ),
      5: (
        <>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </>
      ),
    };

    return rateToIcon[rate];
  };

  return (
    <div id="home-review">
      <HomeReviewDetail review={review} getCreated={getCreated} setRate={setRate} />
      <HomeReviewComments review={review} getCreated={getCreated} comments={comments} setComments={setComments} />
      <HomeReviewInputComment review={review} comments={comments} setComments={setComments} />
    </div>
  );
}
