const jwt = require("jsonwebtoken");
const key = require("./key");
const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {});

router.post("/login", (req, res) => {
  try {
    console.log(req.cookies);
    const token = jwt.sign({ username: req.body.username }, key);
    res.json({ token: token });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

module.exports = router;
