const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let messages = [
  {
    id: "welcome-1",
    user: "Alan",
    text: "Welcome to the team chat! Feel free to send messages or mention someone using @.",
    time: "10:00 AM",
    likes: 2,
  },
  {
    id: "welcome-2",
    user: "Carol",
    text: "Hey @Alan, looks great!",
    time: "10:02 AM",
    likes: 1,
  },
];

io.on("connection", (socket) => {
  socket.emit("chat:init", messages);

  socket.on("chat:message", (newMessage) => {
    messages.push(newMessage);
    if (messages.length > 100) {
      messages.shift();
    }
    io.emit("chat:message", newMessage);
  });

  socket.on("chat:like", (messageId) => {
    const target = messages.find((m) => m.id === messageId);
    if (target) {
      target.likes = (target.likes || 0) + 1;
      io.emit("chat:like", { id: messageId, likes: target.likes });
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Chat server running on http://localhost:${PORT}`);
});

