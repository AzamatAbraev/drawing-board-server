const WebSocket = require("ws");
const Board = require("../models/Board");

const wsServer = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
      const { type, name, data } = JSON.parse(message);
      switch (type) {
        case "draw":
          let board = await Board.findOne({ name });
          if (board) {
            board.data.push(data);
            await board.save();
          }
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: "draw", data }));
            }
          });
          break;
      }
    });
  });
};

module.exports = wsServer;
