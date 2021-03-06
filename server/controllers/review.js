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

      // userName ????????? DB?????? ?????? ??????
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

      // userName ????????? DB?????? ?????? ??????
      const [user] = await connection.query("SELECT id FROM user WHERE username=?", [userName]);
      const userId = user[0].id;

      // review ?????? (insert)
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

      // hashtag ?????????, post_hashtag ???????????? ??????
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

      // 1. hashtag ??????

      // 1-1. ?????? review??? ?????? hashtag??? ?????? ????????????. (post_hashtag ??????)
      await connection.query("DELETE from post_hashtag WHERE post_id=?", [postId]);

      // 1-2. ?????? ????????? hashtag??? ?????????.
      // 1-3. hashtag ??? ????????? hashtag??? hashtag ???????????? ?????????.
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

      // 2. description ??????
      // update ????????? ???
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

      // post_like_user ??? ?????? ???????????? ?????? ??????
      await connection.query("DELETE FROM post_like_user WHERE post_id=?", [postId]);

      // post_hashtag ??? ?????? ???????????? ?????? ??????
      await connection.query("DELETE FROM post_hashtag WHERE post_id=?", [postId]);

      // comment (??????) ??? ?????? ???????????? ?????? ??????
      await connection.query("DELETE FROM comment WHERE post_id=?", [postId]);

      // post ??? ?????? ???????????? ??????
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

      // userId ??? ???????????? id ??? ??????
      const [user] = await connection.query("SELECT id FROM user WHERE username=?", [userName]);
      const userId = user[0].id;

      // post_like_user ??????????????? data ????????????
      const [like] = await connection.query("SELECT * FROM post_like_user WHERE post_id=? AND user_id=?", [
        postId,
        userId,
      ]);

      if (!like.length) {
        // ?????????
        // post_like_user ???????????? ??????
        await connection.query("INSERT INTO post_like_user (post_id, user_id) VALUES(?, ?)", [postId, userId]);

        res.status(200).json("Like Completed");
      } else {
        // ????????? ??????
        // post_like_user ??????????????? ??????
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
