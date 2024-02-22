require("dotenv").config();

const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");

const connectDB = require("./db/connect");
const Drawing = require("./models/Drawing");
const boardRouter = require("./routes/boardRoutes");

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const io = new Server(server, {
  cors: "http://localhost:3000",
  methods: ["GET", "POST"],
});

const databaseConnection = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

databaseConnection();

io.on("connection", (socket) => {
  socket.on(
    "draw_line",
    async ({ boardId, prevPoint, currentPoint, color }) => {
      socket.to(boardId).emit("draw_line", { prevPoint, currentPoint, color });

      try {
        await Drawing.create({
          boardId,
          prevPoint,
          currentPoint,
          color,
        });
      } catch (error) {
        console.log(error);
      }
    },
  );

  socket.on("join_room", async (roomId) => {
    socket.join(roomId);

    const drawingHistory = await Drawing.find({ boardId: roomId });
    socket.emit("drawing_history", drawingHistory);
  });

  socket.on("clear", async (boardId) => {
    socket.to(boardId).emit("clear");
    try {
      await Drawing.deleteMany({ boardId });
    } catch (error) {}
  });
});

app.use("/api/boards", boardRouter);

const port = process.env.PORT || 3000;

server.listen(port);
