const express = require("express");
const router = express.Router();
const user = require("../controllers/auth");

router.post("/register", user.regiser);
router.post("/login", user.login);
router.get("/token", user.checkToken);

module.exports = router;
