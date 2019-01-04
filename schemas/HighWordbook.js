const mongoose = require("mongoose");
const { autoIncrement } = require("mongoose-plugin-autoinc");

const { Schema } = mongoose;

const HighWordbookSchema = new Schema({
  word: { type: String, required: true, unique: true },
  meaning: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});
HighWordbookSchema.plugin(autoIncrement, {
  model: "highwordbook",
  field: "id",
  startAt: 1,
});

module.exports = mongoose.model("highwordbook", HighWordbookSchema);
