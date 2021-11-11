const mysql = require("mysql2/promise");
const moment = require("moment");

module.exports = {
  async getComments(req, res, next) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "moviestagram",
      dateStrings: "date",
    });

    try {
      const { postId } = req.params;

      connection.beginTransaction();

      const [comments] = await connection("SELECT * FROM comment WHERE post_id=?", [postId]);
      res.status(200).json(comments);
      connection.commit();
    } catch (err) {
      connection.rollback();
      next(err);
    }
  },
  async writeComment(req, res, next) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "moviestagram",
      dateStrings: "date",
    });

    try {
      const { postId } = req.params;
      const { content, userName } = req.body;

      connection.beginTransaction();

      // DB에 댓글 등록
      await connection.query("INSERT INTO comment (content, post_id, user_id, created, updated) VALUES (?, ?, ?, ?, ?)", [
        content,
        postId,
        userName,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        moment().format("YYYY-MM-DD HH:mm:ss"),
      ]);

      res.status(200).json({ message: "Complete write comment" });
      connection.commit();
    } catch (err) {
      connection.rollback();
      next(err);
    }
  },
  async updateComment(req, res, next) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "moviestagram",
      dateStrings: "date",
    });

    try {
      const { postId, commentId } = req.params;
      const { content } = req.body;

      connection.beginTransaction();

      // DB에 댓글 수정
      await connection.query("UPDATE comment SET content=?, updated=? WHERE id=? AND post_id=?", [
        content,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        commentId,
        postId,
      ]);

      res.status(200).json({ message: "Complete update comment" });
      connection.commit();
    } catch (err) {
      connection.rollback();
      console.log(err);
      next(err);
    }
  },
  async deleteComment(req, res, next) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "moviestagram",
      dateStrings: "date",
    });

    try {
      const { postId, commentId } = req.params;

      connection.beginTransaction();

      // comment_like_user 에 있는 데이터를 전부 삭제
      await connection.query("DELETE FROM comment_like_user WHERE comment_id=?", [commentId]);

      // DB에 댓글 삭제
      await connection.query("DELETE FROM comment WHERE id=? AND post_id=?", [commentId, postId]);

      res.status(200).json({ message: "Complete delete comment" });
      connection.commit();
    } catch (err) {
      connection.rollback();
      console.log(err);
      next(err);
    }
  },
  async likeToggleComment(req, res, next) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "moviestagram",
      dateStrings: "date",
    });

    connection.beginTransaction();

    try {
      const { postId, commentId } = req.params;
      const { userName } = req.body;

      // userId 에 해당되는 id 값 찾기
      const [user] = await connection.query("SELECT id FROM user WHERE username=?", [userName]);
      const userId = user[0].id;

      // comment_like_user 테이블에서 data 유무확인
      const [like] = await connection.query("SELECT * FROM comment_like_user WHERE comment_id=? AND user_id=?", [commentId, userId]);

      if (!like.length) {
        // 좋아요
        // comment_like_user 테이블에 저장
        await connection.query("INSERT INTO comment_like_user (comment_id, user_id) VALUES(?, ?)", [commentId, userId]);
        res.status(200).json("Like Completed");
      } else {
        // 좋아요 취소
        // comment_like_user 테이블에서 삭제
        await connection.query("DELETE FROM comment_like_user WHERE comment_id=? AND user_id=?", [commentId, userId]);
        res.status(200).json("Unlike Completed");
      }

      connection.commit();
    } catch (err) {
      connection.rollback();
      next(err);
    }
  },
};
