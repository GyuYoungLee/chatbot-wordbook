const mongoose = require("mongoose");
const { autoIncrement } = require("mongoose-plugin-autoinc");

const { Schema } = mongoose;

const ElementaryWordbookSchema = new Schema({
  word: { type: String, required: true, unique: true },
  meaning: { type: String, required: true },
  updated_at: { type: Date, default: Date.now },
});
ElementaryWordbookSchema.plugin(autoIncrement, {
  model: "elementarywordbook",
  field: "id",
  startAt: 1,
});

module.exports = mongoose.model("elementarywordbook", ElementaryWordbookSchema);
