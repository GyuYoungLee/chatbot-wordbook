const mongoose = require("mongoose");

const { Schema } = mongoose;

const satWordSchema = new Schema({
  word: { type: String, required: true, unique: true },
  meaning: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SatWord", satWordSchema);
