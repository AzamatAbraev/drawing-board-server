const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    data: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Board", boardSchema);
