const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  hall: { type: String, required: true },
  priority: { type: Number, default: 1 }
});

module.exports = mongoose.model("Event", eventSchema);