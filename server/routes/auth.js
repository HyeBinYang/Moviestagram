const express = require("express");
const router = express.Router();
const user = require("../controllers/auth");

router.post("/register", user.regiser);
router.post("/login", user.login);
router.post("/logout", user.logout);
router.post("/token", user.checkToken);

module.exports = router;
