const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "moviestagram",
});

const saltCount = 10;

const controller = {
  async regiser(req, res, next) {
    try {
      let { userId, email, password, passwordConfirm } = req.body;

      bcrypt.genSalt(saltCount, async (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(password, salt, (err, hashedPassword) => {
          if (err) return next(err);
          password = hashedPassword;
          const query = "INSERT INTO user (username, email, password, salt) VALUES (?, ?, ?, ?)";
          const params = [userId, email, password, salt];

          connection.query(query, params, (err) => {
            if (err) console.log(err);
            else res.json("success");
          });
        });
      });
    } catch (err) {
      next(err);
    }
  },
  async login(req, res, next) {
    // 클라이언트에서 데이터 받아옴
    const { userId, password } = req.body;

    // 아이디가 존재하는지 DB에서 찾기
    const query = "SELECT * FROM user WHERE username=?";

    await connection.query(query, [userId], (err, rows) => {
      if (err) console.log(err);
      else {
        if (!rows.length) {
          return next();
        }

        const originPassword = rows[0].password;
        const salt = rows[0].salt;

        bcrypt.hash(password, salt, (err, hashedPassword) => {
          if (err || hashedPassword !== originPassword) return next(err);

          // 토큰 발급 (rt + at)
          const refreshToken = jwt.sign({ userId }, "secret", {
            expiresIn: "14d",
            issuer: "hyebin",
          });

          const accessToken = jwt.sign({ userId }, "secret", {
            expiresIn: "1h",
            issuer: "hyebin",
          });

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 14,
          });
          return res.status(200).json({ accessToken, userId });
        });
      }
    });
  },

  async logout(req, res, next) {
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logout" });
  },

  checkToken(req, res, next) {
    const accessToken = req.headers.token;
    const refreshToken = req.cookies.refreshToken;

    // Accesstoken 이 없을 때
    if (!accessToken || accessToken === "undefined") {
      // Refreshtoken 도 없으면 401 에러로 응답하기
      if (!refreshToken) {
        console.log(1);
        res.status(401).json({ code: 401, message: "권한이 없습니다." });
      } else {
        // Refreshtoken 이 있으면 accesstoken 재발급
        const payload = refreshToken.split(".")[1];
        const userId = JSON.parse(Buffer.from(payload, "base64").toString()).userId;
        const newAccessToken = jwt.sign({ userId }, "secret", { expiresIn: "1h", issuer: "hyebin" });
        // req.cookies.access = newAccessToken;
        return res.status(200).json({ newAccessToken, userId });
      }
    } else {
      if (!refreshToken) {
        console.log(3);
        const newRefreshToken = jwt.sign({ userId }, "secret", { expiresIn: "14d", issuer: "cotak" });
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 14,
        });
        return res.status(200).json({ code: 200, message: "요청 성공" });
      } else {
        console.log(4);
        return res.status(200).json({ code: 200, message: "요청 성공" });
      }
    }
  },
};

module.exports = controller;