const Board = require("../models/Board");

const createBoard = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newBoard = new Board({ name, description });
    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createBoard, getAllBoards };
