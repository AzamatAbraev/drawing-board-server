const Board = require("../models/Board");

const saveBoard = async (name, data) => {
  try {
    let board = await Board.findOne({ name });
    if (board) {
      board.data.push(...data); // Assuming data is an array of drawing actions
      await board.save();
    } else {
      board = new Board({ name, data });
      await board.save();
    }
  } catch (error) {
    console.error("Server Error", error);
  }
};

const getBoard = async (name) => {
  try {
    const board = await Board.findOne({ name });
    if (!board) throw new Error("Board not found");
    return board;
  } catch (error) {
    console.error("Server Error", error);
    throw error;
  }
};
module.exports = { saveBoard, getBoard };
