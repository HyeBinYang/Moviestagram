const { checkToken } = require("../utils/auth");

module.exports = {
  checkTokens(req, res, next) {
    console.log(req.cookies, req.headers);
  },
};
