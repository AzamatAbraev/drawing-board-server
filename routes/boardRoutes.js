const express = require("express");
const router = express.Router();

const { saveBoard, getBoard } = require("../controllers/board");
router.post("/", saveBoard);
router.get("/:name", getBoard);

module.exports = router;
