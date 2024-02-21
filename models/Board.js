const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
