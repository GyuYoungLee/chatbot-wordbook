const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const connect = require("./schemas");
const indexRouter = require("./routes/index");
const quizRouter = require("./routes/quiz");
const elementaryWordRouter = require("./routes/elementaryWord");
const middleWordRouter = require("./routes/middleWord");
const highWordRouter = require("./routes/highWord");
const satWordRouter = require("./routes/satWord");
const toeicWordRouter = require("./routes/toeicWord");

connect();
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);
app.use("/quiz", quizRouter);
app.use("/elementaryWord", elementaryWordRouter);
app.use("/middleWord", middleWordRouter);
app.use("/highWord", highWordRouter);
app.use("/satWord", satWordRouter);
app.use("/toeicWord", toeicWordRouter);

app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
