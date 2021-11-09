const mysql = require("mysql2/promise");
const moment = require("moment");

module.exports = {
  async getMovieReviews(req, res, next) {
    try {
      const movieId = "123";
      const posts = await connection.query("SELECT * FROM post WHERE movie=?", [movieId]);
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  },
  async getUserReviews(req, res, next) {
    try {
      const userId = "123";
      const posts = connection.query("SELECT * FROM post WHERE user_id=?", [userId]);
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  },
  async getNewReviews(req, res, next) {
    try {
      const [posts] = await connection.query("SELECT * FROM post LIMIT 10 ORDER BY created DESC");
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  async getReview(req, res, next) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "moviestagram",
      dateStrings: "date",
    });

    connection.beginTransaction();

    try {
      const { postId } = req.params;
      const [post] = await connection.query("SELECT * FROM post WHERE id=?", [postId]);
      res.status(200).json(post[0]);
      connection.commit();
    } catch (err) {
      connection.rollback();
      next(err);
    }
  },
  async writeReview(req, res, next) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "moviestagram",
      dateStrings: "date",
    });

    try {
      const { userName, description, hashtags, movieTitle } = req.body;
      let userId = null;
      let postId = null;

      connection.beginTransaction();

      // // 해당 유저이름을 가진 유저의 id값 가져오기
      const [user] = await connection.query("SELECT id FROM user WHERE username=?", [userName]);
      userId = user[0].id;

      const [result] = await connection.query("SELECT id FROM post ORDER BY id DESC LIMIT 1");
      postId = result[0].id + 1;

      // review 저장 (insert)
      await connection.query("INSERT INTO post (description, image, user_id, created, updated, movie) VALUES (?, ?, ?, ?, ?, ?)", [
        description,
        JSON.stringify(req.file),
        userId,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        moment().format("YYYY-MM-DD HH:mm:ss"),
        movieTitle,
      ]);

      // hashtag 테이블, post_hashtag 테이블에 저장
      hashtags.split(",").forEach(async (hashtag) => {
        let hashtagId = null;
        const [originHashtag] = await connection.query("SELECT * FROM hashtag WHERE name=?", [hashtag]);
        if (!originHashtag.length) {
          const [newHashtag] = await connection.query("INSERT INTO hashtag (name) VALUES (?)", [hashtag]);
          hashtagId = newHashtag[0].id;
        } else {
          hashtagId = originHashtag[0].id;
        }
        await connection.query("INSERT INTO post_hashtag (post_id, hashtag_id) VALUES (?, ?)", [postId, hashtagId]);
      });

      res.status(200).json({ message: "Complete write" });
      connection.commit();
    } catch (err) {
      await connection.rollback();
      console.log(err);
      next(err);
    }
  },
  async updateReview(req, res, next) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "moviestagram",
      dateStrings: "date",
    });

    connection.beginTransaction();

    try {
      const { postId } = req.params;
      const { description, hashtags } = req.body;
      // 1. hashtag 수정
      // 1-1. 기존 review에 있던 hashtag를 전부 삭제한다. (post_hashtag 에서)
      await connection.query("DELETE from post_hashtag WHERE post_id=?", [postId]);
      // 1-2. 새로 들어온 hashtag를 넣는다.
      // 1-3. hashtag 중 새로운 hashtag면 hashtag 테이블에 넣는다.
      hashtags.split(",").forEach(async (hashtag) => {
        let hashtagId = null;
        const [originHashtag] = await connection.query("SELECT * FROM hashtag WHERE name=?", [hashtag]);
        if (!originHashtag.length) {
          const [newHashtag] = await connection.query("INSERT INTO hashtag (name) VALUES (?)", [hashtag]);
          hashtagId = newHashtag[0].id;
        } else {
          hashtagId = originHashtag[0].id;
        }
        await connection.query("INSERT INTO post_hashtag (post_id, hashtag_id) VALUES (?, ?)", [postId, hashtagId]);
      });

      // 2. description 수정
      // update 시키면 끝
      await connection.query("UPDATE post SET description=?, updated=? WHERE id=?", [description, moment().format("YYYY-MM-DD HH:mm:ss"), postId]);

      res.status(200).json({ message: "Complete update" });
      connection.commit();
    } catch (err) {
      connection.rollback();
      next(err);
    }
  },
  async deleteReview(req, res, next) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "moviestagram",
      dateStrings: "date",
    });

    connection.beginTransaction();

    try {
      const { postId } = req.body;
      // post_hashtag 에 있는 데이터를 전부 삭제
      await connection.query("DELETE FROM post_hashtag WHERE post_id=?", [postId]);

      // comment (댓글) 에 있는 데이터를 전부 삭제
      await connection.query("DELETE FROM comment WHERE post_id=?", [postId]);

      // post 에 있는 데이터를 삭제
      await connection.query("DELETE FROM post WHERE id=?", [postId]);

      res.status(200).json({ message: "Complete delete" });
      connection.commit();
    } catch (err) {
      connection.rollback();
      next(err);
    }
  },
  async likeToggleReview(req, res, next) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "moviestagram",
      dateStrings: "date",
    });

    connection.beginTransaction();

    try {
      const { userName } = req.body;
      const { postId } = req.params;

      // userId 에 해당되는 id 값 찾기
      const [user] = await connection.query("SELECT id FROM user WHERE username=?", [userName]);
      const userId = user[0].id;

      // post_like_user 테이블에서 data 유무확인
      const [like] = await connection.query("SELECT * FROM post_like_user WHERE post_id=? AND user_id=?", [postId, userId]);

      if (!like.length) {
        // 좋아요
        // post_like_user 테이블에 저장
        await connection.query("INSERT INTO post_like_user (post_id, user_id) VALUES(?, ?)", [postId, userId]);

        res.status(200).json("Like Completed");
      } else {
        // 좋아요 취소
        // post_like_user 테이블에서 삭제
        await connection.query("DELETE FROM post_like_user WHERE post_id=? AND user_id=?", [postId, userId]);

        res.status(200).json("Unlike Completed");
      }

      connection.commit();
    } catch (err) {
      connection.rollback();
      next(err);
    }
  },
};
