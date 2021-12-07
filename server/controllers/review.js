const mysql = require("mysql2/promise");
const moment = require("moment");

module.exports = {
  async getMovieReviews(req, res, next) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "moviestagram",
      dateStrings: "date",
    });

    try {
      const { movieId } = req.params;

      connection.beginTransaction();

      const [posts] = await connection.query(
        `SELECT 
        post.id, post.description, post.image, post.movie_id, post.movie_name, post.rate, post.user_id, user.username, post.created, post.updated 
        FROM post, user
        WHERE movie_id = ? AND post.user_id = user.id
        ORDER BY created DESC 
        LIMIT 10`,
        [movieId]
      );

      for (let i = 0; i < posts.length; i++) {
        const postId = posts[i].id;
        const [hashtags] = await connection.query(
          `SELECT
          hashtag.id, hashtag.name
          FROM hashtag, post_hashtag
          WHERE post_hashtag.post_id = ? AND hashtag.id = post_hashtag.hashtag_id`,
          [postId]
        );

        const [postLikeUsers] = await connection.query(
          `SELECT
          user.id, user.username
          FROM user, post_like_user
          WHERE post_like_user.post_id = ? AND post_like_user.user_id = user.id`,
          [postId]
        );

        const [comments] = await connection.query(
          `SELECT
          comment.id, comment.content, comment.user_id, user.username, comment.created, comment.updated
          FROM comment, user
          WHERE comment.post_id = ? AND comment.user_id = user.id`,
          [postId]
        );

        for (let i = 0; i < comments.length; i++) {
          const commentId = comments[i].id;
          const [commentLikeUsers] = await connection.query(
            `SELECT
            user.id, user.username
            FROM user, comment_like_user
            WHERE comment_like_user.comment_id = ? AND comment_like_user.user_id = user.id`,
            [commentId]
          );

          comments[i] = { ...comments[i], commentLikeUsers };
        }

        posts[i] = { ...posts[i], hashtags, postLikeUsers, comments };
      }

      res.status(200).json(posts);

      connection.commit();
    } catch (err) {
      connection.rollback();
      console.log(err);
      next(err);
    }
  },
  async getUserReviews(req, res, next) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "moviestagram",
      dateStrings: "date",
    });

    try {
      const { userName } = req.params;

      connection.beginTransaction();

      // userName 값으로 DB에서 유저 찾기
      const [user] = await connection.query("SELECT id FROM user WHERE username=?", [userName]);
      const userId = user[0].id;

      const [posts] = await connection.query(
        `SELECT 
        post.id, post.description, post.image, post.movie_id, post.movie_name, post.rate, post.user_id, user.username, post.created, post.updated 
        FROM post, user
        WHERE post.user_id = user.id AND user.id = ?
        ORDER BY created DESC 
        LIMIT 10`,
        [userId]
      );

      for (let i = 0; i < posts.length; i++) {
        const postId = posts[i].id;
        const [hashtags] = await connection.query(
          `SELECT
          hashtag.id, hashtag.name
          FROM hashtag, post_hashtag
          WHERE post_hashtag.post_id = ? AND hashtag.id = post_hashtag.hashtag_id`,
          [postId]
        );

        const [postLikeUsers] = await connection.query(
          `SELECT
          user.id, user.username
          FROM user, post_like_user
          WHERE post_like_user.post_id = ? AND post_like_user.user_id = user.id`,
          [postId]
        );

        const [comments] = await connection.query(
          `SELECT
          comment.id, comment.content, comment.user_id, user.username, comment.created, comment.updated
          FROM comment, user
          WHERE comment.post_id = ? AND comment.user_id = user.id`,
          [postId]
        );

        for (let i = 0; i < comments.length; i++) {
          const commentId = comments[i].id;
          const [commentLikeUsers] = await connection.query(
            `SELECT
            user.id, user.username
            FROM user, comment_like_user
            WHERE comment_like_user.comment_id = ? AND comment_like_user.user_id = user.id`,
            [commentId]
          );

          comments[i] = { ...comments[i], commentLikeUsers };
        }

        posts[i] = { ...posts[i], hashtags, postLikeUsers, comments };
      }

      res.status(200).json(posts);

      connection.commit();
    } catch (err) {
      connection.rollback();
      next(err);
    }
  },
  async getNewReviews(req, res, next) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "moviestagram",
      dateStrings: "date",
    });

    try {
      connection.beginTransaction();

      const [posts] = await connection.query(
        `SELECT 
        post.id, post.description, post.image, post.movie_id, post.movie_name, post.rate, post.user_id, user.username, post.created, post.updated 
        FROM post, user
        WHERE post.user_id = user.id
        ORDER BY created DESC 
        LIMIT 10`
      );

      for (let i = 0; i < posts.length; i++) {
        const postId = posts[i].id;
        const [hashtags] = await connection.query(
          `SELECT
          hashtag.id, hashtag.name
          FROM hashtag, post_hashtag
          WHERE post_hashtag.post_id = ? AND hashtag.id = post_hashtag.hashtag_id`,
          [postId]
        );

        const [postLikeUsers] = await connection.query(
          `SELECT
          user.id, user.username
          FROM user, post_like_user
          WHERE post_like_user.post_id = ? AND post_like_user.user_id = user.id`,
          [postId]
        );

        const [comments] = await connection.query(
          `SELECT
          comment.id, comment.content, comment.user_id, user.username, comment.created, comment.updated
          FROM comment, user
          WHERE comment.post_id = ? AND comment.user_id = user.id`,
          [postId]
        );

        for (let i = 0; i < comments.length; i++) {
          const commentId = comments[i].id;
          const [commentLikeUsers] = await connection.query(
            `SELECT
            user.id, user.username
            FROM user, comment_like_user
            WHERE comment_like_user.comment_id = ? AND comment_like_user.user_id = user.id`,
            [commentId]
          );

          comments[i] = { ...comments[i], commentLikeUsers };
        }

        posts[i] = { ...posts[i], hashtags, postLikeUsers, comments };
      }

      res.status(200).json(posts);

      connection.commit();
    } catch (err) {
      connection.rollback();
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

    try {
      const { postId } = req.params;

      connection.beginTransaction();

      const [hashtags] = await connection.query(
        `SELECT
        hashtag.id, hashtag.name
        FROM hashtag, post_hashtag
        WHERE post_hashtag.post_id = ? AND hashtag.id = post_hashtag.hashtag_id`,
        [postId]
      );

      const [comments] = await connection.query(
        `SELECT
        comment.id, comment.content, comment.user_id, user.username, comment.created, comment.updated
        FROM comment, user
        WHERE comment.post_id = ? AND comment.user_id = user.id`,
        [postId]
      );

      for (let i = 0; i < comments.length; i++) {
        const commentId = comments[i].id;
        const [commentLikeUsers] = await connection.query(
          `SELECT
          user.id, user.username
          FROM user, comment_like_user
          WHERE comment_like_user.comment_id = ? AND comment_like_user.user_id = user.id`,
          [commentId]
        );

        comments[i] = { ...comments[i], commentLikeUsers };
      }

      const [post] = await connection.query(
        `SELECT 
        post.id, post.description, post.image, post.movie_id, post.movie_name, post.rate, post.user_id, user.username, post.created, post.updated 
        FROM post, user
        WHERE post.id = ? AND post.user_id = user.id`,
        [postId]
      );

      const [postLikeUsers] = await connection.query(
        `SELECT
        user.id, user.username
        FROM user, post_like_user
        WHERE post_like_user.post_id = ? AND post_like_user.user_id = user.id`,
        [postId]
      );

      res.status(200).json({ ...post[0], hashtags, postLikeUsers, comments });

      connection.commit();
    } catch (err) {
      connection.rollback();
      console.log(err);
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
      const { userName, description, hashtags, movieId, movieName, rate } = req.body;
      let postId = null;

      connection.beginTransaction();

      // userName 값으로 DB에서 유저 찾기
      const [user] = await connection.query("SELECT id FROM user WHERE username=?", [userName]);
      const userId = user[0].id;

      // review 저장 (insert)
      await connection.query(
        "INSERT INTO post (description, image, movie_id, movie_name, rate, user_id, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          description,
          req.file.filename,
          movieId,
          movieName,
          rate,
          userId,
          moment().format("YYYY-MM-DD HH:mm:ss"),
          moment().format("YYYY-MM-DD HH:mm:ss"),
        ]
      );

      const [result] = await connection.query("SELECT id FROM post ORDER BY id DESC LIMIT 1");
      postId = result[0].id;

      // hashtag 테이블, post_hashtag 테이블에 저장
      for (let i = 0; i < hashtags.split(",").length; i++) {
        const hashtag = hashtags.split(",")[i];
        let hashtagId = null;

        const [originHashtag] = await connection.query("SELECT * FROM hashtag WHERE name=?", [hashtag]);

        if (!originHashtag.length) {
          await connection.query("INSERT INTO hashtag (name) VALUES (?)", [hashtag]);
          const [newHashtag] = await connection.query("SELECT id FROM hashtag ORDER BY id DESC LIMIT 1");
          hashtagId = newHashtag[0].id;
        } else {
          hashtagId = originHashtag[0].id;
        }

        await connection.query("INSERT INTO post_hashtag (post_id, hashtag_id) VALUES (?, ?)", [postId, hashtagId]);
      }

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

    try {
      const { postId } = req.params;
      const { description, hashtags, image, rate } = req.body;

      connection.beginTransaction();

      // 1. hashtag 수정

      // 1-1. 기존 review에 있던 hashtag를 전부 삭제한다. (post_hashtag 에서)
      await connection.query("DELETE from post_hashtag WHERE post_id=?", [postId]);

      // 1-2. 새로 들어온 hashtag를 넣는다.
      // 1-3. hashtag 중 새로운 hashtag면 hashtag 테이블에 넣는다.
      for (let i = 0; i < hashtags.split(",").length; i++) {
        const hashtag = hashtags.split(",")[i];
        let hashtagId = null;

        const [originHashtag] = await connection.query("SELECT * FROM hashtag WHERE name=?", [hashtag]);

        if (!originHashtag.length) {
          await connection.query("INSERT INTO hashtag (name) VALUES (?)", [hashtag]);
          const [newHashtag] = await connection.query("SELECT id FROM hashtag ORDER BY id DESC LIMIT 1");
          hashtagId = newHashtag[0].id;
        } else {
          hashtagId = originHashtag[0].id;
        }

        await connection.query("INSERT INTO post_hashtag (post_id, hashtag_id) VALUES (?, ?)", [postId, hashtagId]);
      }

      // 2. description 수정
      // update 시키면 끝
      await connection.query("UPDATE post SET description=?, image=?, rate=? updated=? WHERE id=?", [
        description,
        req.file.filename,
        rate,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        postId,
      ]);
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

    try {
      const { postId } = req.params;

      connection.beginTransaction();

      // post_like_user 에 있는 데이터를 전부 삭제
      await connection.query("DELETE FROM post_like_user WHERE post_id=?", [postId]);

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
      console.log(err);
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

    try {
      const { userName } = req.body;
      const { postId } = req.params;

      connection.beginTransaction();

      // userId 에 해당되는 id 값 찾기
      const [user] = await connection.query("SELECT id FROM user WHERE username=?", [userName]);
      const userId = user[0].id;

      // post_like_user 테이블에서 data 유무확인
      const [like] = await connection.query("SELECT * FROM post_like_user WHERE post_id=? AND user_id=?", [
        postId,
        userId,
      ]);

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
      console.log(err);
      next(err);
    }
  },
};
