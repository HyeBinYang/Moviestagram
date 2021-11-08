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

      connection.commit();
      res.status(200).json({ message: "Complete write" });
    } catch (err) {
      await connection.rollback();
      console.log(err);
      next(err);
    }
  },
  async updateReview() {
    //
  },
  async deleteReview() {
    try {
      const { postId } = req.body;
      await connection.query("DELETE FROM post WHERE post_id=?", [postId]);
      res.status(200).json({ message: "Complete delete" });
    } catch (err) {
      next(err);
    }
  },
};
