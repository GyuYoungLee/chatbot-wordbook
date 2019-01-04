const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const connect = require("./schemas");
const indexRouter = require("./routes/index");
// const quizRouter = require("./routes/quiz");
const elementaryWordRouter = require("./routes/wordbook.elementary");
const middleWordRouter = require("./routes/wordbook.middle");
const highWordRouter = require("./routes/wordbook.high");
const satWordRouter = require("./routes/wordbook.sat");
const toeicWordRouter = require("./routes/wordbook.toeic");
const userRouter = require("./routes/user");

connect();
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter); // dubug for server live
// app.use("/quiz", quizRouter);
app.use("/elementaryWords", elementaryWordRouter);
app.use("/middleWords", middleWordRouter);
app.use("/highWords", highWordRouter);
app.use("/satWords", satWordRouter);
app.use("/toeicWords", toeicWordRouter);
app.use("/user", userRouter);

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
