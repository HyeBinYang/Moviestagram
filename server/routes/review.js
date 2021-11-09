const express = require("express");
const router = express.Router();
const review = require("../controllers/review");
const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploadedFiles/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
// const uploadWithOriginalFilename = multer({ storage: storage }); // 3-2

// 특정영화의 모든 리뷰를 가지고오기
router.get("/movie/:movieId", review.getMovieReviews);
// 특정유저의 모든 리뷰를 가지고 오기
router.get("/user/:userId", review.getUserReviews);
// 홈 화면에서 최신 리뷰 가지고 오기
router.get("/new", review.getNewReviews);
// 특정 리뷰 가지고 오기
router.get("/post/:postId", review.getReview);
// 리뷰 작성
router.post("/write", upload.single("photo"), review.writeReview);
// 리뷰 수정
router.put("/update", review.updateReview);
// 리뷰 삭제
router.delete("/delete", review.deleteReview);
// 리뷰 좋아요
router.post("/:postId/like", review.likeToggleReview);

module.exports = router;
