const Board = require("../models/Board");

const createBoard = async (req, res) => {
  try {
    const { name, description, creator } = req.body;
    const newBoard = new Board({ name, description, creator });
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

const getSingleBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Board.findById(id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateThumbnail = async (req, res) => {
  const { id: boardId } = req.params;
  const { thumbnail } = req.body;

  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      { thumbnail },
      { new: true },
    );
    if (!updatedBoard) {
      return res.status(404).send({ message: "Board not found" });
    }
    res.send({
      message: "Thumbnail updated successfully",
      board: updatedBoard,
    });
  } catch (error) {
    console.error("Failed to update thumbnail:", error);
    res
      .status(500)
      .send({ message: "Failed to update thumbnail", error: error.message });
  }
};

module.exports = { createBoard, getAllBoards, getSingleBoard, updateThumbnail };
