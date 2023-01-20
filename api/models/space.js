const mongoose = require("mongoose");

const spaceSchema = mongoose.Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("space", spaceSchema);
