const mongoose = require("mongoose");

const { Schema } = mongoose;

const UsersSchema = new Schema({
  userKey: { type: String, required: true, unique: true },
  elementaryWordsLog: [{ type: Number }],
  elementaryWordsWrong: [{ type: Number }],
  middleWordsLog: [{ type: Number }],
  middleWordsWrong: [{ type: Number }],
  highWordsLog: [{ type: Number }],
  highWordsWrong: [{ type: Number }],
  satWordsLog: [{ type: Number }],
  satWordsWrong: [{ type: Number }],
  toeicWordsLog: [{ type: Number }],
  toeicWordsWrong: [{ type: Number }],
  currentCourse: { type: String },
  wordbook: [
    {
      word: { type: String, default: "" },
      meaning: { type: String, default: "" },
    },
  ],
});

module.exports = mongoose.model("user", UsersSchema);
