const express = require("express");
const router = express.Router();
const user = require("../controllers/auth");

router.post("/register", user.regiser);
router.post("/login", user.login);
router.post("/find/username", user.findUsername);
router.post("/check/username", user.checkUsername);
router.post("/reset/password", user.resetPassword);
router.post("/logout", user.logout);
router.post("/token", user.checkToken);

module.exports = router;
