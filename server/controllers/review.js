const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "moviestagram",
});

module.exports = {
  getMovieReviews(req, res, next) {
    const movieId = "123";
    const query = "SELECT * FROM post WHERE movie=?";

    connection.query(query, [movieId], (err, rows) => {
      if (err) console.log(err);
      else {
        res.status(200).json(rows);
      }
    });
  },
  getUserReviews(req, res, next) {
    const userId = "123";
    const query = "SELECT * FROM post WHERE user_id=?";

    connection.query(query, [userId], (err, rows) => {
      if (err) console.log(err);
      else {
        res.status(200).json(rows);
      }
    });
  },
  getNewReviews(req, res, next) {
    const query = "SELECT * FROM post LIMIT 10";

    connection.query(query, [], (err, rows) => {
      if (err) console.log(err);
      else {
        res.status(200).json(rows);
      }
    });
  },
  writeReview(req, res, next) {
    const { userName, description, hashtags, image, movieName } = req.body;
    let userId = "";

    // 해당 유저이름을 가진 유저의 id값 가져오기
    const getUserQuery = "SELECT id FROM user WHERE username=?";
    connection.query(getUserQuery, [userName], (err, rows) => {
      if (err) console.log(err);
      else {
        userId = rows[0].id;
      }
    });

    // 해시태그가 없었던 거면 저장 (insert)
    // post_hashtag에도 insert
    // review 저장 (insert)
  },
  updateReview() {},
  deleteReview() {
    const query = "SELECT * FROM post LIMIT 10";

    connection.query(query, [], (err, rows) => {
      if (err) res.status(500).json(err);
      else {
        res.status(200).json(rows);
      }
    });
  },
};
