const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: "http://localhost:3000",
  methods: ["GET", "POST"],
});

io.on("connection", (socket) => {
  socket.on("draw_line", ({ boardId, prevPoint, currentPoint, color }) => {
    socket.to(boardId).emit("draw_line", { prevPoint, currentPoint, color });
  });

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("clear", () => io.emit("clear"));
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
