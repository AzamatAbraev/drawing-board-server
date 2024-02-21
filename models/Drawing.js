const mongoose = require("mongoose");

const drawingSchema = new mongoose.Schema({
  boardId: String,
  prevPoint: { x: Number, y: Number },
  currentPoint: { x: Number, y: Number },
  color: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Drawing", drawingSchema);
