const mongoose = require("mongoose");
const { autoIncrement } = require("mongoose-plugin-autoinc");

const { Schema } = mongoose;

const SatWordbookSchema = new Schema({
  word: { type: String, required: true, unique: true },
  meaning: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});
SatWordbookSchema.plugin(autoIncrement, {
  model: "satwordbook",
  field: "id",
  startAt: 1,
});

module.exports = mongoose.model("satwordbook", SatWordbookSchema);
