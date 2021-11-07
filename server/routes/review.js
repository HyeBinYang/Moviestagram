const express = require("express");
const router = express.Router();
const review = require("../controllers/review");

// 특정영화의 모든 리뷰를 가지고오기
router.get("/:movieId", review.getMovieReviews);
// 특정유저의 모든 리뷰를 가지고 오기
router.get("/:userId", review.getUserReviews);
// 홈 화면에서 최신 리뷰 가지고 오기
router.get("/new", review.getNewReviews);
// 리뷰 작성
router.post("/write", review.writeReview);
// 리뷰 수정
router.put("/update", review.updateReview);
// 리뷰 삭제
router.delete("/delete", review.deleteReview);

module.exports = router;
