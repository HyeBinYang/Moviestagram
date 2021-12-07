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
      let { userName, email, password, passwordConfirm } = req.body;

      bcrypt.genSalt(saltCount, async (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(password, salt, (err, hashedPassword) => {
          if (err) return next(err);
          password = hashedPassword;

          connection.query(
            `INSERT 
            INTO user (username, email, password, salt) 
            VALUES (?, ?, ?, ?)`,
            [userName, email, password, salt],
            (err) => {
              if (err) console.log(err);
              else res.json("success");
            }
          );
        });
      });
    } catch (err) {
      next(err);
    }
  },
  async login(req, res, next) {
    // 클라이언트에서 데이터 받아옴
    const { userName, password } = req.body;

    // 아이디가 존재하는지 DB에서 찾기
    await connection.query(`SELECT * FROM user WHERE username=?`, [userName], (err, rows) => {
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
          const refreshToken = jwt.sign({ userName }, "secret", {
            expiresIn: "14d",
            issuer: "hyebin",
          });

          const accessToken = jwt.sign({ userName }, "secret", {
            expiresIn: "1h",
            issuer: "hyebin",
          });

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 14,
          });
          return res.status(200).json({ accessToken, userName });
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
        res.status(401).json({ code: 401, message: "권한이 없습니다." });
      } else {
        // Refreshtoken 이 있으면 accesstoken 재발급
        const payload = refreshToken.split(".")[1];
        const userName = JSON.parse(Buffer.from(payload, "base64").toString()).userName;
        const newAccessToken = jwt.sign({ userName }, "secret", { expiresIn: "1h", issuer: "hyebin" });
        return res.status(200).json({ newAccessToken, userName });
      }
    } else {
      if (!refreshToken) {
        const newRefreshToken = jwt.sign({ userName }, "secret", { expiresIn: "14d", issuer: "hyebin" });
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 14,
        });
        return res.status(200).json({ code: 200, message: "요청 성공" });
      } else {
        return res.status(200).json({ code: 200, message: "요청 성공" });
      }
    }
  },
};

module.exports = controller;
