const comment = require("../controllers/comment");
const express = require("express");
const router = express.Router();

router.get("/:postId/comments", comment.getComments);
router.post("/:postId/comment/write", comment.writeComment);
router.put("/:postId/comment/update", comment.updateComment);
router.delete("/:postId/comment/delete", comment.deleteComment);

module.exports = router;
