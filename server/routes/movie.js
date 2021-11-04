const axios = require("axios");
const querystring = require("querystring");
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const { API_KEY, BASE_URL } = require("../config/themovieapi");

router.get("/search", (req, res) => {
  const movieName = querystring.escape(req.query.movie);

  axios
    .get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${movieName}&language=ko`)
    .then((movieResponse) => res.json(movieResponse.data))
    .catch((err) => console.log(err));
});

router.get("/search/:movieId/detail", (req, res) => {
  const movieId = req.params.movieId;

  axios
    .get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko`)
    .then((movieResponse) => res.json(movieResponse.data))
    .catch((err) => res.json(err.data));
});

router.get("/:movieId/cast", (req, res) => {
  const movieId = req.params.movieId;

  axios
    .get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=ko`)
    .then((movieResponse) => {
      res.json(movieResponse.data);
    })
    .catch((err) => res.json(err.data));
});

router.get("/popular", (req, res) => {
  axios
    .get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko&page=1`)
    .then((movieRes) => res.json(movieRes.data))
    .catch((err) => console.log(err));
});

module.exports = router;
