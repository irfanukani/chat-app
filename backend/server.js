/* eslint-disable node/no-unsupported-features/es-syntax */
const cors = require("cors");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:5173" , "https://chat-app-irfan.surge.sh"],
    methods: ["GET", "POST"],
  },
});

const corsOptions = {
  origin: ["http://localhost:5173" ,  "https://chat-app-irfan.surge.sh"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

const roomId = "public-chat";

io.on("connection", (socket) => {
  const updateRoomUsers = () => {
    const roomUsers = io.sockets.adapter.rooms.get(roomId);
    const numUsers = roomUsers ? roomUsers.size : 0;
    io.to(roomId).emit("room-users", numUsers);
  };

  socket.on("join-room", () => {
    socket.join(roomId);
    updateRoomUsers();
    io.to(roomId).emit("guest-joined");
  });

  socket.on("chat", (message) => {
    socket.to(roomId).emit("chat", message);
  });

  socket.on('disconnect', () => {
    socket.leave(roomId);
    updateRoomUsers();
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log("Server started!");
});
