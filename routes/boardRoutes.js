const express = require("express");
const router = express.Router();

const {
  createBoard,
  getAllBoards,
  getSingleBoard,
  updateThumbnail,
} = require("../controllers/board");
router.route("/").get(getAllBoards).post(createBoard);
router.route("/:id").get(getSingleBoard);
router.route("/:id/thumbnail").post(updateThumbnail);

module.exports = router;
