const mongoose = require("mongoose");
const { autoIncrement } = require("mongoose-plugin-autoinc");

const { Schema } = mongoose;

const ToeicWordbookSchema = new Schema({
  word: { type: String, required: true, unique: true },
  meaning: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});
ToeicWordbookSchema.plugin(autoIncrement, {
  model: "toeicwordbook",
  field: "id",
  startAt: 1,
});

module.exports = mongoose.model("toeicwordbook", ToeicWordbookSchema);
