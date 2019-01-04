const mongoose = require("mongoose");
const { autoIncrement } = require("mongoose-plugin-autoinc");

const { Schema } = mongoose;

const MiddleWordbookSchema = new Schema({
  word: { type: String, required: true, unique: true },
  meaning: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});
MiddleWordbookSchema.plugin(autoIncrement, {
  model: "middlewordbook",
  field: "id",
  startAt: 1,
});

module.exports = mongoose.model("middlewordbook", MiddleWordbookSchema);
