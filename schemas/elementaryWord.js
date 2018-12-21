const mongoose = require("mongoose");

const { Schema } = mongoose;

const elementaryWordSchema = new Schema({
  word: { type: String, required: true, unique: true },
  meaning: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ElementaryWord", elementaryWordSchema);
