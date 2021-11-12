const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");
// Router
const authRouter = require("./routes/auth");
const movieRouter = require("./routes/movie");
const reviewRouter = require("./routes/review");
const commentRouter = require("./routes/comment");

const app = express();

const port = 8000;

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS check
app.use(cors());

app.use("/auth", authRouter);
app.use("/movie", movieRouter);
app.use("/review", reviewRouter);
app.use("/comment", commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message: "Error",
  });
});

app.listen(port, () => {
  const dir = "../client/public/img/uploadedFiles";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  console.log(`Run port ${port}`);
});

module.exports = app;
