const comment = require("../controllers/comment");
const express = require("express");
const router = express.Router();

// 댓글 조회
router.get("/:postId/comments", comment.getComments);
// 댓글 작성
router.post("/:postId/write", comment.writeComment);
// 댓글 수정
router.put("/:postId/update/:commentId", comment.updateComment);
// 댓글 삭제
router.delete("/:postId/delete/:commentId", comment.deleteComment);
// 댓글 좋아요
router.post("/:postId/like/:commentId", comment.likeToggleComment);

module.exports = router;
