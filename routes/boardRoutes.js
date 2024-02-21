const express = require("express");
const router = express.Router();

const { createBoard, getAllBoards } = require("../controllers/board");
router.route("/").get(getAllBoards).post(createBoard);

module.exports = router;
