const mongoose = require("mongoose");

const { Schema } = mongoose;

const options = {
  toObject: { getters: true },
  toJSON: { getters: true },
};

const UsersSchema = new Schema(
  {
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
        dateStudied: { type: Date, default: "" },
        cntStudied: { type: Number, default: "" },
      },
    ],
  },
  options,
);

// 1일전 학습 단어장
UsersSchema.virtual("wordbook1").get(function() {
  const wordbook1 = this.wordbook;
  return wordbook1.filter(word => {
    const { dateStudied } = word;
    const d1 = new Date(dateStudied).getTime();
    const d2 = new Date().getTime();
    const DAY_SPAN = 86400000;
    return DAY_SPAN * 1 < d2 - d1 && d2 - d1 < DAY_SPAN * 2;
  });
});

// 7일전 학습 단어장
UsersSchema.virtual("wordbook7").get(function() {
  const wordbook7 = this.wordbook;
  return wordbook7.filter(word => {
    const { dateStudied } = word;
    const d1 = new Date(dateStudied).getTime();
    const d2 = new Date().getTime();
    const DAY_SPAN = 86400000;
    return DAY_SPAN * 2 < d2 - d1 && d2 - d1 < DAY_SPAN * 7;
  });
});

// 30일전 학습 단어장
UsersSchema.virtual("wordbook30").get(function() {
  const wordbook30 = this.wordbook;
  return wordbook30.filter(word => {
    const { dateStudied } = word;
    const d1 = new Date(dateStudied).getTime();
    const d2 = new Date().getTime();
    const DAY_SPAN = 86400000;
    return DAY_SPAN * 7 < d2 - d1 && d2 - d1 < DAY_SPAN * 30;
  });
});

module.exports = mongoose.model("user", UsersSchema);
