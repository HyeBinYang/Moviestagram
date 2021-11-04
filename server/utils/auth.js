const jwt = require("jsonwebtoken");

module.exports = {
  checkToken(token) {
    try {
      return jwt.verify(token, "secret");
    } catch (e) {
      return null;
    }
  },
};
