const mongoose = require('mongoose');

const { Schema } = mongoose;
const quizSchema = new Schema({
  no: { type: Number, required: true, unique: true },
  word: { type: String, required: true, unique: true },
  choices: [
    {
      order: { type: Number, required: true },
      desc: { type: String, required: true },
    },
  ],
  answer: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quiz', quizSchema);
