// 서버구동 명령 : npm start
const express = require("express");
const logger = require("morgan");
const createError = require("http-errors");
const indexRouter = require("./routes/index");
const elementaryWordbookRouter = require("./routes/wordbook.elementary");
const middleWordbookRouter = require("./routes/wordbook.middle");
const highWordbookRouter = require("./routes/wordbook.high");
const satWordbookRouter = require("./routes/wordbook.sat");
const toeicWordbookRouter = require("./routes/wordbook.toeic");
const userRouter = require("./routes/user");
const myWordbookRouter = require("./routes/wordbook.my");
const dbConnect = require("./schemas");

// server
const app = express();
dbConnect();

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter); // dubug for server live

// router
app.use("/elementaryWords", elementaryWordbookRouter);
app.use("/middleWords", middleWordbookRouter);
app.use("/highWords", highWordbookRouter);
app.use("/satWords", satWordbookRouter);
app.use("/toeicWords", toeicWordbookRouter);
app.use("/user", userRouter);
app.use("/myWords", myWordbookRouter);
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
